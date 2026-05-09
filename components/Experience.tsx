"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { MapPin } from "lucide-react";
import { experiences } from "@/data/portfolio";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Track scroll progress within the timeline container
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 35%"],
  });

  // Timeline line grows from top → bottom as section scrolls into view
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Update active dot based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = 1 / experiences.length;
    setActiveIndex(Math.min(Math.floor(latest / step), experiences.length - 1));
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-20 sm:py-28"
      style={{ backgroundColor: "#f7f8f8" }}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: "#4f858b" }}>
            Work History
          </p>
          <h2
            className="font-extrabold tracking-tight"
            style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.6rem)", lineHeight: 1.1, color: "#111827", letterSpacing: "-0.022em" }}
          >
            Experience
          </h2>
        </motion.div>

        {/* Animated vertical timeline */}
        <div ref={timelineRef} className="relative flex flex-col">

          {/* Background static line (gray) — desktop only */}
          <div
            aria-hidden="true"
            className="absolute hidden sm:block"
            style={{ left: "14px", top: "6px", bottom: "6px", width: "2px", backgroundColor: "#e5e7eb" }}
          />

          {/* Growing teal line — animates via scaleY on scroll */}
          <motion.div
            aria-hidden="true"
            className="absolute hidden sm:block"
            style={{
              left: "14px",
              top: "6px",
              bottom: "6px",
              width: "2px",
              backgroundColor: "#4f858b",
              scaleY: lineScaleY,
              originY: 0,
            }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.64, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-6 sm:gap-8 pb-8 last:pb-0"
            >
              {/* Timeline dot — desktop only, highlights when active */}
              <div className="hidden sm:flex relative z-10 shrink-0 mt-1">
                <motion.div
                  animate={{
                    borderColor: activeIndex >= i ? "#4f858b" : "#a9bec1",
                    boxShadow: activeIndex === i
                      ? "0 0 0 5px rgba(79,133,139,0.12)"
                      : "0 0 0 0px rgba(79,133,139,0)",
                  }}
                  transition={{ duration: 0.35 }}
                  className="w-[30px] h-[30px] rounded-full border-2 flex items-center justify-center"
                  style={{ backgroundColor: "#f7f8f8" }}
                >
                  {exp.current ? (
                    <motion.div
                      animate={{ backgroundColor: activeIndex >= i ? "#4f858b" : "#a9bec1" }}
                      transition={{ duration: 0.35 }}
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                    />
                  ) : (
                    <motion.div
                      animate={{ backgroundColor: activeIndex >= i ? "#4f858b" : "#d1d5db" }}
                      transition={{ duration: 0.35 }}
                      className="w-2 h-2 rounded-full"
                    />
                  )}
                </motion.div>
              </div>

              {/* Experience card */}
              <div
                className="flex-1 rounded-2xl border border-[#e5e7eb] overflow-hidden"
                style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                {/* Top accent bar — teal for current, muted for past */}
                <div
                  className="h-[3px] w-full"
                  style={{ backgroundColor: exp.current ? "#4f858b" : "#a9bec1" }}
                />

                <div className="p-6 sm:p-7">
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold" style={{ fontSize: "15.5px", color: "#111827" }}>
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[10px] font-semibold"
                            style={{ backgroundColor: "rgba(74,222,128,0.09)", border: "1px solid rgba(74,222,128,0.26)", color: "#16a34a" }}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>
                      <p className="font-semibold" style={{ fontSize: "14px", color: "#4f858b" }}>
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>{exp.period}</span>
                      <span className="flex items-center gap-1" style={{ fontSize: "12px", color: "#9ca3af" }}>
                        <MapPin size={10} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullets — stagger in after card */}
                  <ul className="flex flex-col gap-2.5">
                    {exp.bullets.map((bullet, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.12 + j * 0.06, duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-start gap-2.5"
                      >
                        <div
                          className="mt-[8px] h-[4px] w-[4px] shrink-0 rounded-full"
                          style={{ backgroundColor: "#a9bec1" }}
                        />
                        <p style={{ fontSize: "13.5px", color: "#4b5563", lineHeight: "1.56" }}>
                          {bullet}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
