import { ArrowDown, ArrowUpRight } from "lucide-react";
import { socials } from "../../components/utils/constants";

const certificates = [
  {
    title: "Machine Learning A-Z: AI, Python & R + ChatGPT Prize [2025]",
    date: "Dec 2025",
    href: "#",
  },
  {
    title: " AWS Cloud Technical Essentials",
    date: "July 2024",
    href: "https://coursera.org/verify/RV5DTN9SE2YR",
  },
  {
    title: "IBM Introduction to Containers – Docker, Kubernetes and OpenShift",
    date: "Jan 2024",
    href: "https://coursera.org/verify/Y5K83FQKDYCW",
  },
  {
    title: "IBM Django Application Development with SQL and Databases",
    date: "Dec 2023",
    href: "https://coursera.org/verify/NWKP9P2BLAUS",
  },
  {
    title: "Node Js – The Complete Guide (MVC, REST APIs, GRAPHQL, DENO)",
    date: "July 2023",
    href: "https://ude.my/UC-c96779ac-f33e-4ab8-b6ab-17c8f1f75554",
  },
  {
    title: "The Ultimate 2022 Fullstack Web Development Bootcamp",
    date: "May 2022",
    href: "https://ude.my/UC-70a83845-772e-4979-bf72-11ffc0e9e8d0",
  },
];

const education = [
  {
    name: "University of Abuja, Abuja, Nigeria",
    date: "July 2023",
    degree: "Bachelor of Science (B.sc) Computer Science",
  },
  {
    name: "Edo State Polytechnic, Usen, Edo State Nigeria",
    date: "Sept 2019",
    degree: " National Diploma (ND) Computer Science",
  },
];
export default function About() {
  return (
    <div className="text-brand-primary">
      {/* HERO */}
      <div className="flex flex-col md:flex-row items-center  text-center px-6 md:px-20 lg:px-40 pt-4 md:pt-20 ">
        <div className="w-full md:w-1/2 self-start">
          <img
            src="/portrait.png"
            className="w-48 h-48 object-cover rounded-full opacity-90"
          />
        </div>
        <div className="flex flex-col py-4 md:max-w-7/12">
          <section className=" text-left  gap-4">
            <div className="space-y-2 pt-4">
              <h1 className="text-5xl font-light">Data</h1>
              <h2 className="text-5xl italic">Bassey</h2>

              <p className="text-brand-primary/60 max-w-lg mt-4 leading-relaxed font-chillax text-sm">
                Delivering premium Web Design and Development Services to Boost
                Your Online Presence.
              </p>
            </div>
            <div className=" text-sm font-normal text-brand-primary flex items-center gap-4 py-6">
              <button className="p-2 rounded-full bg-brand-primary/5 border border-brand-primary/15 text-brand-primary">
                <ArrowDown size={14} />
              </button>
              <span>ABOUT ME</span>
            </div>
          </section>

          <section className="">
            <div className="bg-white/5 border text-left border-brand-primary/15 px-4 py-8">
              <h3 className="text-xl mb-4">
                Your Partner in Bringing Your Web Design Vision to Life
              </h3>

              <p className="text-brand-primary/60 text-sm leading-relaxed mb-6">
                I help businesses create beautiful, modern, and high-performing
                websites that drive results. With years of experience in design
                and development, I tailor each project to meet unique business
                needs.
              </p>

              {/* Secondary Portrait */}
              <img
                src="/portrait2.png"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </section>

          <div className="grid grid-cols-2 gap-3 mt-3">
            {socials.map(({ name, icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center 
                             bg-brand-primary/5 border border-brand-primary/15 
                             px-4 py-3 text-xs
                             hover:bg-brand-primary/10 transition"
              >
                <div className="flex gap-2 items-center text-brand-primary/80">
                  <Icon size={15} />
                  <p>{name}</p>
                </div>
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>

          {/* EXPERIENCE ACCORDION (STATIC MOCK-UP) */}
          <section className="space-y-3 py-3 text-left mt-4 bg-brand-primary/5 px-2">
            <h3 className="mb-2 text-xl p-4">CERTIFICATE & COURSES</h3>
            {certificates.map((item, i) => (
              <div
                key={i}
                className="border-b gap-2 border-brand-primary/15 text-sm p-4 rounded-lg flex justify-between"
              >
                <span className="max-w-none md:max-w-8/12 ">{item.title}</span>
                <span className="text-brand-primary/60 whitespace-nowrap">
                  {item.date}
                </span>
              </div>
            ))}
          </section>

          <section className="space-y-3 py-3 text-left mt-4 bg-brand-primary/5 px-2">
            <h3 className="mb-2 text-xl p-4">EDUCATION </h3>
            {education.map((item, i) => (
              <div
                key={i}
                className="flex justify-between gap-2 items-center p-4 border-b border-brand-primary/15 text-sm rounded-lg "
              >
                <div className="flex flex-col gap-2 ">
                  <h3>{item.name}</h3>
                  <p>{item.degree}</p>
                </div>
                <span className="text-brand-primary/60 whitespace-nowrap">
                  {item.date}
                </span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
