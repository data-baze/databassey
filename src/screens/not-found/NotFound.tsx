import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';

export default function NotFound() {
  return <section className="container not-found">
    <Seo title="Page not found" description="This page could not be found. Explore Data Bassey's selected engineering work or return home." noIndex />
    <p className="eyebrow">404 / Page not found</p><h1>A missing page.<br /><span className="serif">A way forward.</span></h1><p>This address doesn’t lead to a page. My selected work is a good place to start.</p><div className="actions"><Link className="button primary" to="/work">Explore my work<ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="text-link" to="/"><ArrowLeft size={18} aria-hidden="true" />Back home</Link></div>
  </section>;
}
