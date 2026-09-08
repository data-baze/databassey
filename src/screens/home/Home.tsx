import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import ProjectCard from '../../components/ProjectCard';
import HeroSystem from '../../components/HeroSystem';
import { capabilities, projects } from '../../content/portfolio';

export default function Home() {
  return <>
    <Seo title="Senior Software Engineer" description="Data Bassey builds fintech and enterprise applications with React, TypeScript, Django, and NestJS. Explore frontend architecture, full-stack delivery, and technical leadership." />
    <section className="container hero">
      <div className="hero-copy"><p className="eyebrow"><span className="status-dot" />Software engineer · Lagos, Nigeria</p>
        <h1>Frontend architecture.<br /><span className="serif">Full-stack delivery.</span></h1>
        <p className="hero-intro">I’m Data Bassey, a senior software engineer with hands-on fintech experience across facial-recognition KYC, wallet and card interfaces, bank transfers, and merchant operations. I build with React and TypeScript, backed by full-stack delivery with Django and NestJS.</p>
        <div className="actions"><Link className="button primary" to="/work">Explore my work<ArrowUpRight size={19} aria-hidden="true" /></Link><Link className="button secondary" to="/resume">Download resume<ArrowDown size={18} aria-hidden="true" /></Link></div>
      </div>
      <HeroSystem />
    </section>
    <section className="container section" aria-labelledby="selected-work">
      <div className="section-heading"><div><p className="eyebrow">01 / Selected work</p><h2 id="selected-work">Fintech workflows.<br /><span className="serif">Enterprise foundations.</span></h2></div><Link className="text-link" to="/work">All projects<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      <div className="project-grid home-project-grid">{projects.slice(0, 4).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
      <Link className="button secondary mobile-project-toggle" to="/work">Browse all projects<ArrowUpRight size={18} aria-hidden="true" /></Link>
      <Link className="project-feature-row" to="/work/marketplace-backend"><span className="eyebrow">05 / Backend engineering</span><span><strong>Marketplace backend</strong><span className="muted">NestJS, PostgreSQL, Redis · Identity, inventory, and orders</span></span><ArrowUpRight aria-hidden="true" /><span className="sr-only">Read case study</span></Link>
    </section>
    <section className="leadership-band"><div className="container leadership"><div><p className="eyebrow">02 / Leadership & delivery</p><h2>Beyond the<br /><span className="serif">individual feature.</span></h2><p>I’ve led engineers, established reusable frontend foundations, and worked across product and backend teams to turn requirements into working applications.</p><Link className="text-link" to="/about">My experience<ArrowUpRight size={18} aria-hidden="true" /></Link></div><div className="proof-points"><div><strong>8</strong><span>Engineers led at MSORG Developers</span></div><div><strong>9+</strong><span>Production applications with frontend architecture ownership at MSORG</span></div><div><strong>2020</strong><span>The start of my professional web development journey</span></div></div></div></section>
    <section className="container section"><div className="section-heading"><div><p className="eyebrow">03 / Engineering capabilities</p><h2>Built on clear<br /><span className="serif">technical foundations.</span></h2></div></div><div className="capabilities">{capabilities.map((item, index) => <article key={item.title}><span className="eyebrow">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><Link className="text-link" to={item.project ? `/work/${item.project}` : '/about'}>{item.example}<ArrowUpRight size={17} aria-hidden="true" /></Link></article>)}</div></section>
    <section className="container about-preview"><p className="eyebrow">The person behind the work</p><div><h2>Clarity for users.<br /><span className="serif">Confidence for teams.</span></h2><p>My work sits at the intersection of user workflows and maintainable software. I care about what happens after the happy path: changing data, permissions, error states, and the next engineer who works on the feature.</p><Link className="text-link" to="/about">More about me<ArrowUpRight size={18} aria-hidden="true" /></Link></div></section>
  </>;
}
