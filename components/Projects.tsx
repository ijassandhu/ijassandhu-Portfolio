"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/portfolio";

const CARD_TOP = 92; // px below navbar

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Cards 0 and 1 scale down as the next card slides over them
  const scale0 = useTransform(scrollYProgress, [0.08, 0.38], [1, 0.95]);
  const scale1 = useTransform(scrollYProgress, [0.41, 0.71], [1, 0.95]);
  // Last card never scales down — use a constant 1→1 transform to satisfy types
  const scale2 = useTransform(scrollYProgress, [0.74, 1.0], [1, 1]);
  const cardScales = [scale0, scale1, scale2] as const;

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Section header — NOT sticky, scrolls away normally */}
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 pt-20 sm:pt-28 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
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
      </div>

      {/* ── Desktop: sticky stacked cards ── */}
      <div className="hidden lg:block mx-auto w-full max-w-6xl px-5 sm:px-8">
        {projects.map((project, i) => (
          <div
            key={i}
            style={{
              position: "sticky",
              top: `${CARD_TOP}px`,
              zIndex: i + 1,
              marginBottom: i < projects.length - 1 ? "2rem" : 0,
            }}
          >
            <motion.article
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.62, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              style={{
                scale: cardScales[i],
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              }}
              className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden"
            >
              {/* Teal accent bar */}
              <div className="h-[3px] w-full" style={{ backgroundColor: "#4f858b" }} />

              {/* Horizontal layout: content left, tech panel right */}
              <div className="grid grid-cols-[1fr_280px] gap-0">
                {/* Left: main content */}
                <div className="p-8 flex flex-col">
                  <span
                    className="inline-block self-start rounded-full px-2.5 py-[4px] text-[10px] font-semibold uppercase tracking-[0.1em] mb-4"
                    style={{
                      color: "#4f858b",
                      backgroundColor: "rgba(79,133,139,0.08)",
                      border: "1px solid rgba(79,133,139,0.15)",
                    }}
                  >
                    {project.type}
                  </span>
                  <h3
                    className="font-bold mb-2"
                    style={{ fontSize: "17px", color: "#111827", lineHeight: 1.25 }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="leading-relaxed mb-5"
                    style={{ fontSize: "13.5px", color: "#6b7280", lineHeight: "1.65", maxWidth: "520px" }}
                  >
                    {project.description}
                  </p>
                  <ul className="flex flex-col gap-2 mb-5">
                    {project.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <div
                          className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full"
                          style={{ backgroundColor: "#a9bec1" }}
                        />
                        <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.56 }}>{bullet}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200"
                      style={{ color: "#4f858b" }}
                      whileHover={{ x: 2, transition: { duration: 0.15 } }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "#3a666b";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "#4f858b";
                      }}
                    >
                      View on GitHub <ExternalLink size={13} strokeWidth={2} />
                    </motion.a>
                  </div>
                </div>

                {/* Right: tech stack panel */}
                <div
                  className="flex flex-col justify-center p-7 border-l border-[#e5e7eb]"
                  style={{ backgroundColor: "#f7f8f8" }}
                >
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.1em] mb-4"
                    style={{ color: "#9ca3af" }}
                  >
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full px-3 py-[5px] text-[11.5px] font-medium"
                        style={{ color: "#374151", backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        ))}

        {/* Spacer — gives last sticky card breathing room before Contact section */}
        <div aria-hidden="true" style={{ height: "28vh" }} />
      </div>

      {/* ── Mobile: normal stacked cards ── */}
      <div className="lg:hidden mx-auto w-full max-w-6xl px-5 sm:px-8 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.62, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.09)",
                transition: { duration: 0.26 },
              }}
              className="flex flex-col bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden"
              style={{ boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}
            >
              <div className="h-[3px] w-full" style={{ backgroundColor: "#4f858b" }} />
              <div className="flex flex-col flex-1 p-6">
                <div className="mb-4">
                  <span
                    className="inline-block rounded-full px-2.5 py-[4px] text-[10px] font-semibold uppercase tracking-[0.1em]"
                    style={{
                      color: "#4f858b",
                      backgroundColor: "rgba(79,133,139,0.08)",
                      border: "1px solid rgba(79,133,139,0.15)",
                    }}
                  >
                    {project.type}
                  </span>
                </div>
                <h3
                  className="font-bold mb-2"
                  style={{ fontSize: "16px", color: "#111827", lineHeight: 1.3 }}
                >
                  {project.title}
                </h3>
                <p
                  className="leading-relaxed mb-4"
                  style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.65" }}
                >
                  {project.description}
                </p>
                <ul className="flex flex-col gap-1.5 mb-5">
                  {project.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div
                        className="mt-[6px] h-[3.5px] w-[3.5px] shrink-0 rounded-full"
                        style={{ backgroundColor: "#a9bec1" }}
                      />
                      <p style={{ fontSize: "12.5px", color: "#4b5563", lineHeight: 1.55 }}>{bullet}</p>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full px-2.5 py-[4px] text-[10.5px] font-medium"
                      style={{ color: "#374151", backgroundColor: "#f7f8f8", border: "1px solid #e5e7eb" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-auto">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200"
                    style={{ color: "#4f858b" }}
                    whileHover={{ x: 2, transition: { duration: 0.15 } }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#3a666b";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#4f858b";
                    }}
                  >
                    View on GitHub <ExternalLink size={13} strokeWidth={2} />
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
