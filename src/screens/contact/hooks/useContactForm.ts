import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { submitContact } from '../submitContact';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim() || '';
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function useContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const inFlight = useRef(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!WEB3FORMS_KEY) { setStatus('error'); return; }
    inFlight.current = true;
    setStatus('loading');
    try {
      await submitContact(new FormData(form), WEB3FORMS_KEY);
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      inFlight.current = false;
    }
  };

  return { handleSubmit, status, configured: Boolean(WEB3FORMS_KEY) };
}
