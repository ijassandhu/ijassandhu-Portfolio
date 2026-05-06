"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface FloatingCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  enterDelay?: number;
  floatDelay?: number;
  className?: string;
}

export default function FloatingCard({
  title,
  description,
  icon,
  enterDelay = 0,
  floatDelay = 0,
  className = "",
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: enterDelay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
          delay: floatDelay,
        }}
        className="bg-white rounded-xl p-4 border border-[#e5e7eb]"
        style={{
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-start gap-2.5">
          <div
            className="p-1.5 rounded-lg shrink-0"
            style={{ backgroundColor: "rgba(79,133,139,0.10)" }}
          >
            <span style={{ color: "#4f858b", display: "flex" }}>{icon}</span>
          </div>
          <div className="min-w-0">
            <p
              className="text-[12px] font-semibold leading-tight"
              style={{ color: "#111827" }}
            >
              {title}
            </p>
            <p
              className="text-[11px] mt-0.5 leading-tight"
              style={{ color: "#6b7280" }}
            >
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
