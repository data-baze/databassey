import { motion } from "framer-motion";

const skills = [
  {
    title: "Frontend Engineering",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Vite",
      "Redux Toolkit",
      "Zustand",
      "TanStack Query",
      "Tailwind CSS",
      "Chakra UI",
      "Bootstrap",
      "Accessibility (WCAG / A11y)",
      "Responsive Design",
      "SEO",
      "PWA",
    ],
  },
  {
    title: "Architecture & Engineering Principles",
    items: [
      "Separation of Concerns (SoC)",
      "SOLID Principles",
      "DRY",
      "KISS",
      "Clean Architecture",
      "Component-driven Design",
      "Design Systems",
      "Scalable Frontend Architecture",
    ],
  },
  {
    title: "Internationalization & Localization",
    items: [
      "Internationalization (i18n)",
      "Localization",
      "Language Translation",
      "Igbo",
      "Hausa",
      "Yoruba",
      "Locale Formatting",
      "RTL / LTR Support",
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      "Node.js",
      "Django",
      "Django REST Framework (DRF)",
      "RESTful APIs",
      "Authentication (JWT, OAuth)",
      "Firebase Authentication",
      "PostgreSQL",
      "MongoDB",
      "SQL",
    ],
  },
  {
    title: "DevOps, Cloud & Tooling",
    items: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Azure",
      "CI/CD Pipelines",
      "GitHub Actions",
      "Azure DevOps",
      "Linux",
      "Windows",
      "macOS",
    ],
  },
  {
    title: "Data Visualization & Animation",
    items: [
      "Chart.js",
      "Data Visualization",
      "Framer Motion",
      "Micro-interactions",
      "Dashboard Analytics",
    ],
  },
];

const SkillsSection = () => {
  return (
    <section className="px-4 md:px-20 lg:px-32 pb-10 md:pb-28">
      <h2 className="text-3xl md:text-4xl mb-12">
        Core <span className="italic">Skills</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-brand-primary/10 p-6 hover:bg-white/[0.07] transition"
          >
            <h3 className="text-lg mb-4 tracking-widest">
              {skill.title.toUpperCase()}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                  className="text-xs px-3 py-1 rounded-full border border-brand-primary/15 bg-white/5 text-brand-primary/70 hover:bg-white/8 hover:border-brand-primary/30 transition"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
