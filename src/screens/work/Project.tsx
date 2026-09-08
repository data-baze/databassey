import { ArrowLeft, ArrowUpRight, ArrowDown } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../../components/Seo';
import { ProjectDiagram } from '../../components/ProjectCard';
import { projects } from '../../content/portfolio';
import NotFound from '../not-found/NotFound';

export default function Project() {
  const { slug } = useParams();
  const index = projects.findIndex(project => project.slug === slug);
  const project = projects[index];
  if (!project) return <NotFound />;
  const next = projects[(index + 1) % projects.length];
  return <div className="container case-study">
    <Seo title={project.name} description={project.summary} />
    <Link className="text-link back-link" to="/work"><ArrowLeft size={17} aria-hidden="true" />All work</Link>
    <header className="case-header"><p className="eyebrow">{project.category}</p><h1>{project.name}</h1><p className="case-summary">{project.summary}</p><div className="case-meta"><div><span className="eyebrow">My role</span><p>{project.role}</p></div><div><span className="eyebrow">Scope of ownership</span><p>{project.scope}</p></div></div><ul className="tags" aria-label="Project technologies">{project.stack.map(item => <li key={item}>{item}</li>)}</ul></header>
    <ProjectDiagram project={project} />
    {project.features && <section className="project-features" aria-label="Notable features delivered"><p className="eyebrow">Notable features delivered</p><ul className="feature-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section>}
    <div className="case-layout">
      <nav className="case-navigation" aria-label="On this page"><p className="eyebrow">Inside the project</p><a href="#context">01 / Context</a><a href="#decisions">02 / Decisions</a><a href="#architecture">03 / Architecture</a><a href="#quality">04 / Quality</a><a href="#delivery">05 / Delivery</a></nav>
      <div className="case-content">
        <section id="context"><p className="eyebrow">01 / Context & challenge</p><h2>The problem<br /><span className="serif">behind the interface.</span></h2><p>{project.context}</p><div className="callout"><h3>The engineering challenge</h3><p>{project.problem}</p></div></section>
        <section id="decisions"><p className="eyebrow">02 / Engineering decisions</p><h2>Where I focused.</h2>{project.decisions.map((decision, i) => <article className="decision" key={decision.title}><span className="decision-index">0{i + 1}</span><div><h3>{decision.title}</h3><p>{decision.text}</p></div></article>)}</section>
        <section id="architecture"><p className="eyebrow">03 / Architecture</p><h2>How the pieces connect.</h2><p>A simplified view of the application structure and integration boundaries.</p><ol className="architecture-flow">{project.architecture.map((step, i) => <li key={step}><span>{step}</span>{i < project.architecture.length - 1 && <ArrowDown size={20} aria-hidden="true" />}</li>)}</ol></section>
        <section id="quality"><p className="eyebrow">04 / Quality & reliability</p><h2>Beyond the happy path.</h2><ul className="quality-list">{project.quality.map(item => <li key={item}>{item}</li>)}</ul></section>
        <section id="delivery"><p className="eyebrow">05 / Delivery</p><h2>What I delivered.</h2><p>{project.outcome}</p><div className="actions"><Link className="button primary" to="/contact">Discuss this work<ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="text-link" to="/resume">Download my resume<ArrowDown size={17} aria-hidden="true" /></Link></div></section>
      </div>
    </div>
    <Link className="next-project" to={`/work/${next.slug}`}><span><span className="eyebrow">Next case study</span><strong>{next.name}</strong></span><ArrowUpRight size={32} aria-hidden="true" /></Link>
  </div>;
}
