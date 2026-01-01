import { motion } from "framer-motion";

import SkillsSection from "./components/SkillsSection";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServiceSection";
import ProcessSection from "./components/ProcessSection";
import SignatureSection from "./components/SignatureSection";
// import SelectedWorkSection from "./components/SelectedWorkSection";
import {
  caseStudies,
  discoverySteps,
  services,
} from "../../components/mock-data/data";

const Home = () => {
  return (
    <div>
      <div className=" text-brand-primary">
        <HeroSection />

        <ServicesSection services={services} />

        <SkillsSection />

        <ProcessSection steps={discoverySteps} />

        <section className="px-4 md:px-20 lg:px-32 pb-10 md:pb-28">
          <h2 className="text-3xl md:text-4xl mb-12">
            Case <span className="italic">Studies</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-brand-primary/10 p-8 hover:bg-white/[0.07] transition"
              >
                <p className="text-xs tracking-widest text-brand-primary/60 mb-2">
                  {cs.role.toUpperCase()}
                </p>
                <h3 className="text-2xl font-light mb-4">{cs.title}</h3>
                <p className="text-brand-primary/60 text-sm leading-relaxed mb-4">
                  {cs.summary}
                </p>
                <ul className="text-sm text-brand-primary/60 space-y-2">
                  {cs.highlights.map((h, idx) => (
                    <li key={idx}>• {h}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* <SelectedWorkSection /> */}
        <SignatureSection />
      </div>
    </div>
  );
};

export default Home;
