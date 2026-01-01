import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../components/utils/animation";
import { careerRoles } from "../../../components/mock-data/data";

export function CareerTimeline() {
  return (
    <section className="px-4 md:px-20 lg:px-32 md:py-28 py-4">
      {/* Section header */}
      <motion.h3
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-2xl mb-4 md:mb-12 text-center"
      >
        Career <span className="italic">Timeline</span>
      </motion.h3>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative"
      >
        {/* Center vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-primary/10 -translate-x-1/2 hidden md:block" />

        <div className="grid md:grid-cols-9 gap-y-4 md:gap-y-16">
          {careerRoles.map((role, i) => {
            const isLeft = i % 2 === 1;

            const Card = (
              <motion.div
                variants={fadeUp}
                className="bg-white/5 border border-brand-primary/15 p-6 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-light">{role.company}</h4>
                  <span className="text-xs border border-brand-primary/20 px-2 py-1 rounded text-brand-primary/70">
                    {role.period}
                  </span>
                </div>

                <p className="text-sm italic mb-3 text-brand-primary/80">
                  {role.role}
                </p>

                <ul className="list-disc ml-5 space-y-1 text-sm text-brand-primary/60">
                  {role.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </motion.div>
            );

            return (
              <motion.div key={role.id} variants={fadeUp} className="contents">
                {/* Left column */}
                <div className="md:col-span-4 flex justify-end">
                  {isLeft ? Card : <div className="hidden md:block w-full" />}
                </div>

                {/* Center marker */}
                <div className="hidden md:flex md:col-span-1 justify-center">
                  <div className="w-3 h-3 mt-3 rounded-full bg-brand-primary" />
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
}
