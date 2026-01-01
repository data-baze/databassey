import { motion } from "framer-motion";
import { fadeUp } from "../../../components/utils/animation";
import type { ReactNode } from "react";

// TODO: chart unfinished, update this component later
// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
// } from "chart.js";

// const chartData = {
//   labels: ["React", "Next.js", "TypeScript", "Animation", "Testing"],
//   datasets: [
//     {
//       data: [90, 85, 88, 80, 70],
//     },
//   ],
// };

type DataVizSectionProps = {
  children: ReactNode;
};

export const DataVizSection = ({ children }: DataVizSectionProps) => (
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="px-4 md:px-20 pb-32"
  >
    {children}
  </motion.section>
);

//   <section className="px-4 md:px-20 lg:px-32 pb-32">
//           <div className="bg-white/5 border border-brand-primary/10 p-6">
//             <p className="text-xs tracking-widest text-brand-primary/60 mb-4">
//               DATA VISUALIZATION
//             </p>
//             <h3 className="text-xl font-light mb-6">
//               Skill Distribution Snapshot
//             </h3>
//             <div className="h-40">
//               <Bar
//                 data={chartData}
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: false,
//                   plugins: { legend: { display: false } },
//                   scales: {
//                     y: { display: false },
//                     x: { display: false },
//                   },
//                 }}
//               />
//             </div>
//           </div>
//         </section>
