import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contact } from '../../content/portfolio';

export default function Footer() {
  return <footer className="site-footer">
    <div className="container">
      <div className="footer-invitation"><div><p className="eyebrow">Let’s work together</p><h2>Building a product?<br /><span className="serif">Growing your team?</span></h2></div><Link className="button primary" to="/contact">Get in touch<ArrowUpRight size={20} aria-hidden="true" /></Link></div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Data Bassey<br /><span className="muted">Lagos, Nigeria</span></p>
        <nav aria-label="Footer navigation"><Link to="/work">Work</Link><Link to="/about">About</Link><Link to="/resume">Resume</Link><Link to="/contact">Contact</Link></nav>
        <nav aria-label="Social profiles"><a href={contact.github} target="_blank" rel="noreferrer">GitHub<span className="sr-only"> (opens in a new tab)</span><ArrowUpRight size={14} aria-hidden="true" /></a><a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn<span className="sr-only"> (opens in a new tab)</span><ArrowUpRight size={14} aria-hidden="true" /></a><a href={`mailto:${contact.email}`}>Email<ArrowUpRight size={14} aria-hidden="true" /></a></nav>
      </div>
    </div>
  </footer>;
}
