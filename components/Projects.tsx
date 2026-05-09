"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Projects() {
  return (
    <section
      id="projects"
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
              Selected Work
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
              Featured Projects
            </h2>
          </motion.div>

          {/* Project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="flex flex-col bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden"
                style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}
              >
                {/* Top accent */}
                <div className="h-[3px] w-full" style={{ backgroundColor: "#4f858b" }} />

                <div className="flex flex-col flex-1 p-6">
                  {/* Type badge */}
                  <p
                    className="text-[10.5px] font-semibold uppercase tracking-[0.12em] mb-3"
                    style={{ color: "#4f858b" }}
                  >
                    {project.type}
                  </p>

                  {/* Title */}
                  <h3
                    className="font-bold mb-2"
                    style={{ fontSize: "15.5px", color: "#111827", lineHeight: 1.3 }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="leading-relaxed mb-4"
                    style={{ fontSize: "13px", color: "#6b7280" }}
                  >
                    {project.description}
                  </p>

                  {/* Bullets */}
                  <ul className="flex flex-col gap-1.5 mb-5">
                    {project.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <div
                          className="mt-[6px] h-[3.5px] w-[3.5px] shrink-0 rounded-full"
                          style={{ backgroundColor: "#a9bec1" }}
                        />
                        <p style={{ fontSize: "12.5px", color: "#4b5563", lineHeight: 1.52 }}>
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full px-2.5 py-[4px] text-[11px] font-medium"
                        style={{
                          color: "#4f858b",
                          backgroundColor: "rgba(79,133,139,0.08)",
                          border: "1px solid rgba(79,133,139,0.15)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200"
                      style={{ color: "#4f858b" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "#3a666b";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "#4f858b";
                      }}
                    >
                      View on GitHub
                      <ExternalLink size={13} strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
