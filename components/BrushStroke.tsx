"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function BrushStroke({ color = "#C9A96E" }: { color?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <svg ref={ref} width="120" height="14" viewBox="0 0 120 14" fill="none" className="mt-4">
      <motion.path
        d="M 4,10 C 22,6 44,12 66,8 C 85,5 104,10 116,8"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="130"
        initial={{ strokeDashoffset: 130 }}
        animate={{ strokeDashoffset: inView ? 0 : 130 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
      />
    </svg>
  );
}
