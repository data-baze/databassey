import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuLinks = [
    { label: "WORK", to: "/work" },
    { label: "BLOG", to: "/blog" },
    // { label: "CONTACT", to: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav className="pt-10 flex justify-center mb-20 relative">
      {/* NAV CONTAINER */}
      <div
        className="flex z-50 fixed backdrop-blur-sm bg-brand-primary/5 items-center 
        border border-brand-primary/15 px-4 md:px-6 py-3 md:py-4 
        text-brand-primary text-xs md:text-sm font-normal 
        space-x-4 md:space-x-6 "
      >
        <NavLink to={"/"} className="text-base md:text-xl font-light">
          Data.
        </NavLink>

        <div className="flex md:hidden gap-3 items-center">
          <a href="/about" className="hover:text-brand-primary/60 transition">
            ABOUT
          </a>
          <NavLink
            to="/contact"
            className="hover:text-brand-primary/60 transition"
          >
            CONTACT
          </NavLink>

          <a
            href="mailto:basseydata@gmail.com"
            className="px-3 py-1 bg-brand-primary text-brand-black  
            flex items-center gap-1 text-xs hover:opacity-80 transition"
          >
            LET'S TALK <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="hidden md:flex gap-4">
          {/* <a href="/#service">SERVICES</a> */}
          {/* <Link to="/work">WORK</Link> */}
          <NavLink to="/about">ABOUT</NavLink>
          {/* <NavLink to="/blog">BLOG</NavLink> */}
          <NavLink to="/contact">CONTACT</NavLink>
        </div>

        <a
          href="mailto:basseydata@gmail.com"
          className="hidden md:flex whitespace-nowrap px-4 py-2 bg-brand-primary 
          border border-brand-primary/10 hover:bg-brand-secondary 
          hover:text-brand-primary hover:border-brand-primary
          text-brand-black text-sm font-normal items-center gap-2 
           hover:opacity-80 transition"
        >
          LET'S TALK
          <ArrowUpRight size={16} />
        </a>

        <button
          className="md:hidden text-brand-primary"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        ref={menuRef}
        className={` z-50 fixed left-1/2 -translate-x-1/2 top-24 w-[85%] md:hidden 
        bg-brand-black/5 border border-brand-primary/15  backdrop-blur-xl 
        text-brand-primary p-6 space-y-5 transition-all duration-300 ease-out
        ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4 text-sm">
          {menuLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="hover:text-brand-primary/60 transition"
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* <button
          onClick={() => setOpen(false)}
          className="w-full text-center px-4 py-3 bg-brand-primary 
          border border-brand-primary/10 hover:bg-brand-secondary 
          hover:text-brand-primary hover:border-brand-primary
          text-brand-black text-sm font-normal flex items-center 
          justify-center gap-2  hover:opacity-80 transition"
        >
          LET'S TALK <ArrowUpRight size={16} />
        </button> */}
      </div>
    </nav>
  );
};

export default Header;
