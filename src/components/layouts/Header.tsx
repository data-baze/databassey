import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Menu items inside the dropdown
  const menuLinks = [
    { label: "WORK", to: "/work" },
    { label: "BLOG", to: "/blog" },
    { label: "CONTACT", to: "/contact" },
  ];

  // Detect click outside of menu
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
        {/* Logo */}
        <h2 className="text-base md:text-xl font-light">Data.</h2>

        {/* MOBILE: Show few links */}
        <div className="flex md:hidden gap-3 items-center">
          <Link to="/" className="hover:text-brand-primary/60 transition">
            SERVICES
          </Link>

          <Link to="/about" className="hover:text-brand-primary/60 transition">
            ABOUT
          </Link>

          {/* Mobile Let's Talk */}
          <button
            className="px-3 py-1 bg-brand-primary text-brand-black  
            flex items-center gap-1 text-xs hover:opacity-80 transition"
          >
            LET'S TALK <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4">
          <Link to="/">SERVICES</Link>
          <Link to="/work">WORK</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/blog">BLOG</Link>
          <Link to="/contact">CONTACT</Link>
        </div>

        {/* Desktop Button */}
        <button
          className="hidden md:flex whitespace-nowrap px-4 py-2 bg-brand-primary 
          border border-brand-primary/10 hover:bg-brand-secondary 
          hover:text-brand-primary hover:border-brand-primary
          text-brand-black text-sm font-normal items-center gap-2 
           hover:opacity-80 transition"
        >
          LET'S TALK
          <ArrowUpRight size={16} />
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-brand-primary"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className={`absolute left-1/2 -translate-x-1/2 top-24 w-[90%] md:hidden 
        bg-brand-black border border-brand-primary/15  backdrop-blur-xl 
        text-brand-primary p-6 space-y-5 transition-all duration-300 ease-out
        ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        {/* Mobile Menu Links */}
        <div className="flex flex-col space-y-4 text-sm">
          {menuLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="hover:text-brand-primary/60 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile "Let's Talk" Button (Optional Duplicate or Remove) */}
        <button
          onClick={() => setOpen(false)}
          className="w-full text-center px-4 py-3 bg-brand-primary 
          border border-brand-primary/10 hover:bg-brand-secondary 
          hover:text-brand-primary hover:border-brand-primary
          text-brand-black text-sm font-normal flex items-center 
          justify-center gap-2  hover:opacity-80 transition"
        >
          LET'S TALK <ArrowUpRight size={16} />
        </button>
      </div>
    </nav>
  );
};

export default Header;
