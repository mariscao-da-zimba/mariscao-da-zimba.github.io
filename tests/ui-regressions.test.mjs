import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareContactMessage } from '../components/contact-message.ts';

const validFields = {
  name: 'Célio de Oliveira',
  email: '',
  phone: '',
  subject: 'Visita',
  message: 'Gostaria de agendar uma visita.',
};

test('contato rejeita nome e mensagem vazios após normalização, sem preparar texto de envio', () => {
  for (const whitespace of ['', '   ', '\t\n', '\u00a0\u2003']) {
    const draft = prepareContactMessage({ ...validFields, name: whitespace, message: whitespace });
    assert.equal(draft.valid, false);
    assert.ok(draft.errors.name);
    assert.ok(draft.errors.message);
    assert.ok(!Object.hasOwn(draft, 'text'));
  }
});

test('contato identifica o campo obrigatório vazio sem marcar o outro campo válido', () => {
  const missingName = prepareContactMessage({ ...validFields, name: '   ' });
  assert.equal(missingName.valid, false);
  assert.ok(missingName.errors.name);
  assert.equal(missingName.errors.message, undefined);

  const missingMessage = prepareContactMessage({ ...validFields, message: '   ' });
  assert.equal(missingMessage.valid, false);
  assert.ok(missingMessage.errors.message);
  assert.equal(missingMessage.errors.name, undefined);
});

test('contato normaliza bordas, preserva parágrafos e inclui dados opcionais fornecidos', () => {
  const draft = prepareContactMessage({
    name: '  Célio de Oliveira  ',
    email: '  celio@example.com  ',
    phone: '  (48) 99999-9999  ',
    subject: '  Escolas  ',
    message: '  Uma visita com a escola.\n\nSomos 20 alunos.  ',
  });
  assert.equal(draft.valid, true);
  assert.deepEqual(draft.errors, {});
  assert.match(draft.text, /Nome: Célio de Oliveira\n/);
  assert.match(draft.text, /E-mail: celio@example\.com\n/);
  assert.match(draft.text, /Telefone: \(48\) 99999-9999\n/);
  assert.match(draft.text, /Assunto: Escolas\n/);
  assert.ok(draft.text.endsWith('Uma visita com a escola.\n\nSomos 20 alunos.'));
});

test('contato preserva alternativas para campos opcionais não informados', () => {
  const draft = prepareContactMessage({ ...validFields, email: ' ', phone: '\t', subject: '\n' });
  assert.equal(draft.valid, true);
  assert.match(draft.text, /E-mail: Não informado\nTelefone: Não informado\nAssunto: Contato pelo site\n/);
});
