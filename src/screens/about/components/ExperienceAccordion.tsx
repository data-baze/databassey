import { useState } from "react";
export const experienceHighlights = [
  {
    company: "Infinion Technologies Ltd",
    role: "Senior Frontend Developer",
    period: "Sept 2025 – Present",
    highlights: [
      "Owned frontend architecture and technical decision-making for enterprise applications",
      "Led delivery of 3 production-ready POCs from design to deployment",
      "Built AI-powered banking chatbot interfaces with React, Next.js, Tailwind, and RTK",
      "Implemented secure auth using OAuth, MSAL, and RBAC",
      "Improved Core Web Vitals through code splitting and lazy loading",
    ],
  },
  {
    company: "Payvessel",
    role: "Senior Frontend Developer",
    period: "Mar 2024 – Aug 2025",
    highlights: [
      "Redesigned merchant and admin dashboards used at scale",
      "Implemented RBAC with granular admin permissions",
      "Built transaction management for batch and single operations",
      "Improved dashboard performance by ~45%",
    ],
  },
];
export function ExperienceAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mt-8 bg-brand-primary/5 px-4 py-6">
      <h3 className="text-xl mb-4">Experience Highlights</h3>

      {experienceHighlights.map((exp, i) => (
        <div key={i} className="border-b border-brand-primary/15">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-center py-4 text-left"
          >
            <div>
              <p className="font-medium">{exp.company}</p>
              <p className="text-sm text-brand-primary/60">
                {exp.role} · {exp.period}
              </p>
            </div>
            <span className="text-brand-primary/60">
              {open === i ? "−" : "+"}
            </span>
          </button>

          {open === i && (
            <ul className="pb-4 pl-5 list-disc text-sm text-brand-primary/60 space-y-1">
              {exp.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}
