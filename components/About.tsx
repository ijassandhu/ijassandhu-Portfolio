"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import { aboutContent } from "@/data/portfolio";

const capabilities = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
    title: "Document Intelligence",
    desc: "LLM-powered extraction from industrial PDFs — turning raw files into structured, usable data.",
    chips: ["PDF Extraction", "JSON Output", "Prompt Engineering"],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M11 8v3l2 2" />
      </svg>
    ),
    title: "RAG & Retrieval",
    desc: "Semantic search and RAG pipelines that make domain knowledge queryable and accurate.",
    chips: ["LangChain", "FAISS", "Embeddings"],
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "AI Automation",
    desc: "End-to-end automated pipelines connecting LLMs with APIs, tools, and business systems.",
    chips: ["n8n", "Python", "API Integration"],
  },
];

const panelLabels = ["Journey", "Build", "Education"] as const;

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);

  // Track scroll progress within the About section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.12", "end 0.88"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.36) setActivePanel(0);
    else if (latest < 0.68) setActivePanel(1);
    else setActivePanel(2);
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 sm:py-28"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr] lg:gap-16 lg:items-start">

          {/* LEFT: sticky profile card — sticks while right side scrolls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24 mb-10 lg:mb-0"
          >
            <div
              className="rounded-2xl border border-[#e5e7eb] p-6 flex flex-col gap-4"
              style={{ backgroundColor: "#f7f8f8", boxShadow: "0 2px 14px rgba(0,0,0,0.05)" }}
            >
              {/* Name + role */}
              <div>
                <h3 className="font-bold" style={{ fontSize: "17px", color: "#111827", lineHeight: 1.2 }}>
                  Jaskeerat Singh
                </h3>
                <p style={{ fontSize: "13px", color: "#4f858b", fontWeight: 600, marginTop: "3px" }}>
                  AI Engineer
                </p>
              </div>

              {/* Availability */}
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{ backgroundColor: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.22)" }}
              >
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: 500 }}>
                  Open to roles &amp; freelance
                </span>
              </div>

              <div className="border-t border-[#e5e7eb]" />

              {/* Location */}
              <div className="flex items-center gap-2.5">
                <MapPin size={13} style={{ color: "#a9bec1", flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: "#6b7280" }}>Chandigarh, India</span>
              </div>

              {/* Current role */}
              <div className="flex items-start gap-2.5">
                <Briefcase size={13} style={{ color: "#a9bec1", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p style={{ fontSize: "13px", color: "#374151", fontWeight: 600 }}>AI Engineer Intern</p>
                  <p style={{ fontSize: "11.5px", color: "#9ca3af" }}>EOXS · March 2026 – Present</p>
                </div>
              </div>

              {/* Education */}
              <div className="flex items-start gap-2.5">
                <GraduationCap size={13} style={{ color: "#a9bec1", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p style={{ fontSize: "13px", color: "#374151", fontWeight: 600 }}>
                    {aboutContent.education.degree}
                  </p>
                  <p style={{ fontSize: "11.5px", color: "#9ca3af", lineHeight: "1.5" }}>
                    {aboutContent.education.institution}
                  </p>
                  <p style={{ fontSize: "11.5px", color: "#9ca3af" }}>
                    {aboutContent.education.period}
                  </p>
                </div>
              </div>

              {/* Scroll progress indicator — desktop only */}
              <div className="hidden lg:flex flex-col gap-2 pt-1 border-t border-[#e5e7eb]">
                <p style={{ fontSize: "10px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500 }}>
                  Reading
                </p>
                <div className="flex gap-1.5">
                  {panelLabels.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        height: "3px",
                        flex: activePanel === i ? "2 1 0" : "1 1 0",
                        borderRadius: "9999px",
                        backgroundColor: activePanel >= i ? "#4f858b" : "#e5e7eb",
                        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: "11px", color: "#6b7280", fontWeight: 500 }}>
                  {panelLabels[activePanel]}
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: 3 content panels that reveal as user scrolls */}
          <div>
            {/* ── Panel 1: AI Journey ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="pb-14 lg:pb-0"
              style={{ minHeight: "0", paddingTop: "0" }}
            >
              {/* Section header */}
              <div className="mb-8">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: "#4f858b" }}>
                  About Me
                </p>
                <h2
                  className="font-extrabold tracking-tight"
                  style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.6rem)", lineHeight: 1.1, color: "#111827", letterSpacing: "-0.022em" }}
                >
                  Who I Am
                </h2>
              </div>

              <div className="flex flex-col gap-4 lg:min-h-[50vh]">
                {aboutContent.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ fontSize: "14.5px", color: "#4b5563", lineHeight: "1.72" }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* ── Panel 2: What I Build ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="pt-10 pb-14 lg:py-16 lg:min-h-[55vh]"
            >
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: "#4f858b" }}>
                What I Build
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 0.56, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="relative rounded-xl border border-[#e5e7eb] p-5 flex flex-col gap-3 overflow-hidden"
                    style={{ backgroundColor: "#f7f8f8", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full"
                      style={{ background: "radial-gradient(circle, rgba(79,133,139,0.1) 0%, transparent 70%)" }}
                    />
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                      style={{ backgroundColor: "rgba(79,133,139,0.1)", color: "#4f858b" }}
                    >
                      {cap.icon}
                    </div>
                    <h3 className="font-bold" style={{ fontSize: "13.5px", color: "#111827", lineHeight: 1.3 }}>
                      {cap.title}
                    </h3>
                    <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.55" }}>{cap.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {cap.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full px-2 py-[3px] text-[10.5px] font-medium"
                          style={{ color: "#4f858b", backgroundColor: "rgba(79,133,139,0.08)", border: "1px solid rgba(79,133,139,0.15)" }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Panel 3: Education & Growth ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2 pb-4 lg:py-16 lg:min-h-[40vh]"
            >
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: "#4f858b" }}>
                Highlights &amp; Education
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {aboutContent.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 0.52, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-xl border border-[#e5e7eb] p-4"
                    style={{ backgroundColor: "#f7f8f8" }}
                  >
                    <div className="w-[3px] h-5 rounded-full mb-3" style={{ backgroundColor: "#4f858b" }} />
                    <p className="font-semibold mb-1" style={{ fontSize: "13px", color: "#111827" }}>{h.title}</p>
                    <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.55" }}>{h.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Education card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4 rounded-xl border border-[#e5e7eb] p-5"
                style={{ backgroundColor: "#f7f8f8" }}
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                  style={{ backgroundColor: "rgba(79,133,139,0.1)", color: "#4f858b" }}
                >
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="font-bold" style={{ fontSize: "14px", color: "#111827" }}>
                    {aboutContent.education.degree}
                  </p>
                  <p style={{ fontSize: "12.5px", color: "#4f858b", fontWeight: 500, marginTop: "2px" }}>
                    {aboutContent.education.institution}
                  </p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>
                    {aboutContent.education.period}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
