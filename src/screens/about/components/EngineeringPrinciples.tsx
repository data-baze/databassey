const principles = [
  {
    title: "Separation of Concerns (SoC)",
    desc: "Clear boundaries between UI, state, and business logic for maintainability and scale.",
  },
  {
    title: "SOLID & Clean Architecture",
    desc: "Composable, testable components and predictable state management.",
  },
  {
    title: "Accessibility First",
    desc: "WCAG 2.1 compliance, ARIA roles, keyboard navigation, and screen reader support.",
  },
  {
    title: "Performance as a Feature",
    desc: "Optimized Core Web Vitals via code splitting, memoization, and bundle analysis.",
  },
];

export function EngineeringPrinciples() {
  return (
    <section className="mt-8">
      <h3 className="text-xl mb-4">Engineering Principles</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {principles.map((p, i) => (
          <div
            key={i}
            className="bg-white/5 border border-brand-primary/15 p-4"
          >
            <h4 className="mb-1">{p.title}</h4>
            <p className="text-sm text-brand-primary/60">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
