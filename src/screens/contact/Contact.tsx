import { ArrowUpRight } from "lucide-react";
import { socials } from "../../components/utils/constants";

export default function Contact() {
  return (
    <div className="text-brand-primary">
      <section className="px-6 md:px-20 lg:px-40 pt-28 pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <img
            src="/portrait.png"
            className="w-full h-96 object-cover opacity-90
                     [mask-image:linear-gradient(to_bottom,white_75%,transparent_100%)]"
          />

          {/* Form + Socials */}
          <div className="w-full">
            {/* Contact Form */}
            <div className="bg-white/5 border border-brand-primary/15 p-8">
              <h2 className="text-xl mb-4">Let’s get in touch.</h2>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-brand-primary/5 border border-brand-primary/15 
                             text-brand-primary px-4 py-3 focus:outline-none"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-brand-primary/5 border border-brand-primary/15 
                             text-brand-primary px-4 py-3 focus:outline-none"
                />

                <textarea
                  placeholder="Message"
                  rows={5}
                  className="w-full bg-brand-primary/5 border border-brand-primary/15 
                             text-brand-primary px-4 py-3 focus:outline-none"
                />

                <button
                  type="submit"
                  className="w-full bg-brand-primary text-black py-3 text-sm font-medium 
                             hover:opacity-90 transition"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>

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
          </div>
        </div>
      </section>
    </div>
  );
}
