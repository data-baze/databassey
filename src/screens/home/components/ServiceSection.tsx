import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  scaleHover,
} from "../../../components/utils/animation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type Service = {
  id: string;
  title: string;
  desc: string;
};

type ServicesSectionProps = {
  services: Service[];
};

export const ServicesSection = ({ services }: ServicesSectionProps) => (
  <motion.section
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="px-4 md:px-20 lg:px-32 pb-10 md:pb-28 grid md:grid-cols-3 gap-6"
  >
    {services &&
      services?.map((s) => (
        <motion.div
          key={s.id}
          variants={fadeUp}
          whileHover={scaleHover.whileHover}
          transition={scaleHover.transition as any}
          className="bg-white/5 border border-brand-primary/10 p-6 hover:bg-white/[0.07] transition"
        >
          <p className="text-sm text-brand-primary/60 mb-3">{s.id}</p>
          <p className="text-lg  font-light tracking-widest mb-3">{s.title}</p>
          <p className="text-brand-primary/60 text-base font-chillax leading-relaxed">
            {s.desc}
          </p>

          <button className="mt-6 flex px-4 py-2 border border-brand-primary/5 justify-start items-center gap-2 hover:border hover:border-brand-primary transition w-full">
            <button className="p-2 rounded-full bg-brand-primary/5 border border-brand-primary/15 text-brand-primary">
              <ArrowUpRight size={16} />
            </button>
            <Link to="/about">{"LEARN MORE"}</Link>
          </button>
        </motion.div>
      ))}
  </motion.section>
);
