import { ArrowUpRight } from "lucide-react";
import { socials } from "../../components/utils/constants";
import { useContactForm } from "./hooks/useContactForm";

export default function Contact() {
  const { handleSubmit, status } = useContactForm();
  return (
    <div className="text-brand-primary">
      <section className="px-4 md:px-20 lg:px-40 md:pt-28 pt-4 pb-10 md:pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <img
            src="/images/new.png"
            alt="portrait"
            className="h-80 w-80 object-cover opacity-80 mb-10 mask-[linear-gradient(to_bottom,#0E0E0E_70%,transparent_92%)]"
          />

          {/* Form + Socials */}
          <div className="w-full">
            {/* Contact Form */}
            <div className="bg-white/5 border border-brand-primary/15 p-8">
              <h2 className="text-xl mb-6">Let’s get in touch.</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full bg-brand-primary/5 border border-brand-primary/15 
                             text-brand-primary px-4 py-3 focus:outline-none"
                />

                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full bg-brand-primary/5 border border-brand-primary/15 
                             text-brand-primary px-4 py-3 focus:outline-none"
                />

                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Message"
                  className="w-full bg-brand-primary/5 border border-brand-primary/15 
                             text-brand-primary px-4 py-3 focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-brand-primary text-black py-3 text-sm font-medium 
                             hover:opacity-90 transition disabled:opacity-50"
                >
                  {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
                </button>

                {status === "success" && (
                  <p className="text-green-500 text-sm">
                    Message sent successfully.
                  </p>
                )}

                {status === "error" && (
                  <p className="text-red-500 text-sm">
                    Something went wrong. Please try again.
                  </p>
                )}
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
