export type ContactMessageFields = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactMessageErrors = Partial<Record<"name" | "message", string>>;

type ContactMessageDraft =
  | { valid: false; errors: ContactMessageErrors }
  | { valid: true; errors: ContactMessageErrors; text: string };

export function prepareContactMessage(fields: ContactMessageFields): ContactMessageDraft {
  const name = fields.name.trim();
  const message = fields.message.trim();
  const errors: ContactMessageErrors = {};
  if (!name) errors.name = "Informe seu nome. Espaços em branco não são suficientes.";
  if (!message) errors.message = "Escreva sua mensagem. Espaços em branco não são suficientes.";
  if (errors.name || errors.message) return { valid: false, errors };

  return {
    valid: true,
    errors,
    text: [
      "Olá, Mariscão da Zimba! Entro em contato pelo site.",
      "",
      `Nome: ${name}`,
      `E-mail: ${fields.email.trim() || "Não informado"}`,
      `Telefone: ${fields.phone.trim() || "Não informado"}`,
      `Assunto: ${fields.subject.trim() || "Contato pelo site"}`,
      "",
      message,
    ].join("\n"),
  };
}
