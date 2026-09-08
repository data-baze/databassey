import { useState } from 'react';
import { ArrowUpRight, Database, Layers3, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePointerDepth } from './motion/usePointerDepth';

const layers = [
  { id: 'interface', label: 'Interface', subtitle: 'React · TypeScript', Icon: Layers3, title: 'Make complex workflows usable.', text: 'Merchant dashboards, wallet and card interfaces, and single or batch transaction operations.', href: '/work/payvessel', project: 'Explore Payvessel' },
  { id: 'identity', label: 'Identity', subtitle: 'KYC · Permissions', Icon: ShieldCheck, title: 'Build identity into the journey.', text: 'Facial-recognition KYC with Amazon Rekognition, onboarding, and bank-transfer workflows.', href: '/work/dancity', project: 'Explore Dancity' },
  { id: 'data', label: 'Data & APIs', subtitle: 'NestJS · PostgreSQL', Icon: Database, title: 'Connect the systems behind the UI.', text: 'Modular APIs, inventory reservations, and real-time order updates backed by PostgreSQL and Redis.', href: '/work/marketplace-backend', project: 'Explore the backend' },
];

export default function HeroSystem() {
  const [selected, setSelected] = useState(0);
  const depth = usePointerDepth<HTMLDivElement>(6);
  const active = layers[selected];
  return <div className="hero-system">
    <div className="system-identity">
      <img src="/images/new.png" alt="Data Bassey" width="64" height="64" fetchPriority="high" />
      <div><strong>Data Bassey</strong><span>Software Engineer</span></div>
      <span className="system-monogram" aria-hidden="true">DB.</span>
    </div>
    <div className="system-explorer">
      <div className="system-caption"><span>Engineering in layers</span><span aria-hidden="true">0{selected + 1} / 03</span></div>
      <div className="system-stage" {...depth}>
        <div className="system-stack" aria-hidden="true">
          {layers.map(({ id, label, subtitle, Icon }, index) => <div key={id} className={`system-layer layer-${index}${selected === index ? ' selected' : ''}`}>
            <Icon size={22} strokeWidth={1.5} />
            <span><strong>{label}</strong><small>{subtitle}</small></span>
            <span className="layer-node" />
          </div>)}
        </div>
      </div>
      <div className="system-controls" role="group" aria-label="Explore an engineering layer">
        {layers.map((layer, index) => <button type="button" key={layer.id} aria-pressed={selected === index} aria-controls="system-detail" onClick={() => setSelected(index)}><span>{layer.label}</span></button>)}
      </div>
      <div id="system-detail" className="system-detail" aria-live="polite" aria-atomic="true">
        <div key={active.id}><h2>{active.title}</h2><p>{active.text}</p><Link className="text-link" to={active.href}>{active.project}<ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      </div>
    </div>
  </div>;
}
