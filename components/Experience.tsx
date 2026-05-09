"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { experiences } from "@/data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 sm:py-28"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-12">
            <p
              className="text-[10.5px] font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#4f858b" }}
            >
              Work History
            </p>
            <h2
              className="font-extrabold tracking-tight"
              style={{
                fontSize: "clamp(1.9rem, 3.8vw, 2.6rem)",
                lineHeight: 1.1,
                color: "#111827",
                letterSpacing: "-0.022em",
              }}
            >
              Experience
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={slideLeft}
                className="bg-[#f7f8f8] rounded-2xl border border-[#e5e7eb] overflow-hidden"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                {/* Top accent bar */}
                <div
                  className="h-[3px] w-full"
                  style={{ backgroundColor: exp.current ? "#4f858b" : "#a9bec1" }}
                />

                <div className="p-6 sm:p-7">
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3
                          className="font-bold"
                          style={{ fontSize: "15.5px", color: "#111827" }}
                        >
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[10px] font-semibold"
                            style={{
                              backgroundColor: "rgba(74,222,128,0.09)",
                              border: "1px solid rgba(74,222,128,0.26)",
                              color: "#16a34a",
                            }}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>
                      <p
                        className="font-semibold"
                        style={{ fontSize: "14px", color: "#4f858b" }}
                      >
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>
                        {exp.period}
                      </span>
                      <span
                        className="flex items-center gap-1"
                        style={{ fontSize: "12px", color: "#9ca3af" }}
                      >
                        <MapPin size={10} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="flex flex-col gap-2.5">
                    {exp.bullets.map((bullet, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + j * 0.07, duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
