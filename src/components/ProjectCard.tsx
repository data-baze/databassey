import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../content/portfolio';

export function ProjectDiagram({ project, compact = false }: { project: Project; compact?: boolean }) {
  return <div className={`project-diagram diagram-${project.slug}${compact ? ' compact' : ''}`}>
    <div className="diagram-caption"><span className="status-dot" />{compact ? 'System overview' : 'Workflow overview'}</div>
    <p className="diagram-headline">{project.highlight}</p>
    <ol className="diagram-flow">
      {project.journey.map((step, i) => <li key={step.title}>
        <span className="step-number">0{i + 1}</span>
        <span><strong>{step.title}</strong>{!compact && <span className="step-description">{step.text}</span>}</span>
      </li>)}
    </ol>
  </div>;
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className="project-card glow-card">
    <ProjectDiagram project={project} compact />
    <div className="project-card-copy">
      <p className="eyebrow">0{index + 1} / {project.category}</p>
      <h3><Link to={`/work/${project.slug}`}>{project.name}<ArrowUpRight size={24} aria-hidden="true" /></Link></h3>
      <p>{project.summary}</p>
      <p className="project-role">{project.role}</p>
      {project.features && <ul className="feature-list" aria-label="Notable features">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>}
      <ul className="tags" aria-label="Technologies">{project.stack.slice(0, 4).map(item => <li key={item}>{item}</li>)}</ul>
      <Link className="text-link" to={`/work/${project.slug}`}>Read case study<span className="sr-only">: {project.name}</span><ArrowUpRight size={17} aria-hidden="true" /></Link>
    </div>
  </article>;
}
