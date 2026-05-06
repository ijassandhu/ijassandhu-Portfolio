"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";
import { navLinks, personalInfo } from "@/data/portfolio";

function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const ids = navLinks.map((l) => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 96 >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md"
            : "bg-[#f7f8f8]/80 backdrop-blur-sm"
        }`}
        style={
          scrolled
            ? { boxShadow: "0 1px 0 rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)" }
            : {}
        }
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[64px]">

            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleLink("#home"); }}
              whileHover={{ opacity: 0.72 }}
              className="text-[15px] font-bold text-[#111827] tracking-[-0.01em] shrink-0 select-none transition-opacity"
            >
              Jaskeerat Singh
            </motion.a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = "#" + activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleLink(link.href); }}
                    className={`px-3 py-1.5 text-[13.5px] rounded-md transition-all duration-200 ${
                      isActive
                        ? "text-[#111827] font-semibold bg-black/[0.05]"
                        : "text-[#4b5563] font-medium hover:text-[#111827] hover:bg-black/[0.04]"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div
                className="flex items-center gap-2 ml-3 pl-3"
                style={{ borderLeft: "1px solid rgba(0,0,0,0.08)" }}
              >
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium text-[#4b5563] hover:text-[#4f858b] rounded-md transition-colors duration-200"
                >
                  Resume
                  <ExternalLink size={10} strokeWidth={2.5} />
                </a>

                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleLink("#contact"); }}
                  className="px-4 py-[7px] text-[13px] font-semibold text-white rounded-full transition-colors duration-200"
                  style={{ backgroundColor: "#4f858b" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#3a666b"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#4f858b"; }}
                >
                  Hire Me
                </a>
              </div>
            </nav>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-md text-[#4b5563] hover:text-[#4f858b] hover:bg-black/[0.04] transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[64px] inset-x-0 z-40 md:hidden bg-white shadow-lg"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
          >
            <div className="max-w-6xl mx-auto px-5 py-3 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLink(link.href); }}
                  className="px-4 py-2.5 text-[14px] font-medium text-[#4b5563] hover:text-[#111827] hover:bg-gray-50 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-2 pt-2 flex flex-col gap-1.5" style={{ borderTop: "1px solid #f1f5f9" }}>
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2.5 text-[14px] font-medium text-[#4b5563] hover:text-[#4f858b] rounded-xl transition-colors"
                >
                  Resume <ExternalLink size={12} strokeWidth={2.5} />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleLink("#contact"); }}
                  className="mx-4 py-2.5 text-[14px] font-semibold text-white rounded-xl text-center transition-colors"
                  style={{ backgroundColor: "#4f858b" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#3a666b"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#4f858b"; }}
                >
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
