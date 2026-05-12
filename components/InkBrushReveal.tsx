"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const STROKE_LEN = 1350;
const BRUSH_PATH = "M 10,38 C 180,18 400,54 640,32 C 880,12 1100,48 1270,30";

// Generous dasharray — larger than any glyph outline at fontSize 110
const CHAR_DASH = 4000;

export default function InkBrushReveal() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.05"],
  });

  // ── Brush stroke across full width ────────────────────────────────────────
  const rawStroke = useTransform(scrollYProgress, [0, 1], [STROKE_LEN, 0]);
  const strokeDashoffset = useSpring(rawStroke, { stiffness: 80, damping: 22, restDelta: 1 });

  // ── 一 draws while brush is ~35–68% done ──────────────────────────────────
  const rawChar1 = useTransform(scrollYProgress, [0.35, 0.68], [CHAR_DASH, 0]);
  const char1Offset = useSpring(rawChar1, { stiffness: 80, damping: 22, restDelta: 1 });

  // ── 品 draws while 一 is ~55–90% done ────────────────────────────────────
  const rawChar2 = useTransform(scrollYProgress, [0.55, 0.90], [CHAR_DASH, 0]);
  const char2Offset = useSpring(rawChar2, { stiffness: 80, damping: 22, restDelta: 1 });

  // ── Fill floods in after each stroke is complete ──────────────────────────
  const char1FillOpacity = useTransform(scrollYProgress, [0.64, 0.76], [0, 1]);
  const char2FillOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  // ── Tagline fades in last ─────────────────────────────────────────────────
  const taglineOpacity = useTransform(scrollYProgress, [0.88, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="relative py-14 overflow-hidden"
      style={{ backgroundColor: "#F8F3EA" }}
      aria-hidden="true"
    >
      {/* Horizontal ink brush stroke */}
      <div className="max-w-6xl mx-auto px-6">
        <svg viewBox="0 0 1280 68" preserveAspectRatio="xMidYMid meet" className="w-full" style={{ height: "54px" }}>
          <motion.path
            d={BRUSH_PATH}
            stroke="#1C1814"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={STROKE_LEN}
            style={{ strokeDashoffset }}
          />
        </svg>
      </div>

      {/* 一品 — each character paints itself via stroke-dashoffset */}
      <div className="flex justify-center mt-4">
        <svg
          viewBox="0 0 300 130"
          style={{ width: "clamp(130px, 20vw, 220px)", height: "auto", overflow: "visible" }}
        >
          {/* 一 */}
          <motion.text
            x="75"
            y="108"
            textAnchor="middle"
            fontFamily="var(--font-cormorant)"
            fontSize="110"
            fontWeight="300"
            stroke="#1C1814"
            strokeWidth="1.5"
            strokeDasharray={CHAR_DASH}
            style={{
              strokeDashoffset: char1Offset,
              fill: "#1C1814",
              fillOpacity: char1FillOpacity,
            }}
          >
            一
          </motion.text>

          {/* 品 */}
          <motion.text
            x="225"
            y="108"
            textAnchor="middle"
            fontFamily="var(--font-cormorant)"
            fontSize="110"
            fontWeight="300"
            stroke="#1C1814"
            strokeWidth="1.5"
            strokeDasharray={CHAR_DASH}
            style={{
              strokeDashoffset: char2Offset,
              fill: "#1C1814",
              fillOpacity: char2FillOpacity,
            }}
          >
            品
          </motion.text>
        </svg>
      </div>

      {/* Tagline */}
      <motion.p
        className="font-body text-center mt-4"
        style={{
          fontSize: "10px",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "#9B7840",
          opacity: taglineOpacity,
        }}
      >
        One Taste · First Class
      </motion.p>
    </div>
  );
}
