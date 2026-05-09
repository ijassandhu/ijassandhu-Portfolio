"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Phone,
  Send,
  Workflow,
} from "lucide-react";
import {
  aboutContent,
  credibilityItems,
  experiences,
  heroContent,
  personalInfo,
  projects,
  skillCategories,
} from "@/data/portfolio";

type Project = (typeof projects)[number];

function BrandGithubIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function BrandLinkedinIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const archiveItems = [
  {
    title: "Extraction Reliability",
    label: "Document AI",
    description:
      "Prompt validation, retries, and output checks for manufacturer-specific MTR layouts.",
    tags: ["MTR PDFs", "JSON", "Validation"],
    link: personalInfo.github,
  },
  {
    title: "Retrieval Systems",
    label: "RAG Lab",
    description:
      "Embeddings, semantic search, and answer generation over focused knowledge bases.",
    tags: ["LangChain", "FAISS", "Streamlit"],
    link: personalInfo.github,
  },
  {
    title: "Multimodal Flows",
    label: "Vision AI",
    description:
      "Voice, image understanding, LLM reasoning, and audio responses inside one assistant loop.",
    tags: ["Vision", "STT", "TTS"],
    link: personalInfo.github,
  },
  {
    title: "Automation Stack",
    label: "Workflow AI",
    description:
      "LLMs connected with APIs, tools, and business workflows to reduce manual operations.",
    tags: ["n8n", "APIs", "Python"],
    link: personalInfo.github,
  },
] as const;

const storyCards = [
  {
    eyebrow: "01",
    title: "AI Journey",
    body: aboutContent.paragraphs[0],
    icon: <BrainCircuit size={18} />,
  },
  {
    eyebrow: "02",
    title: "What I Build",
    body: aboutContent.paragraphs[1],
    icon: <Workflow size={18} />,
  },
  {
    eyebrow: "03",
    title: "Education",
    body: `${aboutContent.education.degree} at ${aboutContent.education.institution}. ${aboutContent.education.period}.`,
    icon: <GraduationCap size={18} />,
  },
  {
    eyebrow: "04",
    title: "Why I'm Different",
    body: aboutContent.paragraphs[2],
    icon: <Layers3 size={18} />,
  },
] as const;

const focusCards = [
  {
    icon: <FileText size={18} />,
    title: "Document Intelligence",
    description: "LLM extraction from industrial PDFs into structured, validated outputs.",
  },
  {
    icon: <BrainCircuit size={18} />,
    title: "RAG Systems",
    description: "Semantic retrieval pipelines for focused, domain-aware question answering.",
  },
  {
    icon: <Workflow size={18} />,
    title: "AI Automation",
    description: "LLM workflows connected to APIs, tools, and practical business operations.",
  },
] as const;

const contactCards = [
  {
    icon: <Mail size={16} />,
    label: "Email",
    value: personalInfo.email,
    href: undefined,
  },
  {
    icon: <Phone size={16} />,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
  },
  {
    icon: <MapPin size={16} />,
    label: "Location",
    value: personalInfo.location,
    href: undefined,
  },
] as const;

function GridBackground({ dark = false }: { dark?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: dark
          ? "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)"
          : "linear-gradient(rgba(17,24,39,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,39,0.06) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />
  );
}

