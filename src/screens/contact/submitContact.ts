export async function submitContact(formData: FormData, accessKey: string, fetcher: typeof fetch = fetch) {
  if (!accessKey.trim()) throw new Error('Contact service unavailable');
  // Send only the fields owned by the form, never arbitrary additional values.
  const payload = {
    access_key: accessKey,
    subject: 'Portfolio enquiry — Data Bassey',
    name: String(formData.get('name') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    enquiry_type: String(formData.get('enquiry_type') || 'Other'),
    message: String(formData.get('message') || '').trim(),
    botcheck: String(formData.get('botcheck') || ''),
  };
  if (!payload.name || !payload.email || !payload.message || payload.botcheck) {
    throw new Error('Invalid submission');
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetcher('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const result: unknown = await response.json();
    if (!response.ok || typeof result !== 'object' || result === null || !('success' in result) || result.success !== true) {
      throw new Error('Message was not accepted');
    }
  } finally {
    clearTimeout(timeout);
  }
}
