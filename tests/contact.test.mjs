import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/screens/contact/submitContact.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const { submitContact } = await import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));

function message() {
  const form = new FormData();
  form.set('name', ' Test Visitor ');
  form.set('email', 'visitor@example.com');
  form.set('enquiry_type', 'Engineering role');
  form.set('message', 'A controlled test message.');
  form.set('unrelated', 'must not be transmitted');
  return form;
}
function response(ok, body) {
  return { ok, json: async () => body };
}

test('accepts only an explicit successful service response and sends an allowlisted payload', async () => {
  let captured;
  await submitContact(message(), 'test-key', async (url, options) => {
    captured = { url, options };
    return response(true, { success: true });
  });
  assert.equal(captured.url, 'https://api.web3forms.com/submit');
  assert.equal(captured.options.method, 'POST');
  const payload = JSON.parse(captured.options.body);
  assert.equal(payload.name, 'Test Visitor');
  assert.equal(payload.access_key, 'test-key');
  assert.equal(payload.enquiry_type, 'Engineering role');
  assert.equal(payload.unrelated, undefined);
});

test('HTTP 200 with a service failure cannot produce a success', async () => {
  await assert.rejects(submitContact(message(), 'test-key', async () => response(true, { success: false })));
});

test('an HTTP failure cannot be overridden by a success property', async () => {
  await assert.rejects(submitContact(message(), 'test-key', async () => response(false, { success: true })));
});

test('malformed or missing success information fails safely', async () => {
  for (const value of [null, {}, 'ok', { success: 'true' }]) {
    await assert.rejects(submitContact(message(), 'test-key', async () => response(true, value)));
  }
  await assert.rejects(submitContact(message(), 'test-key', async () => ({ ok: true, json: async () => { throw new Error('Invalid JSON'); } })));
});

test('network failures preserve the submitted data for retry', async () => {
  const form = message();
  await assert.rejects(submitContact(form, 'test-key', async () => { throw new Error('Offline'); }));
  assert.equal(form.get('message'), 'A controlled test message.');
});

test('missing configuration, whitespace-only content, and honeypot input never reach the service', async () => {
  let calls = 0;
  const fetcher = async () => { calls++; return response(true, { success: true }); };
  await assert.rejects(submitContact(message(), '', fetcher));
  const whitespace = message();
  whitespace.set('message', '   ');
  await assert.rejects(submitContact(whitespace, 'test-key', fetcher));
  const bot = message();
  bot.set('botcheck', 'filled');
  await assert.rejects(submitContact(bot, 'test-key', fetcher));
  assert.equal(calls, 0);
});
