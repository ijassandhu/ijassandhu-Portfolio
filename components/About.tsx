"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const capabilities = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
    title: "Document Intelligence",
    description:
      "LLM-powered extraction from industrial PDFs and unstructured documents — turning raw files into structured, usable data.",
    chips: ["PDF Extraction", "JSON Output", "Prompt Engineering"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M11 8v3l2 2" />
      </svg>
    ),
    title: "RAG & Retrieval Systems",
    description:
      "Semantic search and retrieval-augmented generation pipelines that make domain knowledge queryable and contextually accurate.",
    chips: ["LangChain", "FAISS", "Embeddings"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "AI Workflow Automation",
    description:
      "End-to-end automated pipelines that connect LLMs with APIs, tools, and business systems — reducing manual work at scale.",
    chips: ["n8n", "Python", "API Integration"],
  },
];

export default function About() {
  return (
    <section
      id="about"
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
          {/* Section header — centered */}
          <motion.div variants={fadeUp} className="mb-14 text-center">
            <p
              className="text-[10.5px] font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#4f858b" }}
            >
              Focus Areas
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
              What I Build
            </h2>
          </motion.div>

          {/* Capability cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.22 } }}
                className="relative rounded-2xl border border-[#e5e7eb] p-7 flex flex-col gap-4 overflow-hidden"
                style={{
                  backgroundColor: "#f7f8f8",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                {/* Subtle corner glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(79,133,139,0.12) 0%, transparent 70%)",
                  }}
                />

                {/* Icon */}
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                  style={{
                    backgroundColor: "rgba(79,133,139,0.1)",
                    color: "#4f858b",
                  }}
                >
                  {cap.icon}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="font-bold"
                    style={{ fontSize: "15.5px", color: "#111827", lineHeight: 1.3 }}
                  >
                    {cap.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ fontSize: "13px", color: "#6b7280" }}
                  >
                    {cap.description}
                  </p>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {cap.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full px-2.5 py-[4px] text-[11px] font-medium"
                      style={{
                        color: "#4f858b",
                        backgroundColor: "rgba(79,133,139,0.08)",
                        border: "1px solid rgba(79,133,139,0.15)",
                      }}
                    >
                      {chip}
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
