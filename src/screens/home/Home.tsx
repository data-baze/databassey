import { ArrowUpRight } from "lucide-react";
import Logo1 from "/svgs/logo-1.svg";
import Logo2 from "/svgs/logo-2.svg";
import Logo3 from "/svgs/logo-37.svg";
import Logo4 from "/svgs/logo-4.svg";
import Logo5 from "/svgs/logo-5.svg";
import Logo6 from "/svgs/logo-6.svg";
import React from "react";

const discoverySteps = [
  {
    id: "01",
    eyebrow: "WE'LL MEET",
    duration: "30–60 min",
    title: "Discovery Call",
    desc: "Before we start, we determine fit and how I can help. We clarify goals, timeline and constraints.",
    bullets: [
      "Get to know each other",
      "Clarify goals & timeline",
      "Define scope & next steps",
    ],
  },
  {
    id: "02",
    eyebrow: "PLANNING",
    duration: "1–2 weeks",
    title: "Concept & Strategy",
    desc: "Project strategy and information architecture — wireframes, user flows and a content plan.",
    bullets: ["UX design", "Wireframes", "Interactive prototype"],
  },
  {
    id: "03",
    eyebrow: "CREATIVE",
    duration: "2 weeks",
    title: "Web Design",
    desc: "High-fidelity design tailored to your brand with responsive layouts and visual assets.",
    bullets: [
      "High-end visual design",
      "Responsive components",
      "Design handoff",
    ],
  },
  {
    id: "04",
    eyebrow: "BUILD",
    duration: "2–4 weeks",
    title: "Development",
    desc: "A fast, accessible and SEO-friendly site built with modern tooling and CMS when needed.",
    bullets: [
      "Custom front-end",
      "Modular components",
      "CMS integration & deployment",
    ],
  },
  {
    id: "05",
    eyebrow: "READY TO GO",
    duration: "1 week",
    title: "Website Onboarding",
    desc: "Handover, training and launch support — plus documentation so you can maintain the site.",
    bullets: [
      "Personal walkthrough",
      "Editable content training",
      "Launch support & tweaks",
    ],
  },
];
const services = [
  {
    id: "01",
    title: "WEB DESIGN",
    desc: "Beautiful, responsive websites crafted to convert and elevate your brand.",
  },
  {
    id: "02",
    title: "DEVELOPMENT",
    desc: "Fast, modern, SEO-optimized websites built with the latest technologies.",
  },
  {
    id: "03",
    title: "CONTENT & SEO",
    desc: "Optimized content and search strategies to increase your visibility.",
  },
];

