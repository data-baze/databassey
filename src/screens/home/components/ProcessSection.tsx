import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../components/utils/animation";

type ProcessSectionProps = {
  steps: {
    id: string;
    eyebrow: string;
    duration: string;
    title: string;
    desc: string;
    bullets: string[];
  }[];
};

const ProcessSection = ({ steps }: ProcessSectionProps) => {
  return (
    <section className="hidden md:block px-4 md:px-20 lg:px-32 pb-40">
      {/* Header */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-brand-primary/60 tracking-widest text-xs text-center"
      >
        THE PROCESS
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-light mt-6 text-center"
      >
        Senior Frontend Delivery
        <span className="italic block">in 5 steps</span>
      </motion.h2>

      {/* Timeline */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mt-16"
      >
        {/* Center vertical line */}
        <div className="absolute left-1/2 top-6 bottom-6 w-px bg-brand-primary/10 -translate-x-1/2" />

        <div className="grid md:grid-cols-9 gap-y-12">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 1;

            const Card = (
              <motion.div
                variants={fadeUp}
                className="bg-white/5 border border-brand-primary/10 p-6 backdrop-blur-sm"
              >
                <div className="flex justify-between mb-3">
                  <span className="text-xs tracking-widest text-brand-primary/60">
                    {step.eyebrow}
                  </span>
                  <span className="text-xs border px-2 py-1 rounded">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-xl font-light mb-2">{step.title}</h3>

                <p className="text-sm text-brand-primary/60 mb-3">
                  {step.desc}
                </p>

                <ul className="list-disc ml-5 text-sm text-brand-primary/60 space-y-1">
                  {step.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </motion.div>
            );

            return (
              <motion.div key={step.id} variants={fadeUp} className="contents">
                {/* Left column */}
                <div className="md:col-span-4 flex justify-end">
                  {isLeft ? Card : <div className="hidden md:block w-full" />}
                </div>

                {/* Center marker */}
                <div className="hidden md:flex md:col-span-1 justify-center">
                  <div className="w-3 h-3 mt-4 rounded-full bg-brand-primary" />
                </div>

                {/* Right column */}
                <div className="md:col-span-4 flex justify-start">
                  {!isLeft ? Card : <div className="hidden md:block w-full" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default ProcessSection;
