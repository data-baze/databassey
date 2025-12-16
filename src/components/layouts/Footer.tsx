import { ArrowUpRight, ArrowUp } from "lucide-react";
import { socials } from "../utils/constants";

const Footer = () => {
  const pagesLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "WORK", href: "/work" },
    { name: "SERVICES", href: "/services" },
    { name: "CONTACT", href: "/contact" },
  ];
  return (
    <footer>
      <div className="bg-brand-primary/10 w-full py-3 overflow-x-hidden whitespace-nowrap flex gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="flex text-brand-primary text-sm tracking-wide space-x-8"
          >
            <p>++++</p> <p>Let’s talk</p>
          </span>
        ))}
      </div>

      <div className="w-full bg-brand-primary/5 text-brand-primary  px-6 md:px-20 lg:px-32">
        <div className="text-center max-w-3xl mx-auto space-y-4 py-16">
          <p className="tracking-widest text-xs ">PROJECT IN MIND?</p>

          <div className="text-5xl md:text-6xl font-light space-y-3">
            <p>Let’s make your</p>
            <h3 className="italic ">Website shine</h3>
          </div>

          <p className="text-[13px] text-brand-primary/60 max-w-sm mx-auto font-chillax">
            Premium web design, webflow, and SEO services to help your business
            stand out.
          </p>
          <div className="flex justify-center mt-8">
            <button className="text-center px-6 py-3 bg-brand-primary border border-brand-primary/10 hover:bg-brand-secondary hover:text-brand-primary hover:border hover:border-brand-primary text-brand-black  text-sm font-normal flex items-center gap-2  hover:opacity-80 transition">
              GET IN TOUCH
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 py-10">
          <div>
            <h2 className="text-2xl mb-6">Data.</h2>

            {/* <ul className="space-y-4 text-sm">
              {socials.map(({ name, icon: Icon }, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 hover:text-white transition"
                >
                  <span className="p-2 rounded-full bg-brand-primary/5 border border-brand-primary/15 text-brand-primary">
                    <Icon size={16} />
                  </span>
                  {name}
                </li>
              ))}
            </ul> */}

            <div className="grid grid-cols-1 gap-3 mt-3">
              {socials.map(({ name, icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center 
                                           
                                         pl-2 py-3 text-sm
                                         hover:bg-brand-primary/10 transition"
                >
                  <div className="flex gap-2 items-center text-brand-primary/80">
                    <Icon size={15} />
                    <p>{name}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm tracking-widest mb-6">Pages</h3>

            <ul className="grid grid-cols-1 md:grid-cols-1 text-sm">
              {pagesLinks.map(({ name, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="hover:bg-brand-primary/10  pl-2 py-3 transition"
                >
                  {name}
                </a>
              ))}
            </ul>

            <button className="mt-6 px-5 py-2 whitespace-nowrap border border-brand-primary text-brand-primary text-sm font-normal flex items-center gap-2 hover:bg-brand-primary hover:text-brand-black transition ">
              LET'S TALK
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div>
            <h3 className="text-sm tracking-widest mb-6">CMS</h3>

            <ul className="space-y-4 text-sm ">
              <li className="hover:bg-brand-primary/10 transition pl-2 py-1.5">
                WORK
              </li>
              <li className="hover:bg-brand-primary/10 transition pl-2 py-1.5">
                WORK SINGLE
              </li>
              <li className="hover:bg-brand-primary/10 transition pl-2 py-1.5">
                BLOG
              </li>
              <li className="hover:bg-brand-primary/10 transition pl-2 py-1.5">
                BLOG POST
              </li>
            </ul>
          </div>

          <div className="hidden md:block ">
            <h3 className="text-sm tracking-widest mb-6">Utility Pages</h3>

            <ul className="space-y-4 text-sm">
              <li className="hover:text-white transition">404 ERROR PAGE</li>
              <li className="hover:text-white transition">
                PASSWORD PROTECTED
              </li>
              <li className="hover:text-white transition">STYLEGUIDE</li>
              <li className="hover:text-white transition">LICENSING</li>
              <li className="hover:text-white transition">CHANGELOG</li>
            </ul>
          </div>
        </div>

        <div className="py-8 flex items-center justify-between text-xs text-brand-primary">
          <p>© 2025 Made by Data. Powered by Framer.</p>
          <div className=" text-sm font-normal text-brand-primary flex items-center gap-4">
            <p>TO TOP</p>
            <button className="p-2 rounded-full bg-brand-primary/5 border border-brand-primary/15 text-brand-primary">
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
