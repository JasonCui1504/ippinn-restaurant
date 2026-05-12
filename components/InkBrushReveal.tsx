"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Approximate arc length of the path below — used for stroke-dasharray
const STROKE_LEN = 1350;
const PATH = "M 10,38 C 180,18 400,54 640,32 C 880,12 1100,48 1270,30";

export default function InkBrushReveal() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.05"],
  });

  // Direct scroll-to-stroke mapping with a light spring for smoothness
  const rawOffset = useTransform(scrollYProgress, [0, 1], [STROKE_LEN, 0]);
  const strokeDashoffset = useSpring(rawOffset, { stiffness: 80, damping: 22, restDelta: 1 });

  // Characters and tagline fade in as stroke nears completion
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.9], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.55, 0.9], [14, 0]);

  return (
    <div
      ref={ref}
      className="relative py-14 overflow-hidden"
      style={{ backgroundColor: "#F8F3EA" }}
      aria-hidden="true"
    >
      {/* Ink brush stroke */}
      <div className="max-w-6xl mx-auto px-6">
        <svg
          viewBox="0 0 1280 68"
          preserveAspectRatio="xMidYMid meet"
          className="w-full"
          style={{ height: "54px" }}
        >
          <motion.path
            d={PATH}
            stroke="#1C1814"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={STROKE_LEN}
            style={{ strokeDashoffset }}
          />
        </svg>
      </div>

      {/* 一品 + tagline fades in after stroke is drawn */}
      <motion.div
        className="flex flex-col items-center mt-5"
        style={{ opacity: textOpacity, y: textY }}
      >
        <p
          className="font-display font-light"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#1C1814", letterSpacing: "0.35em" }}
        >
          一品
        </p>
        <p
          className="font-body mt-2"
          style={{ fontSize: "10px", letterSpacing: "0.45em", textTransform: "uppercase", color: "#9B7840" }}
        >
          One Taste · First Class
        </p>
      </motion.div>
    </div>
  );
}
