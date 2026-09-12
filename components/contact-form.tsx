"use client";

import { useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { site } from "../content/site";

export function ContactForm() {
  const fieldsRef = useRef<HTMLFieldSetElement>(null);
  const [status, setStatus] = useState("Você poderá revisar a mensagem no WhatsApp antes de enviá-la.");

  function openWhatsApp() {
    const fields = fieldsRef.current;
    if (!fields) return;
    const controls = Array.from(fields.elements).filter((element): element is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement => "checkValidity" in element);
    const invalid = controls.find((control)=>!control.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      return;
    }
    const value = (name: string) => (fields.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)?.value.trim() || "";
    const lines = [
      "Olá, Mariscão da Zimba! Entro em contato pelo site.",
      "",
      `Nome: ${value("name")}`,
      `E-mail: ${value("email") || "Não informado"}`,
      `Telefone: ${value("phone") || "Não informado"}`,
      `Assunto: ${value("subject") || "Contato pelo site"}`,
      "",
      value("message"),
    ];
    const url = `${site.social.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("Abrindo o WhatsApp. O texto será transmitido ao serviço; a conversa com o Centro só começa quando você confirmar o envio por lá.");
    window.location.assign(url);
  }

  return (
    <div className="contact-message-builder" aria-describedby="form-status">
      <fieldset ref={fieldsRef}>
        <legend className="sr-only">Prepare uma mensagem para o WhatsApp</legend>
        <label>Nome<input name="name" autoComplete="name" maxLength={100} required /></label>
        <label>E-mail <small>opcional</small><input type="email" name="email" autoComplete="email" maxLength={254} /></label>
        <label>Telefone <small>opcional</small><input type="tel" name="phone" autoComplete="tel" maxLength={30} /></label>
        <label>Assunto<select name="subject" defaultValue="Visita" required><option>Visita</option><option>Escolas</option><option>Pesquisa</option><option>Imprensa</option><option>Parceria cultural</option><option>Eventos</option><option>Turismo</option><option>Acervo e doação</option><option>Outros</option></select></label>
        <label className="full">Mensagem<textarea name="message" rows={6} maxLength={1500} required /></label>
        <div className="full"><button type="button" onClick={openWhatsApp}><MessageCircle aria-hidden="true" /> Continuar no WhatsApp</button><p id="form-status" aria-live="polite">{status}</p></div>
      </fieldset>
    </div>
  );
}
