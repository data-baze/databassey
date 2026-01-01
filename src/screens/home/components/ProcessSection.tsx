import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../components/utils/animation";

type ProcessSectionProps = {
  steps: any[];
};
const ProcessSection = ({ steps }: ProcessSectionProps) => {
  return (
    <section className="hidden md:block px-4 md:px-20 lg:px-32 pb-40">
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
        Your Website
        <span className="italic block">in 5 steps</span>
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mt-16"
      >
        <div className="absolute left-1/2 top-6 bottom-6 w-px bg-brand-primary/10 -translate-x-1/2" />

        <div className="grid md:grid-cols-9 gap-y-12">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 1;

            return (
              <motion.div
                key={step.id}
                variants={fadeUp}
                className={`md:col-span-4 ${
                  isLeft ? "md:col-start-1" : "md:col-start-6"
                }`}
              >
                <div className="bg-white/5 border border-brand-primary/10 p-6 backdrop-blur-sm">
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
                    {step.bullets.map((b: any, idx: number) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
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
