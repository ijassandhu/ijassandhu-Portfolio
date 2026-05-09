"use client";

import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Mail, ArrowRight, ExternalLink, MapPin, ChevronDown } from "lucide-react";
import { personalInfo, heroContent } from "@/data/portfolio";

const GitHubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const expertiseChips = ["LLM Systems", "RAG", "Document AI"];
const cardChips = ["LLM Systems", "RAG", "Automation"];

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
    icon: <Mail size={16} />,
    target: undefined,
    rel: undefined,
  },
];

export default function Hero() {
  const { scrollY } = useScroll();

  // Existing glow parallax
  const glowY = useTransform(scrollY, [0, 700], [0, -90]);
  // Scroll indicator fades away
  const indicatorOpacity = useTransform(scrollY, [0, 180], [1, 0]);

  // Text column drifts up as user scrolls — creates depth separation from the card
  const textY = useTransform(scrollY, [0, 500], [0, -55]);

  // Image card scales and fades subtly on scroll — pulls user eye downward
  const imageScale = useTransform(scrollY, [0, 450], [1, 0.92]);
  const imageOpacity = useTransform(scrollY, [0, 380], [1, 0.6]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#f7f8f8" }}
    >
      {/* Dot grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(79,133,139,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Parallax glow blobs */}
      <motion.div
        aria-hidden="true"
        style={{ y: glowY }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute"
          style={{
            top: "10%",
            right: "-5%",
            width: "55%",
            height: "80%",
            background:
              "radial-gradient(ellipse at center, rgba(79,133,139,0.18) 0%, rgba(169,190,193,0.12) 45%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "20%",
            left: "-10%",
            width: "40%",
            height: "60%",
            background:
              "radial-gradient(ellipse at center, rgba(169,190,193,0.08) 0%, transparent 70%)",
            filter: "blur(32px)",
          }}
        />
      </motion.div>

      <div
        className="relative z-10 flex min-h-screen flex-col justify-center"
        style={{ paddingTop: "88px", paddingBottom: "64px" }}
      >
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-12">

            {/* LEFT: text — scroll-linked upward drift */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              style={{ y: textY, gap: "0.75rem" }}
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
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
                  fontSize: "clamp(2.6rem, 5.5vw, 4.1rem)",
                  lineHeight: 1.02,
                  color: "#111827",
                  letterSpacing: "-0.024em",
                }}
              >
                Jaskeerat Singh
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="font-semibold leading-[1.45]"
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.12rem)",
                  color: "#1e2a35",
                  maxWidth: "460px",
                }}
              >
                {heroContent.headline}
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="leading-relaxed"
                style={{ fontSize: "0.9rem", color: "#4b5563", maxWidth: "410px" }}
              >
                {heroContent.paragraph}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center gap-2 lg:items-start"
              >
                <div className="flex flex-wrap items-center justify-center gap-1.5 lg:justify-start">
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
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={11} className="shrink-0" style={{ color: "#4f858b" }} />
                  <p style={{ fontSize: "11.5px", color: "#6b7280" }}>
                    Chandigarh, India · Open to AI roles &amp; freelance projects
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center gap-2.5 pt-1 lg:items-start"
              >
                <div className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                  <motion.a
                    href="#projects"
                    onClick={(e) => { e.preventDefault(); scrollTo("#projects"); }}
                    whileHover={{ y: -2, scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-[10px] text-[13.5px] font-semibold text-white"
                    style={{ backgroundColor: "#111827", boxShadow: "0 4px 14px rgba(17,24,39,0.18)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1f2937"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#111827"; }}
                  >
                    View Projects <ArrowRight size={14} />
                  </motion.a>

                  <motion.a
                    href={personalInfo.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-[10px] text-[13.5px] font-semibold"
                    style={{
                      color: "#374151",
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#a9bec1";
                      e.currentTarget.style.color = "#4f858b";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.color = "#374151";
                    }}
                  >
                    Resume <ExternalLink size={13} strokeWidth={2} />
                  </motion.a>
                </div>

                <div className="flex items-center gap-1.5">
                  {socialLinks.map(({ href, label, icon, target, rel }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target={target}
                      rel={rel}
                      aria-label={label}
                      whileHover={{ y: -2 }}
                      className="rounded-lg border border-[#e5e7eb] bg-white p-2"
                      style={{ color: "#9ca3af", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#4f858b";
                        e.currentTarget.style.borderColor = "#a9bec1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#9ca3af";
                        e.currentTarget.style.borderColor = "#e5e7eb";
                      }}
                    >
                      {icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT: image — outer div carries scroll scale/opacity; inner carries entrance animation */}
            <motion.div
              style={{ scale: imageScale, opacity: imageOpacity }}
              className="relative flex justify-center lg:justify-end lg:self-center"
            >
              <motion.div
                initial={{ opacity: 0, x: 24, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.24, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Glow disc behind card */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(79,133,139,0.2) 0%, transparent 68%)",
                    filter: "blur(20px)",
                  }}
                />

                <div
                  className="relative w-full max-w-[320px] sm:max-w-[350px] lg:w-[370px] lg:max-w-none overflow-hidden"
                  style={{
                    borderRadius: "22px",
                    border: "1px solid rgba(220,228,235,0.65)",
                    boxShadow:
                      "0 24px 60px rgba(0,0,0,0.11), 0 8px 24px rgba(0,0,0,0.07), 0 0 0 0.5px rgba(0,0,0,0.03)",
                  }}
                >
                  <div className="relative" style={{ height: "460px" }}>
                    <Image
                      src="/images/Jaskeerat.jpeg"
                      alt="Jaskeerat Singh, AI Engineer based in Chandigarh"
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 350px, 370px"
                      className="object-cover"
                      style={{ objectPosition: "center top" }}
                      priority
                    />

                    {/* Available badge */}
                    <div
                      className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-2.5 py-[5px]"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.88)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(74,222,128,0.3)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10.5px] font-semibold" style={{ color: "#15803d" }}>
                        Available
                      </span>
                    </div>

                    {/* Bottom gradient + chips */}
                    <div
                      className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-16"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(12,18,28,0.86) 0%, rgba(12,18,28,0.4) 55%, transparent 100%)",
                      }}
                    >
                      <div className="flex flex-wrap gap-1.5">
                        {cardChips.map((chip) => (
                          <span
                            key={chip}
                            className="rounded-full px-2.5 py-[4px] text-[10.5px] font-semibold"
                            style={{
                              color: "rgba(255,255,255,0.92)",
                              backgroundColor: "rgba(79,133,139,0.55)",
                              border: "1px solid rgba(169,190,193,0.35)",
                            }}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="hidden sm:flex absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-1 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={18} style={{ color: "#a9bec1" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