const Home = () => {
  return (
    <div>
      <div className=" text-brand-primary">
        <section className="-mt-10 pb-24 flex flex-col items-center text-center">
          <img
            src="/images/new.png"
            alt="portrait"
            className="h-80 w-80 object-cover opacity-80 mb-10 mask-[linear-gradient(to_bottom,#0E0E0E_70%,transparent_92%)]"
          />

          <h1 className="text-4xl md:text-6xl font-light">
            Software Engineer
            <span className="italic block">& Developer</span>
          </h1>

          <p className="text-brand-primary/60 max-w-md mt-4 font-chillax text-sm leading-relaxed">
            Premium web design, development, and SEO services to help your
            business stand out.
          </p>

          <div className="flex gap-6 md:gap-12 mt-10 opacity-70 overflow-x-auto custom-scrollbar">
            <img src={Logo1} alt="Logo 1" />
            <img src={Logo2} alt="Logo 2" />
            <img src={Logo3} alt="Logo 3" />
            <img src={Logo4} alt="Logo 4" />
            <img src={Logo5} alt="Logo 5" />
            <img src={Logo6} alt="Logo 6" />
          </div>
        </section>

        <section className="px-6 md:px-20 lg:px-32 pb-28 grid md:grid-cols-3 gap-6">
          {services.map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-brand-primary/10 p-6 hover:bg-white/[0.07] transition"
            >
              <p className="text-sm text-brand-primary/60 mb-3">{item.id}</p>
              <p className="text-lg  font-light tracking-widest mb-3">
                {item.title}
              </p>
              <p className="text-brand-primary/60 text-base font-chillax leading-relaxed">
                {item.desc}
              </p>

              <button className="mt-6 flex px-4 py-2 border border-brand-primary/5 justify-center items-center gap-2 hover:border hover:border-brand-primary transition">
                <button className="p-2 rounded-full bg-brand-primary/5 border border-brand-primary/15 text-brand-primary">
                  <ArrowUpRight size={16} />
                </button>
                <p>{`ABOUT ${item.title.toUpperCase()}`}</p>
              </button>
            </div>
          ))}
        </section>

        {/* SELECTED WORK */}
        <section className="px-6 md:px-20 lg:px-32 pb-32">
          <h2 className="text-2xl md:4xl mb-10">
            Selected <span className="italic">Work</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {["/work1.png", "/work2.png", "/work3.png", "/work4.png"].map(
              (img, i) => (
                <div
                  key={i}
                  className="bg-white/5 p-4  border border-brand-primary/10 hover:bg-white/[0.07] transition"
                >
                  <img src={img} className="w-full h-64 object-cover " />
                  <div className="mt-4 flex justify-between border border-brand-primary  z-10 backdrop-blur-sm px-4 py-2">
                    <p className="text-brand-primary text-2xl">Project</p>
                    <button className="text-sm  transition">
                      WEB DEVELOPMENT
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* 5 Steps Section */}

        {/* 5 Steps Section */}
        <section className="px-6 md:px-20 lg:px-32 pb-40">
          <p className="text-brand-primary/60 tracking-widest text-xs text-center">
            THE PROCESS
          </p>

          <h2 className="text-4xl md:text-5xl font-light mt-6 text-center">
            Your Website
            <span className="italic block">in 5 steps</span>
          </h2>

          <p className="text-brand-primary/60 max-w-md mx-auto mt-6 text-sm leading-relaxed text-center">
            Our process ensures that we deliver a website tailored to your
            business needs.
          </p>

          {/* Timeline */}
          <div className="relative mt-12">
            {/* central vertical line for md+ (short top/bottom padding to avoid flush edges) */}
            <div className="hidden md:block absolute left-1/2 top-6 bottom-6 transform -translate-x-1/2 w-px bg-brand-primary/10" />

            <div className="grid grid-cols-1 md:grid-cols-9 gap-y-12">
              {discoverySteps.map((step, i) => {
                // invert sides so step 01 sits on the right like the reference image
                const isLeft = i % 2 === 1;
                // subtle vertical offset so cards alternate up/down
                const verticalOffsetClass = isLeft ? "md:mt-8" : "md:-mt-8";

                const Card = (
                  <div
                    className={`w-full md:w-[420px] bg-white/5 border border-brand-primary/10 p-6 backdrop-blur-sm hover:shadow-lg transition ${verticalOffsetClass}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-xs text-brand-primary/60 tracking-widest">
                        {step.eyebrow}
                      </div>
                      <div className="text-xs px-2 py-1 border border-brand-primary/10 rounded text-brand-primary/80">
                        {step.duration}
                      </div>
                    </div>

                    <h3 className="text-xl font-light mb-2">{step.title}</h3>
                    <p className="text-sm text-brand-primary/60 font-chillax leading-relaxed mb-3">
                      {step.desc}
                    </p>

                    <ul className="text-sm text-brand-primary/60 list-disc ml-5 space-y-1">
                      {step.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                );

                return (
                  <React.Fragment key={step.id}>
                    {/* left column */}
                    <div className={`md:col-span-4 flex md:justify-end`}>
                      {isLeft ? (
                        Card
                      ) : (
                        <div className="hidden md:block w-full md:w-[420px]" />
                      )}
                    </div>

                    {/* center marker */}
                    <div className="md:col-span-1 flex justify-center items-start">
                      <div className="relative flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-neutral-900 border border-brand-primary/10 flex items-center justify-center text-sm text-brand-primary z-10">
                          {i + 1}
                        </div>
                        {i < 4 && (
                          <div className="hidden md:block w-px bg-brand-primary/10 h-16 mt-2" />
                        )}
                      </div>
                    </div>

                    {/* right column */}
                    <div className={`md:col-span-4 flex md:justify-start`}>
                      {!isLeft ? (
                        Card
                      ) : (
                        <div className="hidden md:block w-full md:w-[420px]" />
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
