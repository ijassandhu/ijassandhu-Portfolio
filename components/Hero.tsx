"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Mail, ArrowRight, MapPin } from "lucide-react";
import { personalInfo, heroContent, credibilityItems } from "@/data/portfolio";

/* ─── Brand SVGs ─── */

const GitHubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ─── Motion variants ─── */

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const expertiseChips = [
  "LLM Systems",
  "RAG",
  "Document AI",
  "Automation",
  "Multimodal AI",
];

const socialLinks = [
  {
    href: personalInfo.github,
    label: "GitHub",
    icon: <GitHubIcon />,
    target: "_blank" as const,
    rel: "noopener noreferrer",
  },
  {
    href: personalInfo.linkedin,
    label: "LinkedIn",
    icon: <LinkedInIcon />,
    target: "_blank" as const,
    rel: "noopener noreferrer",
  },
  {
    href: `mailto:${personalInfo.email}`,
    label: "Email",
    icon: <Mail size={17} />,
    target: undefined,
    rel: undefined,
  },
];

/* ─── Hero ─── */

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#f7f8f8" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 52% at 74% 42%, rgba(169,190,193,0.16) 0%, transparent 68%)",
        }}
      />

      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col justify-center px-0 pt-24 pb-14 lg:pt-28 lg:pb-16">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)] lg:gap-16">
            {/* LEFT: text column */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
              style={{ gap: "0.82rem" }}
            >
              <motion.p
                variants={fadeUp}
                className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "#4f858b" }}
              >
                {heroContent.eyebrow}
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="font-extrabold tracking-tight"
                style={{
                  fontSize: "clamp(2.3rem, 5vw, 3.85rem)",
                  lineHeight: 1.04,
                  color: "#111827",
                  letterSpacing: "-0.022em",
                }}
              >
                Jaskeerat Singh
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="font-semibold leading-[1.44]"
                style={{
                  fontSize: "clamp(1rem, 2.1vw, 1.15rem)",
                  color: "#1e2a35",
                  maxWidth: "470px",
                }}
              >
                {heroContent.headline}
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="leading-relaxed"
                style={{
                  fontSize: "0.925rem",
                  color: "#4b5563",
                  maxWidth: "450px",
                }}
              >
                {heroContent.paragraph}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center justify-center gap-1.5 lg:justify-start"
                style={{ maxWidth: "470px" }}
              >
                {expertiseChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full px-3 py-[5px] text-[11px] font-semibold"
                    style={{
                      color: "#4f858b",
                      backgroundColor: "rgba(79,133,139,0.08)",
                      border: "1px solid rgba(79,133,139,0.18)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-start gap-1.5"
              >
                <MapPin
                  size={11}
                  className="mt-[3px] shrink-0"
                  style={{ color: "#4f858b" }}
                />
                <p style={{ fontSize: "11.5px", color: "#6b7280" }}>
                  {heroContent.supporting}
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center justify-center gap-2.5 pt-[2px] lg:justify-start"
              >
                <motion.a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#projects");
                  }}
                  whileHover={{ y: -2, scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-[10px] text-[13.5px] font-semibold text-white"
                  style={{
                    backgroundColor: "#111827",
                    boxShadow: "0 4px 14px rgba(17,24,39,0.18)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1f2937";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#111827";
                  }}
                >
                  View Projects
                  <ArrowRight size={14} />
                </motion.a>

                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#contact");
                  }}
                  whileHover={{ y: -2, scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-[10px] text-[13.5px] font-semibold text-white"
                  style={{
                    backgroundColor: "#4f858b",
                    boxShadow: "0 4px 14px rgba(79,133,139,0.24)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#3a666b";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#4f858b";
                  }}
                >
                  Get In Touch
                </motion.a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-1.5"
              >
                {socialLinks.map(({ href, label, icon, target, rel }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={target}
                    rel={rel}
                    aria-label={label}
                    whileHover={{ y: -2 }}
                    className="rounded-lg border border-[#e5e7eb] bg-white p-2.5"
                    style={{
                      color: "#6b7280",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#4f858b";
                      e.currentTarget.style.borderColor = "#a9bec1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#6b7280";
                      e.currentTarget.style.borderColor = "#e5e7eb";
                    }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </motion.div>

              {/* Credibility strip — desktop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 1.05,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="hidden flex-wrap items-center justify-start gap-x-4 gap-y-1.5 pt-1 lg:flex"
              >
                {credibilityItems.map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <div
                      className="h-[3.5px] w-[3.5px] shrink-0 rounded-full"
                      style={{ backgroundColor: "#a9bec1" }}
                    />
                    <span
                      className="font-medium"
                      style={{ fontSize: "11.5px", color: "#7d8f96" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT: photo card */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                delay: 0.28,
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex justify-center lg:justify-end lg:self-center lg:translate-y-4"
            >
              <div
                className="w-full max-w-[320px] bg-white sm:max-w-[340px] lg:w-[340px] lg:max-w-none"
                style={{
                  borderRadius: "24px",
                  border: "1px solid rgba(220,228,235,0.7)",
                  boxShadow:
                    "0 18px 44px rgba(0,0,0,0.09), 0 6px 18px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(0,0,0,0.025)",
                  overflow: "hidden",
                }}
              >
                <div className="relative h-[330px] sm:h-[360px] lg:h-[360px] xl:h-[380px]">
                  <Image
                    src="/images/Jaskeerat.jpeg"
                    alt="Jaskeerat Singh — AI Engineer"
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 340px, 340px"
                    className="object-cover"
                    style={{ objectPosition: "center center" }}
                    priority
                  />
                </div>

                <div className="px-5 pb-4 pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3
                        className="font-bold tracking-tight"
                        style={{ fontSize: "15px", color: "#111827" }}
                      >
                        Jaskeerat Singh
                      </h3>
                      <p
                        className="mt-[3px] font-semibold"
                        style={{ fontSize: "12px", color: "#4f858b" }}
                      >
                        AI Engineer
                      </p>
                    </div>

                    <div
                      className="mt-[2px] flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-[4px]"
                      style={{
                        backgroundColor: "rgba(74,222,128,0.09)",
                        border: "1px solid rgba(74,222,128,0.26)",
                      }}
                    >
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                      <span
                        className="font-semibold text-green-600"
                        style={{ fontSize: "10px" }}
                      >
                        Available
                      </span>
                    </div>
                  </div>

                  <div
                    className="mt-3 flex flex-col gap-1 pt-3"
                    style={{ borderTop: "1px solid #f1f5f9" }}
                  >
                    <div className="flex items-center gap-1.5">
                      <MapPin size={11} style={{ color: "#9ca3af" }} />
                      <span style={{ fontSize: "11.5px", color: "#6b7280" }}>
                        Chandigarh, India
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        paddingLeft: "18px",
                      }}
                    >
                      Open to roles &amp; freelance projects
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Credibility strip — mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.05,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pb-2 lg:hidden"
          >
            {credibilityItems.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <div
                  className="h-[3.5px] w-[3.5px] shrink-0 rounded-full"
                  style={{ backgroundColor: "#a9bec1" }}
                />
                <span
                  className="font-medium"
                  style={{ fontSize: "11.5px", color: "#7d8f96" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
