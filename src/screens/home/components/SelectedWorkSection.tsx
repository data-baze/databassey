import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  fadeUp,
  staggerContainer,
  scaleHover,
} from "../../../components/utils/animation";
import type { Transition } from "framer-motion";

const projects = [
  "/images/portfolio-1.png",
  "/work2.png",
  "/work3.png",
  "/work4.png",
];

const SelectedWorkSection = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 md:px-20 lg:px-32 pb-32">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-2xl md:text-4xl mb-10"
      >
        Selected <span className="italic">Work</span>
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-6"
      >
        {projects.map((img, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={scaleHover.whileHover}
            transition={scaleHover.transition as Transition}
            onClick={() => navigate(`/services/${i + 1}`)}
            className="bg-white/5 cursor-pointer p-4 border border-brand-primary/10 hover:bg-white/[0.07] transition"
          >
            <img
              src={img}
              className="w-full h-64 object-cover mb-4"
              alt="Project preview"
            />

            <div className="flex justify-between border border-brand-primary backdrop-blur-sm px-4 py-2">
              <p className="text-brand-primary text-xl">Project</p>
              <span className="text-sm">WEB DEVELOPMENT</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SelectedWorkSection;
