"use client";

import { useRef, useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { site } from "../content/site";
import { prepareContactMessage, type ContactMessageErrors } from "./contact-message";

const initialStatus = "Você poderá revisar a mensagem no WhatsApp antes de enviá-la.";

export function ContactForm() {
  const fieldsRef = useRef<HTMLFieldSetElement>(null);
  const [status, setStatus] = useState(initialStatus);
  const [errors, setErrors] = useState<ContactMessageErrors>({});

  function clearError(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const control = event.currentTarget;
    control.setCustomValidity("");
    setErrors((current) => ({ ...current, [control.name]: undefined }));
    setStatus(initialStatus);
  }

  function openWhatsApp() {
    const fields = fieldsRef.current;
    if (!fields) return;
    const value = (name: string) => (fields.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)?.value || "";
    const draft = prepareContactMessage({ name: value("name"), email: value("email"), phone: value("phone"), subject: value("subject"), message: value("message") });
    setErrors(draft.errors);
    for (const name of ["name", "message"] as const) {
      const control = fields.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
      control?.setCustomValidity(draft.errors[name] || "");
    }
    const controls = Array.from(fields.elements).filter((element): element is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement => "checkValidity" in element);
    const invalid = controls.find((control)=>!control.checkValidity());
    if (invalid || !draft.valid) {
      setStatus("Revise os campos indicados antes de continuar no WhatsApp.");
      invalid?.focus();
      invalid?.reportValidity();
      return;
    }
    const url = `${site.social.whatsapp}?text=${encodeURIComponent(draft.text)}`;
    setStatus("Abrindo o WhatsApp. O texto será transmitido ao serviço; a conversa com o Centro só começa quando você confirmar o envio por lá.");
    window.location.assign(url);
  }

  return (
    <div className="contact-message-builder" aria-describedby="form-status">
      <fieldset ref={fieldsRef}>
        <legend className="sr-only">Prepare uma mensagem para o WhatsApp</legend>
        <div><label htmlFor="contact-name">Nome</label><input id="contact-name" name="name" autoComplete="name" maxLength={100} required onInput={clearError} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "contact-name-error" : undefined} /><p id="contact-name-error" className="contact-field-error" hidden={!errors.name}>{errors.name}</p></div>
        <label>E-mail <small>opcional</small><input type="email" name="email" autoComplete="email" maxLength={254} /></label>
        <label>Telefone <small>opcional</small><input type="tel" name="phone" autoComplete="tel" maxLength={30} /></label>
        <label>Assunto<select name="subject" defaultValue="Visita" required><option>Visita</option><option>Escolas</option><option>Pesquisa</option><option>Imprensa</option><option>Parceria cultural</option><option>Eventos</option><option>Turismo</option><option>Acervo e doação</option><option>Outros</option></select></label>
        <div className="full"><label htmlFor="contact-message">Mensagem</label><textarea id="contact-message" name="message" rows={6} maxLength={1500} required onInput={clearError} aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? "contact-message-error" : undefined} /><p id="contact-message-error" className="contact-field-error" hidden={!errors.message}>{errors.message}</p></div>
        <div className="full"><button type="button" onClick={openWhatsApp}><MessageCircle aria-hidden="true" /> Continuar no WhatsApp</button><p id="form-status" aria-live="polite">{status}</p></div>
      </fieldset>
    </div>
  );
}
