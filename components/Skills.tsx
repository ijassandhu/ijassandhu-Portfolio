"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 sm:py-28"
      style={{ backgroundColor: "#f7f8f8" }}
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
              Technical Stack
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
              Tech Stack
            </h2>
          </motion.div>

          {/* Category grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-xl border border-[#e5e7eb] bg-white p-5"
                style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
              >
                <p
                  className="font-semibold mb-3 uppercase tracking-[0.08em]"
                  style={{ fontSize: "10.5px", color: "#4f858b" }}
                >
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full px-2.5 py-[4px] text-[11.5px] font-medium"
                      style={{
                        color: "#374151",
                        backgroundColor: "#f7f8f8",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
