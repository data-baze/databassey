// HeroSection.tsx
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../components/utils/animation";
import Logo1 from "/svgs/logo-1.svg";
import Logo2 from "/svgs/logo-2.svg";
import Logo3 from "/svgs/logo-37.svg";
import Logo4 from "/svgs/logo-4.svg";
import Logo5 from "/svgs/logo-5.svg";
import Logo6 from "/svgs/logo-6.svg";

export const HeroSection = () => (
  <motion.section
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className="-mt-10 pb-10 md:pb-24 flex flex-col items-center text-center"
  >
    <motion.img
      variants={fadeUp}
      src="/images/new.png"
      alt="portrait"
      className="h-80 w-80 object-cover opacity-80 mb-10 mask-[linear-gradient(to_bottom,#0E0E0E_70%,transparent_92%)]"
    />

    <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-light">
      Senior Software Engineer
      <span className="italic block">& Frontend Specialist</span>
    </motion.h1>

    <motion.p
      variants={fadeUp}
      className="text-brand-primary/60 max-w-lg mt-4 font-chillax text-sm leading-relaxed"
    >
      I design and build scalable, high-performance web applications and
      dashboards using modern frontend architecture, accessibility best
      practices, and production-ready tooling.
    </motion.p>

    <div className="mt-10 opacity-70 w-full overflow-hidden custom-scrollbar">
      <div className="marquee w-full py-3 overflow-x-hidden  ">
        <div className="marquee-track">
          {[Logo1, Logo2, Logo3, Logo4, Logo5, Logo6].map((Logo, idx) => (
            <img
              key={idx}
              src={Logo}
              alt={`Logo ${idx + 1}`}
              className="h-9 md:h-12 w-auto mx-3 md:mx-6 opacity-90"
            />
          ))}

          {[Logo1, Logo2, Logo3, Logo4, Logo5, Logo6].map((Logo, idx) => (
            <img
              key={`dup-${idx}`}
              src={Logo}
              alt={`Logo dup ${idx + 1}`}
              className="h-9 md:h-12 w-auto mx-3 md:mx-6 opacity-90"
            />
          ))}
        </div>
      </div>
    </div>
  </motion.section>
);
