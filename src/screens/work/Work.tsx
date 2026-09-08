import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../../components/ProjectCard';
import Seo from '../../components/Seo';
import { projects } from '../../content/portfolio';

export default function Work() {
  const [showAll, setShowAll] = useState(false);
  return <div className="container">
    <Seo title="Selected work" description="Explore Data Bassey's fintech engineering work: KYC, wallet and card interfaces, merchant dashboards, transaction operations, and conversational banking." />
    <section className="page-intro"><p className="eyebrow">Work / Selected projects</p><h1>Real complexity.<br /><span className="serif">Clear contributions.</span></h1><p>Fintech experience across identity verification, wallets, bank transfers, merchant operations, and conversational banking—alongside enterprise and backend systems. Explore the features I delivered and the decisions behind them.</p></section>
    <section className="section work-section" aria-label="Project case studies">
      <div id="work-projects" className="project-grid" data-mobile-expanded={showAll}>{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div>
      <button type="button" className="button secondary mobile-project-toggle" aria-expanded={showAll} aria-controls="work-projects" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show fewer projects' : `View all ${projects.length} projects`}</button>
    </section>
    <section className="additional-work"><p className="eyebrow">Also in my frontend practice</p><div><h2>More product contexts.</h2><div className="additional-work-detail"><article><h3>Trade Intelligence Portal</h3><p>Contributed to a trade intelligence and digital services portal spanning analytics, tariff tools, business directories, and an e-learning academy. Worked across a shared React and TypeScript codebase with data visualization and layered state management.</p></article></div><Link className="text-link" to="/resume">Read the frontend resume<ArrowUpRight size={18} aria-hidden="true" /></Link></div></section>
  </div>;
}
