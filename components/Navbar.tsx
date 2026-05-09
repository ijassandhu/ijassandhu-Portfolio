"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/portfolio";

function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Empty string = no active highlight (user is in hero zone)
  const [activeSection, setActiveSection] = useState("");

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Clear active highlight while user is in the hero zone
      if (window.scrollY < 80) {
        setActiveSection("");
        return;
      }

      const ids = navLinks.map((l) => l.href.slice(1));
      let found = "";
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 100 >= el.offsetTop) {
          found = id;
          break;
        }
      }
      setActiveSection(found);
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
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX: progressScaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: "#4f858b",
          transformOrigin: "0%",
          zIndex: 60,
          pointerEvents: "none",
        }}
      />

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
          <div className="flex items-center h-[64px]">

            {/* Left: JS logo */}
            <div className="flex-1">
              <motion.a
                href="#home"
                onClick={(e) => { e.preventDefault(); handleLink("#home"); }}
                whileHover={{ opacity: 0.72 }}
                aria-label="Jaskeerat Singh — home"
                className="shrink-0 select-none transition-opacity inline-flex items-center justify-center w-8 h-8 rounded-lg text-[13px] font-bold tracking-tight text-white"
                style={{ backgroundColor: "#4f858b" }}
              >
                JS
              </motion.a>
            </div>

            {/* Center: nav links — desktop */}
            <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
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
            </nav>

            {/* Right: Contact Me / hamburger */}
            <div className="flex-1 flex justify-end">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleLink("#contact"); }}
                className="hidden md:inline-flex items-center px-4 py-[7px] text-[13px] font-semibold text-white rounded-full transition-colors duration-200"
                style={{ backgroundColor: "#4f858b" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#3a666b"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#4f858b"; }}
              >
                Contact Me
              </a>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 rounded-md text-[#4b5563] hover:text-[#4f858b] hover:bg-black/[0.04] transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

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
              <div className="mt-2 pt-2" style={{ borderTop: "1px solid #f1f5f9" }}>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleLink("#contact"); }}
                  className="block py-2.5 text-[14px] font-semibold text-white rounded-xl text-center"
                  style={{ backgroundColor: "#4f858b" }}
                >
                  Contact Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
