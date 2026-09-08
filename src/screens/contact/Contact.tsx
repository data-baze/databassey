import { ArrowUpRight, LoaderCircle } from 'lucide-react';
import Seo from '../../components/Seo';
import { contact } from '../../content/portfolio';
import { useContactForm } from './hooks/useContactForm';

export default function Contact() {
  const { handleSubmit, status, configured } = useContactForm();
  return <div className="container">
    <Seo title="Contact" description="Contact Data Bassey for engineering opportunities and project enquiries. Based in Lagos, Nigeria." />
    <section className="page-intro"><p className="eyebrow">Contact / Start a conversation</p><h1>Your next product.<br /><span className="serif">Our next conversation.</span></h1><p>For engineering opportunities or project enquiries, email me directly or leave a message below.</p></section>
    <section className="contact-grid section" aria-label="Contact details and message form"><div className="contact-details"><p className="eyebrow">Email me directly</p><a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}<ArrowUpRight size={22} aria-hidden="true" /></a><p>Lagos, Nigeria<br /><span className="muted">West Africa Time · UTC+1</span></p><div className="contact-socials"><a className="text-link" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a><a className="text-link" href={contact.github} target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></div><div className="contact-note"><h2>A little context helps.</h2><p>For a role, share the team and what you’re building. For a project, tell me about the problem, scope, and any delivery constraints.</p></div></div>
      <div className="contact-form-card"><h2>Leave a message.</h2><p className="muted">All fields are required.</p>
        {configured ? <form onSubmit={handleSubmit}>
          <fieldset disabled={status === 'loading'}>
            <div className="form-row"><div className="field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" required maxLength={120} /></div><div className="field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div></div>
            <div className="field"><label htmlFor="contact-type">What would you like to discuss?</label><select id="contact-type" name="enquiry_type" required defaultValue=""><option value="" disabled>Select an enquiry type</option><option value="Engineering role">Engineering role</option><option value="Project enquiry">Project enquiry</option><option value="Other">Other</option></select></div>
            <div className="field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" required rows={6} maxLength={5000} aria-describedby="message-help" /><p id="message-help" className="small muted">A short introduction and a few details are enough.</p></div>
            <div hidden aria-hidden="true"><label htmlFor="contact-botcheck">Leave this empty</label><input id="contact-botcheck" name="botcheck" tabIndex={-1} autoComplete="off" /></div>
            <button className="button primary" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Sending…' : 'Send message'}{status === 'loading' ? <LoaderCircle className="loading-spinner" size={18} aria-hidden="true" /> : <ArrowUpRight size={18} aria-hidden="true" />}</button>
          </fieldset>
          <p className="small muted form-privacy">Your details are sent through Web3Forms to deliver your enquiry.</p>
          <div className="form-status" role="status" aria-live="polite" aria-atomic="true">{status === 'success' && <p className="success-message">Your message has been sent. Thank you for getting in touch.</p>}{status === 'error' && <p className="error-message">Your message could not be confirmed as sent. Your text is still here—try again, or <a href={`mailto:${contact.email}`}>email me directly</a>.</p>}</div>
        </form> : <div className="callout"><p>Please email me directly to start a conversation.</p><a className="text-link" href={`mailto:${contact.email}`}>Send an email<ArrowUpRight size={18} aria-hidden="true" /></a></div>}
      </div>
    </section>
  </div>;
}
