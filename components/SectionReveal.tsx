"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export default function SectionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: SectionRevealProps) {
  const initial = {
    opacity: 0,
    y: direction === "up" ? 26 : 0,
    x: direction === "left" ? -18 : direction === "right" ? 18 : 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
