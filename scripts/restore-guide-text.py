"""Add an invisible, searchable Portuguese OCR layer without changing artwork.

Inputs are the compact official guide, original-page PNG renders and JSON from
ocr-guide.mjs. Requires pypdf, reportlab and Pillow. This is a maintenance tool,
not a build dependency. Basic tags/bookmarks are not a PDF/UA certification.
"""
import argparse
import hashlib
import io
import json
from pathlib import Path

from PIL import Image
from pypdf import PdfReader, PdfWriter
from pypdf.generic import (
    ArrayObject, BooleanObject, DecodedStreamObject, DictionaryObject,
    NameObject, NumberObject, TextStringObject,
)
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


def ref(writer, value):
    return writer._add_object(value)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("images", type=Path)
    parser.add_argument("ocr", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--font", type=Path, required=True)
    parser.add_argument("--overrides", type=Path)
    args = parser.parse_args()
    if args.source.resolve() == args.output.resolve():
        raise ValueError("Keep the input guide intact; output must be a new file.")
    reader = PdfReader(args.source)
    if len(reader.pages) != 56:
        raise ValueError("Expected the complete 56-page official guide")
    pdfmetrics.registerFont(TTFont("GuideOCR", str(args.font)))
    overrides = json.loads(args.overrides.read_text(encoding="utf-8")) if args.overrides else {}
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    struct_root = DictionaryObject({NameObject("/Type"): NameObject("/StructTreeRoot")})
    struct_ref = ref(writer, struct_root)
    document = DictionaryObject({
        NameObject("/Type"): NameObject("/StructElem"),
        NameObject("/S"): NameObject("/Document"),
        NameObject("/P"): struct_ref,
        NameObject("/Lang"): TextStringObject("pt-BR"),
        NameObject("/K"): ArrayObject(),
    })
    document_ref = ref(writer, document)
    parent_numbers = ArrayObject()
    total_chars = 0
    page_records = []
    for index, page in enumerate(writer.pages):
        name = f"guia-{index + 1:02d}"
        data = json.loads((args.ocr / f"{name}.json").read_text(encoding="utf-8"))
        image_path = args.images / f"{name}.png"
        if data.get("imageSha256") != hashlib.sha256(image_path.read_bytes()).hexdigest():
            raise ValueError(f"OCR does not match source render: {name}; recognize it again")
        correction = overrides.get(str(index + 1), {})
        if correction.get("skipOcr"):
            data = {"blocks": [], "text": "", "confidence": None}
        for line in correction.get("appendLines", []):
            x0, y0, x1, y1 = line["bbox"]
            word = {"text": line["text"], "confidence": 100, "bbox": {"x0": x0, "y0": y0, "x1": x1, "y1": y1}}
            data["blocks"].append({"paragraphs": [{"lines": [{"text": line["text"], "words": [word]}]}]})
            data["text"] += "\n" + line["text"]
        with Image.open(image_path) as image:
            image_width, image_height = image.size
        width, height = float(page.mediabox.width), float(page.mediabox.height)
        sx, sy = width / image_width, height / image_height
        buffer = io.BytesIO()
        overlay = canvas.Canvas(buffer, pagesize=(width, height), pageCompression=1)
        elements = ArrayObject()
        for block in data.get("blocks") or []:
            for paragraph in block.get("paragraphs") or []:
                lines = [line for line in paragraph.get("lines") or [] if line.get("text", "").strip()]
                if not lines:
                    continue
                mcid = len(elements)
                # Mark the hidden text as content; preserve the existing visible
                # artwork as an artifact. OCR ordering is retained, not invented.
                overlay._code.append(f"/P <</MCID {mcid}>> BDC")
                for line in lines:
                    for word in line.get("words") or []:
                        text = word.get("text", "").strip()
                        box = word.get("bbox")
                        if not text or not box:
                            continue
                        if word.get("confidence", 100) < 40:
                            continue
                        x0, y0, x1, y1 = (box[k] for k in ("x0", "y0", "x1", "y1"))
                        font_size = max(2, (y1 - y0) * sy)
                        measured = pdfmetrics.stringWidth(text, "GuideOCR", font_size)
                        target = max(0.1, (x1 - x0) * sx)
                        obj = overlay.beginText(x0 * sx, height - y1 * sy)
                        obj.setFont("GuideOCR", font_size)
                        obj.setTextRenderMode(3)
                        obj.setHorizScale(100 * target / max(0.1, measured))
                        obj.textOut(text + " ")
                        overlay.drawText(obj)
                overlay._code.append("EMC")
                element = DictionaryObject({
                    NameObject("/Type"): NameObject("/StructElem"),
                    NameObject("/S"): NameObject("/P"),
                    NameObject("/P"): document_ref,
                    NameObject("/Pg"): page.indirect_reference,
                    NameObject("/K"): NumberObject(mcid),
                })
                element_ref = ref(writer, element)
                elements.append(element_ref)
                document[NameObject("/K")].append(element_ref)
        overlay.showPage()
        overlay.save()
        if page.get_contents():
            artwork = DecodedStreamObject()
            artwork.set_data(b"/Artifact BMC\n" + page.get_contents().get_data() + b"\nEMC\n")
            page[NameObject("/Contents")] = ref(writer, artwork)
        page.merge_page(PdfReader(buffer).pages[0])
        page[NameObject("/StructParents")] = NumberObject(index)
        parent_numbers.extend([NumberObject(index), ref(writer, elements)])
        text_length = len(data.get("text", "").strip())
        total_chars += text_length
        page_records.append({"page": index + 1, "chars": text_length, "confidence": data.get("confidence")})
    struct_root[NameObject("/K")] = ArrayObject([document_ref])
    struct_root[NameObject("/ParentTree")] = ref(writer, DictionaryObject({NameObject("/Nums"): parent_numbers}))
    struct_root[NameObject("/ParentTreeNextKey")] = NumberObject(56)
    writer.root_object[NameObject("/StructTreeRoot")] = struct_ref
    writer.root_object[NameObject("/MarkInfo")] = DictionaryObject({NameObject("/Marked"): BooleanObject(True)})
    writer.root_object[NameObject("/Lang")] = TextStringObject("pt-BR")
    writer.add_metadata({
        "/Title": "Guia Caminho dos Butiazais",
        "/Subject": "Publicação oficial de 2025. Imagens preservadas; camada OCR para busca. Consulte também o roteiro em HTML.",
        "/Creator": "Mariscão da Zimba - manutenção digital",
        "/Producer": "pypdf / reportlab - OCR local em português",
    })
    for title, page_number in [
        ("Ficha técnica", 2), ("Butia catarinensis", 6), ("Mapa do roteiro", 10),
        ("Lagoa de Ibiraquera", 11), ("Dunas da Ribanceira", 14),
        ("Praia da Ribanceira", 17), ("Praia dos Amores", 21),
        ("Costão da Ribanceira", 24), ("Praia D’Água", 27),
        ("Trilha Ponta do Catalão", 30), ("Pico da Diva", 33),
        ("Mirante da Praia do Porto", 36), ("Mariscão da Zimba", 40),
        ("Museu Nacional da Baleia Franca", 43), ("Ranchos dos Pescadores Artesanais", 46),
        ("Capelinha de São Pedro", 49), ("Trilha do Farol da Praia da Vila", 52),
    ]:
        writer.add_outline_item(title, page_number - 1)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    writer.compress_identical_objects(remove_duplicates=True, remove_unreferenced=True)
    writer.write(args.output)
    result = PdfReader(args.output)
    if len(result.pages) != 56 or sum(len(p.extract_text() or "") for p in result.pages) < 20000:
        raise ValueError("Incomplete PDF or missing searchable text; do not publish")
    for index, page in enumerate(result.pages):
        if not overrides.get(str(index + 1), {}).get("skipOcr") and len((page.extract_text() or "").strip()) < 20:
            raise ValueError(f"Missing searchable text on editorial page {index + 1}; do not publish")
    print(json.dumps({"pages": 56, "ocr_chars": total_chars, "bytes": args.output.stat().st_size, "page_records": page_records}, ensure_ascii=False))


if __name__ == "__main__":
    main()
