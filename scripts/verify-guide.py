"""Verify the published guide, optionally comparing all rendered pages pixel by pixel.

This is a local maintenance check, not a PDF/UA certification or a build dependency.
Requires pypdf and Pillow. Rendering can be done with pdftoppm -scale-to 900 -png.
"""
import argparse
import hashlib
import json
from pathlib import Path

from pypdf import PdfReader


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--before", type=Path)
    parser.add_argument("--after", type=Path)
    args = parser.parse_args()
    reader = PdfReader(args.pdf)
    text = " ".join(page.extract_text() or "" for page in reader.pages)
    root = reader.trailer["/Root"]
    assert len(reader.pages) == 56, "Incomplete guide"
    assert len(text) > 20000, "Missing search layer"
    assert root["/Lang"] == "pt-BR", "Incorrect language"
    assert bool(root["/MarkInfo"]["/Marked"]), "Missing structure marker"
    assert len(root["/StructTreeRoot"]["/K"]) > 0, "Missing structure tree"
    assert len(reader.outline) == 17, "Missing route bookmarks"
    for keyword in ["Célio", "Morlima", "ISBN", "Ibiraquera", "Ribanceira", "Catalão", "baleia"]:
        assert keyword.casefold() in text.casefold(), f"Missing searchable keyword: {keyword}"
    comparison = None
    if args.before or args.after:
        assert args.before and args.after, "Provide both rendered directories"
        from PIL import Image, ImageChops
        originals = sorted(args.before.glob("*.png"))
        revised = sorted(args.after.glob("*.png"))
        assert len(originals) == len(revised) == 56, "Render all 56 pages"
        for before, after in zip(originals, revised):
            assert before.name == after.name, "Page ordering differs"
            with Image.open(before) as a, Image.open(after) as b:
                assert a.size == b.size, f"Dimensions changed: {before.name}"
                assert ImageChops.difference(a.convert("RGB"), b.convert("RGB")).getbbox() is None, f"Artwork changed: {before.name}"
        comparison = "56 pages, zero differing pixels at the tested 900px resolution"
    print(json.dumps({
        "file": "public/documentos/guia-caminho-dos-butiazais.pdf",
        "checkedAt": "2026-10-08",
        "pages": len(reader.pages),
        "bytes": args.pdf.stat().st_size,
        "sha256": hashlib.sha256(args.pdf.read_bytes()).hexdigest(),
        "extractedCharacters": len(text),
        "bookmarks": len(reader.outline),
        "language": root["/Lang"],
        "searchLayer": "Portuguese OCR; may contain recognition errors",
        "visualComparison": comparison,
        "pdfUaCertified": False,
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
