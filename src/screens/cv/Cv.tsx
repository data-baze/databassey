import { ArrowDown, ArrowUpRight, Code2, Layers3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';

const cvs = [
  { title: 'Frontend engineering', description: 'Frontend architecture, React and TypeScript, enterprise interfaces, testing, and technical leadership.', file: '/cv/data-bassey-frontend.pdf', label: 'frontend', Icon: Layers3, project: '/work/enterprise-innovation', projectName: 'Enterprise Innovation Platform' },
  { title: 'Full-stack engineering', description: 'Frontend delivery alongside Django, NestJS, PostgreSQL, API design, and backend architecture.', file: '/cv/data-bassey-fullstack.pdf', label: 'full-stack', Icon: Code2, project: '/work/marketplace-backend', projectName: 'Marketplace backend' },
];

export default function Cv() {
  return <div className="container">
    <Seo title="Download resume" description="Download Data Bassey's frontend or full-stack engineering resume, with professional experience, selected projects, skills, and education." />
    <section className="page-intro"><p className="eyebrow">resume / Two perspectives</p><h1>The experience<br /><span className="serif">behind the work.</span></h1><p>Choose the resume most relevant to your role. Both include my professional experience, selected projects, technical skills, and education.</p></section>
    <section className="cv-grid section" aria-label="Available resume downloads">{cvs.map(({ Icon, ...cv }) => <article className="cv-card" key={cv.label}><Icon size={30} strokeWidth={1.4} aria-hidden="true" /><p className="eyebrow">PDF · 3 pages</p><h2>{cv.title}</h2><p>{cv.description}</p><div className="cv-actions"><a className="button primary" href={cv.file} download>Download {cv.label} resume<ArrowDown size={18} aria-hidden="true" /></a><a className="text-link" href={cv.file} target="_blank" rel="noreferrer">View PDF<span className="sr-only">: {cv.label} resume (opens in a new tab)</span><ArrowUpRight size={17} aria-hidden="true" /></a></div><div className="cv-related"><p className="eyebrow">See the work in context</p><Link className="text-link" to={cv.project}>{cv.projectName}<ArrowUpRight size={17} aria-hidden="true" /></Link></div></article>)}</section>
    <div className="cv-contact"><p>Have a role or project in mind?</p><Link className="text-link" to="/contact">Let’s discuss it<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
  </div>;
}
