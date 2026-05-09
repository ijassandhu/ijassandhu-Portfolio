"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skillCategories } from "@/data/portfolio";

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Slow-drifting dot pattern — creates subtle parallax depth behind the grid
  const { scrollY } = useScroll();
  const patternY = useTransform(scrollY, [0, 4000], [0, -60]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ backgroundColor: "#f7f8f8" }}
    >
      {/* Parallax dot grid background */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ y: patternY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(79,133,139,0.065) 1.5px, transparent 1.5px)",
            backgroundSize: "22px 22px",
          }}
        />
      </motion.div>

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "#4f858b" }}>
            Technical Stack
          </p>
          <h2
            className="font-extrabold tracking-tight"
            style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.6rem)", lineHeight: 1.1, color: "#111827", letterSpacing: "-0.022em" }}
          >
            Tech Stack
          </h2>
        </motion.div>

        {/* Category grid — each card has individual whileInView + stagger delay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.56, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", transition: { duration: 0.22 } }}
              className="rounded-xl border border-[#e5e7eb] bg-white p-5"
              style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
            >
              {/* Category label */}
              <p className="font-semibold mb-3 uppercase tracking-[0.08em]" style={{ fontSize: "10.5px", color: "#4f858b" }}>
                {cat.label}
              </p>

              {/* Skill chips with hover scale + teal tint */}
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{
                      y: -2,
                      backgroundColor: "rgba(79,133,139,0.1)",
                      color: "#4f858b",
                      borderColor: "rgba(79,133,139,0.25)",
                      transition: { duration: 0.15 },
                    }}
                    className="rounded-full px-2.5 py-[4px] text-[11.5px] font-medium cursor-default select-none"
                    style={{ color: "#374151", backgroundColor: "#f7f8f8", border: "1px solid #e5e7eb" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
