"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

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
  visible: { transition: { staggerChildren: 0.1 } },
};

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

type ContactCard =
  | { icon: React.ReactNode; label: string; value: string; href: string }
  | { icon: React.ReactNode; label: string; value: string; href: undefined };

const contactCards: ContactCard[] = [
  {
    icon: <Mail size={15} />,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: <Phone size={15} />,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
  },
  {
    icon: <MapPin size={15} />,
    label: "Location",
    value: personalInfo.location,
    href: undefined,
  },
];

const socialCards = [
  { icon: <GitHubIcon />, label: "GitHub", href: personalInfo.github },
  { icon: <LinkedInIcon />, label: "LinkedIn", href: personalInfo.linkedin },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  const inputBase =
    "w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-[13.5px] text-[#111827] outline-none placeholder:text-[#9ca3af]";

  return (
    <section
      id="contact"
      className="py-20 sm:py-28"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-12">
            <p
              className="text-[10.5px] font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#4f858b" }}
            >
              Get In Touch
            </p>
            <h2
              className="font-extrabold tracking-tight mb-3"
              style={{
                fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
                lineHeight: 1.15,
                color: "#111827",
                letterSpacing: "-0.02em",
                maxWidth: "560px",
              }}
            >
              Let's build intelligent systems together.
            </h2>
            <p style={{ fontSize: "0.925rem", color: "#4b5563", maxWidth: "500px" }}>
              Open to AI Engineer roles, freelance AI automation projects, and
              collaboration opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,500px)] gap-10 lg:gap-16">

            {/* LEFT: contact info */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              {contactCards.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-xl border border-[#e5e7eb] p-4"
                  style={{ backgroundColor: "#f7f8f8" }}
                >
                  <div
                    className="flex shrink-0 items-center justify-center w-9 h-9 rounded-lg"
                    style={{ backgroundColor: "rgba(79,133,139,0.1)", color: "#4f858b" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "10.5px",
                        color: "#9ca3af",
                        fontWeight: 500,
                        marginBottom: "2px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium transition-colors duration-200"
                        style={{ fontSize: "13.5px", color: "#111827" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "#4f858b";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "#111827";
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p
                        className="font-medium"
                        style={{ fontSize: "13.5px", color: "#111827" }}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Social row */}
              <div className="flex items-center gap-3 mt-1">
                {socialCards.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center gap-2 rounded-xl border border-[#e5e7eb] px-4 py-3 font-medium transition-colors duration-200"
                    style={{ fontSize: "13px", color: "#4b5563", backgroundColor: "#f7f8f8" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#4f858b";
                      (e.currentTarget as HTMLElement).style.borderColor = "#a9bec1";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#4b5563";
                      (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb";
                    }}
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: form */}
            <motion.div variants={fadeUp}>
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center rounded-2xl border border-[#e5e7eb] p-10 text-center"
                  style={{ backgroundColor: "#f7f8f8", minHeight: "340px" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(79,133,139,0.1)" }}
                  >
                    <Send size={20} style={{ color: "#4f858b" }} />
                  </div>
                  <p
                    className="font-bold mb-2"
                    style={{ fontSize: "16px", color: "#111827" }}
                  >
                    Email client opened
                  </p>
                  <p style={{ fontSize: "13.5px", color: "#6b7280", maxWidth: "300px" }}>
                    If it didn&apos;t open, reach me directly at{" "}
                    <a
                      href={`mailto:${personalInfo.email}`}
                      style={{ color: "#4f858b" }}
                    >
                      {personalInfo.email}
                    </a>
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="mt-6 text-[13px] font-medium transition-colors duration-200"
                    style={{ color: "#4f858b" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#3a666b";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#4f858b";
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 rounded-2xl border border-[#e5e7eb] p-6 sm:p-8"
                  style={{ backgroundColor: "#f7f8f8" }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-name"
                        style={{ fontSize: "12px", color: "#6b7280", fontWeight: 500 }}
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className={inputBase}
                        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#a9bec1";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#e5e7eb";
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-email"
                        style={{ fontSize: "12px", color: "#6b7280", fontWeight: 500 }}
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className={inputBase}
                        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#a9bec1";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#e5e7eb";
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-message"
                      style={{ fontSize: "12px", color: "#6b7280", fontWeight: 500 }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      className={`${inputBase} resize-none`}
                      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#a9bec1";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                      }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-[11px] text-[13.5px] font-semibold text-white"
                    style={{ backgroundColor: "#111827" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#1f2937";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#111827";
                    }}
                  >
                    Send Message
                    <Send size={14} />
                  </motion.button>
                </form>
              )}
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