function OutlineWord({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute select-none whitespace-nowrap font-black uppercase leading-none ${className}`}
      style={{
        color: "transparent",
        WebkitTextStroke: dark
          ? "1px rgba(255,255,255,0.14)"
          : "1px rgba(17,24,39,0.14)",
        fontSize: "clamp(5.8rem, 18vw, 18rem)",
        letterSpacing: "0",
      }}
    >
      {children}
    </div>
  );
}

function TagList({ tags, dark = false }: { tags: readonly string[]; dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full px-3 py-1 text-[11px] font-semibold"
          style={{
            color: dark ? "rgba(255,255,255,0.8)" : "#4f858b",
            backgroundColor: dark ? "rgba(255,255,255,0.07)" : "rgba(79,133,139,0.08)",
            border: dark
              ? "1px solid rgba(255,255,255,0.11)"
              : "1px solid rgba(79,133,139,0.16)",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function SelectedProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="selected-card mobile-reveal relative mb-5 w-full transform-gpu overflow-hidden rounded-lg border border-[#e5e7eb] bg-white p-5 shadow-[0_16px_46px_rgba(17,24,39,0.10)] transition-[border-color,box-shadow] duration-200 hover:border-[#a9bec1] hover:shadow-[0_18px_52px_rgba(17,24,39,0.12)] lg:absolute lg:left-1/2 lg:top-1/2 lg:mb-0 lg:w-[520px] lg:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#4f858b]">
          0{index + 1}
        </span>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <span className="rounded-full border border-[#e5e7eb] bg-[#f7f8f8] px-3 py-1 text-[11px] font-semibold text-[#4b5563]">
            {project.type}
          </span>
          <a
            aria-label={`View code for ${project.title}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#d8e4e6] bg-white px-3 py-1 text-[11px] font-bold text-[#4f858b] transition-colors hover:border-[#a9bec1] hover:text-[#3a666b]"
            href={project.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            Code <ExternalLink size={13} />
          </a>
        </div>
      </div>
      <h3 className="mb-3 text-[1.45rem] font-black leading-tight tracking-tight text-[#111827] lg:text-[1.9rem]">
        {project.title}
      </h3>
      <p className="mb-5 max-w-[35rem] text-sm leading-7 text-[#4b5563]">{project.description}</p>
      <ul className="mb-6 grid gap-2">
        {project.bullets.slice(0, 2).map((bullet) => (
          <li key={bullet} className="flex gap-3 text-[13px] leading-6 text-[#4b5563]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a9bec1]" />
            {bullet}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <TagList tags={project.stack.slice(0, 4)} />
      </div>
    </article>
  );
}

function ArchiveCard({
  item,
  index,
}: {
  item: (typeof archiveItems)[number];
  index: number;
}) {
  return (
    <article className="archive-card mobile-reveal relative mb-4 w-full transform-gpu rounded-lg border border-white/10 bg-[#151a1d] p-5 text-white shadow-[0_16px_48px_rgba(0,0,0,0.22)] transition-[border-color,box-shadow] duration-200 hover:border-[#a9bec1]/40 hover:shadow-[0_18px_54px_rgba(0,0,0,0.26)] lg:absolute lg:left-1/2 lg:top-1/2 lg:mb-0 lg:w-[390px] lg:p-6">
      <div className="mb-7 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a9bec1]">
          {item.label}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/35">A{index + 1}</span>
          <a
            aria-label={`Open archive for ${item.title}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold text-[#a9bec1] transition-colors hover:border-[#a9bec1]/40 hover:text-white"
            href={item.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            Open <ExternalLink size={13} />
          </a>
        </div>
      </div>
      <h3 className="mb-3 text-xl font-black tracking-tight text-white">{item.title}</h3>
      <p className="mb-6 text-sm leading-7 text-white/64">{item.description}</p>
      <div className="flex flex-col gap-5">
        <TagList tags={item.tags} dark />
      </div>
    </article>
  );
}

function StoryCard({ card }: { card: (typeof storyCards)[number] }) {
  return (
    <article className="story-card mobile-reveal rounded-lg border border-[#e5e7eb] bg-white p-6 shadow-[0_18px_55px_rgba(17,24,39,0.07)] lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-black tracking-[0.22em] text-[#a9bec1]">{card.eyebrow}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f8f8] text-[#4f858b]">
          {card.icon}
        </span>
      </div>
      <h3 className="mb-3 text-2xl font-black tracking-tight text-[#111827]">{card.title}</h3>
      <p className="text-[15px] leading-8 text-[#4b5563]">{card.body}</p>
    </article>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  return (
    <article className={`experience-item experience-item-${index} mobile-reveal relative flex gap-5`}>
      <div className="relative hidden w-9 shrink-0 justify-center sm:flex">
        <span className="timeline-dot mt-2 h-5 w-5 rounded-full border-2 border-[#a9bec1] bg-white" />
      </div>
      <div className="timeline-card flex-1 rounded-lg border border-[#e5e7eb] bg-white p-5 shadow-[0_14px_45px_rgba(17,24,39,0.06)]">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h3 className="text-base font-black text-[#111827]">{exp.role}</h3>
              {exp.current ? (
                <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-green-700">
                  Current
                </span>
              ) : null}
            </div>
            <p className="text-sm font-bold text-[#4f858b]">{exp.company}</p>
          </div>
          <div className="text-left text-xs leading-6 text-[#6b7280] sm:text-right">
            <p>{exp.period}</p>
            <p className="inline-flex items-center gap-1 sm:justify-end">
              <MapPin size={12} />
              {exp.location}
            </p>
          </div>
        </div>
        <ul className="grid gap-2">
          {exp.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-[13px] leading-6 text-[#4b5563]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a9bec1]" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const messageText = `Portfolio inquiry

Name: ${form.name}
Email: ${form.email}

${form.message}`;

  const copyText = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    return false;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const didCopy = await copyText(messageText);
    setCopied(didCopy);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-reveal flex min-h-[320px] flex-col items-center justify-center rounded-lg border border-[#e5e7eb] bg-white p-8 text-center shadow-[0_18px_55px_rgba(17,24,39,0.07)]">
        <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f8f8] text-[#4f858b]">
          <Send size={20} />
        </span>
        <h3 className="mb-2 text-lg font-black text-[#111827]">
          {copied ? "Message copied" : "Message ready"}
        </h3>
        <p className="max-w-sm text-sm leading-7 text-[#4b5563]">
          {copied
            ? "No mail app was opened. Paste the copied message into your preferred email or LinkedIn."
            : "No mail app was opened. Copy the email address below and send the message from your preferred app."}
        </p>
        <textarea
          className="mt-5 min-h-[132px] w-full max-w-md resize-none rounded-lg border border-[#e5e7eb] bg-[#f7f8f8] px-4 py-3 text-left text-sm leading-6 text-[#4b5563] outline-none focus:border-[#a9bec1]"
          onFocus={(event) => event.currentTarget.select()}
          readOnly
          value={messageText}
        />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#111827] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1f2937]"
            onClick={() => void copyText(personalInfo.email)}
            type="button"
          >
            Copy email
          </button>
          <a
            className="inline-flex h-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white px-5 text-sm font-bold text-[#4f858b] transition-colors hover:border-[#a9bec1] hover:text-[#3a666b]"
            href={personalInfo.linkedin}
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </div>
        <button
          className="mt-5 text-sm font-bold text-[#4f858b]"
          onClick={() => {
            setSubmitted(false);
            setCopied(false);
            setForm({ name: "", email: "", message: "" });
          }}
          type="button"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-reveal self-start rounded-lg border border-[#e5e7eb] bg-white p-5 shadow-[0_18px_55px_rgba(17,24,39,0.07)] sm:p-7"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-[#4b5563]" htmlFor="contact-name">
          Name
          <input
            className="h-11 rounded-lg border border-[#e5e7eb] bg-[#f7f8f8] px-4 text-sm font-medium text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#a9bec1]"
            id="contact-name"
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Your name"
            required
            type="text"
            value={form.name}
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-[#4b5563]" htmlFor="contact-email">
          Email
          <input
            className="h-11 rounded-lg border border-[#e5e7eb] bg-[#f7f8f8] px-4 text-sm font-medium text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#a9bec1]"
            id="contact-email"
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="your@email.com"
            required
            type="email"
            value={form.email}
          />
        </label>
      </div>
      <label className="mt-4 grid gap-2 text-sm font-bold text-[#4b5563]" htmlFor="contact-message">
        Message
        <textarea
          className="min-h-[132px] resize-none rounded-lg border border-[#e5e7eb] bg-[#f7f8f8] px-4 py-3 text-sm font-medium leading-7 text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#a9bec1]"
          id="contact-message"
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          placeholder="Tell me about your project or opportunity..."
          required
          value={form.message}
        />
      </label>
      <motion.button
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111827] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1f2937] sm:w-auto"
        type="submit"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        Copy Message <Send size={15} />
      </motion.button>
    </form>
  );
}

export default function ScrollExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup = () => {};

    async function initScroll() {
      if (typeof window === "undefined" || !rootRef.current) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!mounted || !rootRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const media = gsap.matchMedia();

        media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".hero-scene",
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            })
            .to(".hero-copy", { yPercent: -16, autoAlpha: 0.62, ease: "none" }, 0)
            .to(".hero-image-card", { yPercent: -8, scale: 0.92, autoAlpha: 0.7, ease: "none" }, 0)
            .to(".hero-outline-word", { xPercent: -10, autoAlpha: 0.45, ease: "none" }, 0);

          const selectedCards = gsap.utils.toArray<HTMLElement>(".selected-card");
          gsap.set(selectedCards, {
            xPercent: (index) => [-8, 20, 48][index] ?? 20,
            yPercent: (index) => [54, 112, 168][index] ?? 112,
            rotate: (index) => [-5, 2, 6][index] ?? 0,
            scale: 0.86,
            autoAlpha: 0.96,
            zIndex: (index) => [3, 2, 1][index] ?? 1,
          });

          const selectedTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".selected-scene",
              start: "top top",
              end: "+=2700",
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
            },
          });

          selectedTimeline
            .fromTo(".selected-bg-word", { xPercent: 8 }, { xPercent: -10, ease: "none" }, 0)
            .set(selectedCards[0], { zIndex: 3 }, 0)
            .set(selectedCards[1], { zIndex: 2 }, 0)
            .set(selectedCards[2], { zIndex: 1 }, 0)
            .to(selectedCards[0], { xPercent: -12, yPercent: -46, rotate: -7, scale: 1.02, ease: "none" }, 0)
            .to(selectedCards[1], { xPercent: 18, yPercent: 8, rotate: 1, scale: 0.96, ease: "none" }, 0.08)
            .to(selectedCards[2], { xPercent: 46, yPercent: 58, rotate: 5, scale: 0.9, ease: "none" }, 0.18)
            .set(selectedCards[0], { zIndex: 1 }, 0.48)
            .set(selectedCards[1], { zIndex: 3 }, 0.48)
            .set(selectedCards[2], { zIndex: 2 }, 0.48)
            .to(selectedCards[0], { xPercent: -44, yPercent: -132, scale: 0.78, autoAlpha: 0.34, ease: "none" }, 0.5)
            .to(selectedCards[1], { xPercent: -10, yPercent: -46, rotate: -3, scale: 1.04, autoAlpha: 1, ease: "none" }, 0.5)
            .to(selectedCards[2], { xPercent: 20, yPercent: 0, rotate: 2, scale: 0.98, autoAlpha: 1, ease: "none" }, 0.56)
            .set(selectedCards[1], { zIndex: 1 }, 0.8)
            .set(selectedCards[2], { zIndex: 3 }, 0.8)
            .to(selectedCards[1], { xPercent: -42, yPercent: -132, scale: 0.82, autoAlpha: 0.38, ease: "none" }, 0.82)
            .to(selectedCards[2], { xPercent: -10, yPercent: -46, rotate: -2, scale: 1.05, ease: "none" }, 0.84);

          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".dark-archive",
                start: "top 86%",
                end: "top top",
                scrub: true,
              },
            })
            .fromTo(
              ".dark-archive",
              { clipPath: "circle(0% at 50% 50%)" },
              { clipPath: "circle(155% at 50% 50%)", ease: "none" }
            );

          const archiveCards = gsap.utils.toArray<HTMLElement>(".archive-card");
          gsap.set(archiveCards, {
            xPercent: (index) => [4, 58, 112, 158][index] ?? 58,
            yPercent: (index) => [-50, 8, 58, -6][index] ?? 0,
            rotate: (index) => [-3, 4, -2, 5][index] ?? 0,
            scale: (index) => [0.96, 1, 0.92, 0.88][index] ?? 1,
            zIndex: (index) => [4, 3, 2, 1][index] ?? 1,
          });

          const archiveTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".dark-archive",
              start: "top top",
              end: "+=2300",
              scrub: 0.85,
              pin: true,
              anticipatePin: 1,
            },
          });

          archiveTimeline
            .fromTo(".archive-bg-word", { xPercent: -14 }, { xPercent: 8, ease: "none" }, 0)
            .set(archiveCards[0], { zIndex: 4 }, 0)
            .set(archiveCards[1], { zIndex: 3 }, 0)
            .set(archiveCards[2], { zIndex: 2 }, 0)
            .set(archiveCards[3], { zIndex: 1 }, 0)
            .to(archiveCards[0], { xPercent: -58, yPercent: -92, rotate: -9, scale: 0.82, autoAlpha: 0.42, ease: "none" }, 0)
            .to(archiveCards[1], { xPercent: 0, yPercent: -36, rotate: 2, scale: 1.04, ease: "none" }, 0)
            .to(archiveCards[2], { xPercent: 52, yPercent: 8, rotate: -2, scale: 1, ease: "none" }, 0.2)
            .to(archiveCards[3], { xPercent: 104, yPercent: 54, rotate: 5, scale: 0.94, ease: "none" }, 0.34)
            .set(archiveCards[0], { zIndex: 1 }, 0.56)
            .set(archiveCards[1], { zIndex: 2 }, 0.56)
            .set(archiveCards[2], { zIndex: 4 }, 0.56)
            .set(archiveCards[3], { zIndex: 3 }, 0.56)
            .to(archiveCards[1], { xPercent: -56, yPercent: -78, rotate: -6, scale: 0.82, autoAlpha: 0.35, ease: "none" }, 0.58)
            .to(archiveCards[2], { xPercent: 0, yPercent: -36, scale: 1.04, ease: "none" }, 0.58)
            .to(archiveCards[3], { xPercent: 54, yPercent: 12, scale: 1, ease: "none" }, 0.68)
            .set(archiveCards[2], { zIndex: 2 }, 0.84)
            .set(archiveCards[3], { zIndex: 4 }, 0.84)
            .to(archiveCards[2], { xPercent: -54, yPercent: -86, scale: 0.82, autoAlpha: 0.36, ease: "none" }, 0.86)
            .to(archiveCards[3], { xPercent: 0, yPercent: -34, rotate: 1, scale: 1.05, ease: "none" }, 0.88);

          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".about-reveal",
                start: "top 86%",
                end: "top top",
                scrub: true,
              },
            })
            .fromTo(
              ".about-reveal",
              { clipPath: "circle(0% at 50% 50%)" },
              { clipPath: "circle(155% at 50% 50%)", ease: "none" }
            );

          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".about-reveal",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            })
            .fromTo(".about-bg-word", { xPercent: 10 }, { xPercent: -8, ease: "none" }, 0);

          gsap.utils.toArray<HTMLElement>(".story-card").forEach((card) => {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: card,
                  start: "top 72%",
                  end: "bottom 38%",
                  scrub: 0.55,
                },
              })
              .fromTo(card, { y: 54, scale: 0.92, autoAlpha: 0.36 }, { y: 0, scale: 1.04, autoAlpha: 1, ease: "none" })
              .to(card, { y: -28, scale: 0.97, autoAlpha: 0.55, ease: "none" });
          });

          gsap.fromTo(
            ".experience-line-progress",
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".experience-list",
                start: "top 64%",
                end: "bottom 56%",
                scrub: true,
              },
            }
          );

          gsap.utils.toArray<HTMLElement>(".experience-item").forEach((item) => {
            const dot = item.querySelector(".timeline-dot");
            const card = item.querySelector(".timeline-card");

            if (dot && card) {
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: item,
                    start: "top 68%",
                    end: "top 38%",
                    scrub: 0.45,
                  },
                })
                .to(dot, { scale: 1.22, borderColor: "#4f858b", backgroundColor: "#4f858b", ease: "none" }, 0)
                .fromTo(card, { x: 24, autoAlpha: 0.68 }, { x: 0, autoAlpha: 1, ease: "none" }, 0);
            }
          });

          gsap.fromTo(
            ".skill-card",
            { y: 34, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".skills-grid",
                start: "top 78%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".contact-reveal",
            { y: 48, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.85,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".contact-scene",
                start: "top 72%",
                once: true,
              },
            }
          );
        });

        media.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
          gsap.set(".dark-archive, .about-reveal", { clipPath: "none" });

          gsap.utils.toArray<HTMLElement>(".mobile-reveal").forEach((element) => {
            gsap.fromTo(
              element,
              { y: 28, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 88%",
                  once: true,
                },
              }
            );
          });

          gsap.fromTo(
            ".contact-reveal",
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".contact-scene",
                start: "top 82%",
                once: true,
              },
            }
          );
        });

        return () => media.revert();
      }, rootRef);

      cleanup = () => {
        context.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };

      ScrollTrigger.refresh();
    }

    void initScroll();

    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  return (
    <div ref={rootRef} className="scroll-experience overflow-x-hidden bg-[#f7f8f8] text-[#111827]">
      <section id="home" className="hero-scene relative min-h-screen overflow-hidden bg-[#f7f8f8] px-5 pt-14 sm:px-8 sm:pt-24">
        <GridBackground />
        <OutlineWord className="hero-outline-word bottom-[-0.12em] left-[-0.04em] opacity-60">
          AI
        </OutlineWord>
        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl grid-cols-1 items-start gap-7 py-3 sm:min-h-[calc(100vh-6rem)] sm:items-center sm:gap-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-16">
          <div className="hero-copy mobile-reveal max-w-2xl">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.22em] text-[#4f858b]">
              {heroContent.eyebrow}
            </p>
            <h1 className="mb-5 text-[clamp(3rem,7vw,5.9rem)] font-black leading-[0.92] tracking-tight text-[#111827]">
              Jaskeerat Singh
            </h1>
            <p className="mb-5 max-w-xl text-[clamp(1.05rem,2vw,1.35rem)] font-bold leading-8 text-[#1f2937]">
              {heroContent.headline}
            </p>
            <p className="mb-8 max-w-lg text-base leading-8 text-[#4b5563]">{heroContent.paragraph}</p>
            <div className="mb-7 flex flex-wrap gap-3">
              <motion.a
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#111827] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1f2937]"
                href="#projects"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Selected Works <ArrowRight size={16} />
              </motion.a>
              <motion.a
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-6 text-sm font-bold text-[#374151] transition-colors hover:border-[#a9bec1] hover:text-[#4f858b]"
                href={personalInfo.resume}
                rel="noopener noreferrer"
                target="_blank"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Resume <ExternalLink size={15} />
              </motion.a>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[#4b5563]">
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-[#4f858b]" />
                {personalInfo.location}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#a9bec1]" />
              <span>Open to AI roles and freelance AI automation</span>
            </div>
          </div>

          <motion.div
            className="hero-image-card mobile-reveal relative mx-auto w-full max-w-[360px] lg:mx-0"
            whileHover={{ y: -4 }}
          >
            <div className="relative overflow-hidden rounded-lg border border-[#dce4eb] bg-white shadow-[0_24px_80px_rgba(17,24,39,0.13)]">
              <div className="relative aspect-[4/5]">
                <Image
                  alt="Jaskeerat Singh, AI Engineer based in Chandigarh"
                  className="object-cover"
                  fill
                  loading="eager"
                  priority
                  sizes="(max-width: 1024px) 90vw, 360px"
                  src="/images/Jaskeerat.jpeg"
                  style={{ objectPosition: "center top" }}
                />
              </div>
              <div className="border-t border-[#e5e7eb] bg-white p-4">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-[#111827]">{personalInfo.name}</p>
                    <p className="text-xs font-bold text-[#4f858b]">AI Engineer</p>
                  </div>
                  <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-green-700">
                    Available
                  </span>
                </div>
                <TagList tags={credibilityItems.slice(0, 3)} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="selected-scene relative min-h-screen overflow-hidden bg-[#f7f8f8] px-5 py-20 sm:px-8 lg:h-screen lg:py-0">
        <GridBackground />
        <OutlineWord className="selected-bg-word left-[-0.08em] top-[8%] opacity-80">
          Selected
        </OutlineWord>
        <div className="relative z-10 mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center lg:h-screen">
          <div className="mobile-reveal max-w-xl">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#4f858b]">
              Selected Work
            </p>
            <h2 className="text-[clamp(2.4rem,6vw,5.2rem)] font-black leading-none tracking-tight text-[#111827]">
              Selected Works
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-[#4b5563]">
              Three practical AI systems, scrubbed through the viewport as the page moves.
            </p>
          </div>
          <div className="relative mt-10 min-h-[560px] lg:absolute lg:inset-0 lg:mt-0">
            {projects.map((project, index) => (
              <SelectedProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="archive" className="dark-archive clip-dark relative min-h-screen overflow-hidden bg-[#090d10] px-5 py-20 text-white sm:px-8 lg:h-screen lg:py-0">
        <GridBackground dark />
        <OutlineWord className="archive-bg-word right-[-0.16em] top-[10%] opacity-90" dark>
          Archive
        </OutlineWord>
        <div className="relative z-10 mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center lg:h-screen">
          <div className="mobile-reveal max-w-xl">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#a9bec1]">
              Digital Archive
            </p>
            <h2 className="text-[clamp(2.4rem,6vw,5.1rem)] font-black leading-none tracking-tight text-white">
              Systems in Motion
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-white/62">
              A darker archive layer for the experiments, patterns, and implementation muscles behind the featured work.
            </p>
          </div>
          <div className="relative mt-10 min-h-[620px] lg:absolute lg:inset-0 lg:mt-0">
            {archiveItems.map((item, index) => (
              <ArchiveCard item={item} index={index} key={item.title} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-reveal clip-light relative overflow-hidden bg-[#f7f8f8] px-5 py-20 sm:px-8 lg:py-0">
        <GridBackground />
        <OutlineWord className="about-bg-word left-[-0.1em] top-[6%] opacity-80">
          About
        </OutlineWord>
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:min-h-[250vh] lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
          <aside className="mobile-reveal lg:sticky lg:top-[84px] lg:flex lg:h-[calc(100vh-84px)] lg:items-center">
            <div className="w-full rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-[0_18px_55px_rgba(17,24,39,0.08)]">
              <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-lg bg-[#e5e7eb]">
                <Image
                  alt="Portrait of Jaskeerat Singh"
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 90vw, 320px"
                  src="/images/Jaskeerat.jpeg"
                  style={{ objectPosition: "center top" }}
                />
              </div>
              <h2 className="mb-1 text-2xl font-black tracking-tight text-[#111827]">Jaskeerat Singh</h2>
              <p className="mb-5 text-sm font-bold text-[#4f858b]">AI Engineer / LLM Systems</p>
              <div className="grid gap-3 border-t border-[#e5e7eb] pt-5 text-sm text-[#4b5563]">
                <p className="flex items-center gap-3">
                  <BriefcaseBusiness size={16} className="text-[#4f858b]" />
                  AI Engineer Intern at EOXS
                </p>
                <p className="flex items-center gap-3">
                  <GraduationCap size={16} className="text-[#4f858b]" />
                  {aboutContent.education.degree}
                </p>
                <p className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#4f858b]" />
                  {personalInfo.location}
                </p>
              </div>
            </div>
          </aside>

          <div className="story-stack grid gap-6 lg:py-[24vh]">
            <div className="mobile-reveal mb-2 max-w-2xl">
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#4f858b]">
                About
              </p>
              <h2 className="text-[clamp(2.3rem,5vw,4.5rem)] font-black leading-none tracking-tight text-[#111827]">
                Practical AI, built for real work.
              </h2>
            </div>
            {storyCards.map((card) => (
              <StoryCard card={card} key={card.title} />
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="experience-skills relative overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-28">
        <GridBackground />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="mobile-reveal mb-14 max-w-2xl">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#4f858b]">
              Experience / Skills
            </p>
            <h2 className="text-[clamp(2.2rem,5vw,4.2rem)] font-black leading-none tracking-tight text-[#111827]">
              Timeline and Stack
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="experience-list relative grid gap-7">
              <div className="absolute left-[17px] top-3 hidden h-[calc(100%-1.5rem)] w-px bg-[#e5e7eb] sm:block" />
              <div className="experience-line-progress absolute left-[17px] top-3 hidden h-[calc(100%-1.5rem)] w-px origin-top bg-[#4f858b] sm:block" />
              {experiences.map((exp, index) => (
                <ExperienceCard exp={exp} index={index} key={`${exp.company}-${exp.role}`} />
              ))}
            </div>

            <div id="skills" className="skills-grid grid gap-4 sm:grid-cols-2">
              {focusCards.map((card) => (
                <motion.article
                  className="skill-card rounded-lg border border-[#e5e7eb] bg-[#f7f8f8] p-5"
                  key={card.title}
                  whileHover={{ y: -4 }}
                >
                  <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#4f858b] shadow-sm">
                    {card.icon}
                  </span>
                  <h3 className="mb-2 text-base font-black text-[#111827]">{card.title}</h3>
                  <p className="text-sm leading-7 text-[#4b5563]">{card.description}</p>
                </motion.article>
              ))}

              {skillCategories.map((category) => (
                <motion.article
                  className="skill-card rounded-lg border border-[#e5e7eb] bg-white p-5 shadow-[0_12px_35px_rgba(17,24,39,0.05)]"
                  key={category.label}
                  whileHover={{ y: -4 }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f7f8f8] text-[#4f858b]">
                      <Code2 size={16} />
                    </span>
                    <h3 className="text-sm font-black uppercase tracking-[0.12em] text-[#4f858b]">
                      {category.label}
                    </h3>
                  </div>
                  <TagList tags={category.skills} />
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-scene relative overflow-hidden bg-[#f7f8f8] px-5 py-20 sm:px-8 sm:py-28">
        <GridBackground />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="contact-reveal mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#4f858b]">
              Contact
            </p>
            <h2 className="contact-reveal mb-5 text-[clamp(2.3rem,5vw,4.7rem)] font-black leading-none tracking-tight text-[#111827]">
              Let&apos;s build intelligent systems together.
            </h2>
            <p className="contact-reveal mb-8 max-w-lg text-base leading-8 text-[#4b5563]">
              Open to AI Engineer roles, freelance AI automation projects, and collaboration opportunities.
            </p>
            <div className="grid gap-3">
              {contactCards.map((card) => {
                const body = (
                  <div className="contact-reveal flex items-center gap-4 rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-[0_10px_30px_rgba(17,24,39,0.05)]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f7f8f8] text-[#4f858b]">
                      {card.icon}
                    </span>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#9ca3af]">
                        {card.label}
                      </p>
                      <p className="text-sm font-bold text-[#111827]">{card.value}</p>
                    </div>
                  </div>
                );

                return card.href ? (
                  <a href={card.href} key={card.label}>
                    {body}
                  </a>
                ) : card.label === "Email" ? (
                  <button
                    className="text-left"
                    key={card.label}
                    onClick={() => void navigator.clipboard?.writeText(personalInfo.email)}
                    type="button"
                  >
                    {body}
                  </button>
                ) : (
                  <div key={card.label}>{body}</div>
                );
              })}
            </div>
            <div className="contact-reveal mt-5 flex gap-3">
              <a
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#4b5563] transition-colors hover:border-[#a9bec1] hover:text-[#4f858b]"
                href={personalInfo.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <BrandGithubIcon />
              </a>
              <a
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#4b5563] transition-colors hover:border-[#a9bec1] hover:text-[#4f858b]"
                href={personalInfo.linkedin}
                rel="noopener noreferrer"
                target="_blank"
              >
                <BrandLinkedinIcon />
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
