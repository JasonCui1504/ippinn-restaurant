"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const STROKE_LEN = 1350;
const BRUSH_PATH = "M 10,38 C 180,18 400,54 640,32 C 880,12 1100,48 1270,30";
const DA = 300;      // dasharray for individual SVG stroke paths
const CJK_DA = 5000; // dasharray for CJK glyph outlines (longer than any rendered glyph)

// ── 一 ──────────────────────────────────────────────────────────────────────
const ICHI = "M 15,72 C 55,62 110,59 155,63 C 168,65 180,71 185,78";

// ── 品 ──────────────────────────────────────────────────────────────────────
// 9 strokes: each 口 = left vertical → top+right arm → bottom horizontal
const HIN = [
  "M 52,8 C 50,28 50,55 52,75",
  "M 52,8 C 90,5 120,5 148,8 C 148,28 148,55 148,75",
  "M 52,75 C 90,78 120,78 148,75",
  "M 2,88 C 0,112 0,148 2,175",
  "M 2,88 C 38,85 68,85 90,88 C 90,112 90,148 90,175",
  "M 2,175 C 38,178 68,178 90,175",
  "M 110,88 C 108,112 108,148 110,175",
  "M 110,88 C 146,85 176,85 198,88 C 198,112 198,148 198,175",
  "M 110,175 C 146,178 176,178 198,175",
];

export default function InkBrushReveal() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.05"],
  });

  // ── Horizontal brush stroke ──────────────────────────────────────────────
  const rawStroke = useTransform(scrollYProgress, [0, 1], [STROKE_LEN, 0]);
  const strokeDashoffset = useSpring(rawStroke, { stiffness: 80, damping: 22, restDelta: 1 });

  // ── 一 ──────────────────────────────────────────────────────────────────
  const ichiOffset = useTransform(scrollYProgress, [0.22, 0.48], [DA, 0]);

  // ── 品 (9 strokes, compressed into [0.46 – 0.82]) ───────────────────────
  const h1 = useTransform(scrollYProgress, [0.46, 0.51], [DA, 0]);
  const h2 = useTransform(scrollYProgress, [0.50, 0.55], [DA, 0]);
  const h3 = useTransform(scrollYProgress, [0.54, 0.59], [DA, 0]);
  const h4 = useTransform(scrollYProgress, [0.58, 0.63], [DA, 0]);
  const h5 = useTransform(scrollYProgress, [0.62, 0.67], [DA, 0]);
  const h6 = useTransform(scrollYProgress, [0.66, 0.71], [DA, 0]);
  const h7 = useTransform(scrollYProgress, [0.70, 0.75], [DA, 0]);
  const h8 = useTransform(scrollYProgress, [0.74, 0.79], [DA, 0]);
  const h9 = useTransform(scrollYProgress, [0.78, 0.85], [DA, 0]);
  const hinOffsets = [h1, h2, h3, h4, h5, h6, h7, h8, h9];

  // ── 乌冬 (glyph-outline trace, sequential) ───────────────────────────────
  const wuOffset   = useTransform(scrollYProgress, [0.83, 0.92], [CJK_DA, 0]);
  const dongOffset = useTransform(scrollYProgress, [0.90, 0.98], [CJK_DA, 0]);

  // ── Tagline ──────────────────────────────────────────────────────────────
  const taglineOpacity = useTransform(scrollYProgress, [0.96, 1.0], [0, 1]);

  return (
    <div
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#F8F3EA" }}
      aria-hidden="true"
    >
      {/* Full-width ink brush stroke */}
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

      {/* 一品 — stroke-by-stroke individual paths */}
      <div className="flex justify-center items-start gap-10 lg:gap-16 mt-12">
        <svg viewBox="0 0 200 120" style={{ width: "clamp(140px, 19vw, 220px)", height: "auto" }}>
          <motion.path
            d={ICHI}
            stroke="#1C1814" strokeWidth="11" strokeLinecap="round" fill="none"
            strokeDasharray={DA} style={{ strokeDashoffset: ichiOffset }}
          />
        </svg>
        <svg viewBox="0 0 200 185" style={{ width: "clamp(140px, 19vw, 220px)", height: "auto" }}>
          {HIN.map((d, i) => (
            <motion.path
              key={i} d={d}
              stroke="#1C1814" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"
              strokeDasharray={DA} style={{ strokeDashoffset: hinOffsets[i] }}
            />
          ))}
        </svg>
      </div>

      {/* 乌冬 — glyph-outline trace, slightly smaller */}
      <div className="flex justify-center mt-6">
        <svg
          viewBox="0 0 280 138"
          style={{ width: "clamp(150px, 20vw, 250px)", height: "auto", overflow: "visible" }}
        >
          <motion.text
            x="70" y="118"
            textAnchor="middle"
            fontFamily="var(--font-cormorant), serif"
            fontSize="98"
            fontWeight="300"
            stroke="#1C1814"
            strokeWidth="1.2"
            fill="none"
            strokeDasharray={CJK_DA}
            style={{ strokeDashoffset: wuOffset }}
          >
            乌
          </motion.text>
          <motion.text
            x="210" y="118"
            textAnchor="middle"
            fontFamily="var(--font-cormorant), serif"
            fontSize="98"
            fontWeight="300"
            stroke="#1C1814"
            strokeWidth="1.2"
            fill="none"
            strokeDasharray={CJK_DA}
            style={{ strokeDashoffset: dongOffset }}
          >
            冬
          </motion.text>
        </svg>
      </div>

      {/* Tagline */}
      <motion.p
        className="font-body text-center mt-8"
        style={{
          fontSize: "10px",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "#9B7840",
          opacity: taglineOpacity,
        }}
      >
        Handcrafted Udon&nbsp;&nbsp;·&nbsp;&nbsp;Exceptional Taste&nbsp;&nbsp;·&nbsp;&nbsp;Simple Ingredients
      </motion.p>
    </div>
  );
}
