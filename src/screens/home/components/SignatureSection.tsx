import { motion } from "framer-motion";
import { fadeUp } from "../../../components/utils/animation";
const SignatureSection = () => {
  return (
    <section className="px-4 md:px-20 lg:px-32">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-center gap-2 md:gap-4 items-center"
      >
        <h3 className="text-[20px] md:text-[60px] lg:text-[100px] font-light">
          Data.
        </h3>

        <img
          src="/images/new.png"
          alt="portrait"
          className="w-50 h-50 md:h-[460px] md:w-[460px] object-cover opacity-80 mb-10 mask-[linear-gradient(to_bottom,#0E0E0E_70%,transparent_92%)]"
        />

        <h3 className="text-[20px] md:text-[60px] lg:text-[100px] font-light italic">
          Bassey
        </h3>
      </motion.div>
    </section>
  );
};

export default SignatureSection;
