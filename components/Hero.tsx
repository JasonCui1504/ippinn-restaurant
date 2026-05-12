"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import OrderButton from "./OrderButton";

const stagger = { animate: { transition: { staggerChildren: 0.15 } } };
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

// ─── Hero slideshow ───────────────────────────────────────────────────────────
// Upload photos to public/ named hero-1.jpg, hero-2.jpg, hero-3.jpg, etc.
// Supports up to 8 photos. Cycles every 17 seconds with a crossfade.
// If none are found, falls back to the CDN photo below.
const CANDIDATES = Array.from({ length: 8 }, (_, i) => `/hero-${i + 1}.jpg`);
const CDN_FALLBACK =
  "https://website-cdn.menusifu.com/wp-content/uploads/ippinnllc.com/2023/04/微信图片_20230413172828.jpg";

export default function Hero() {
  const [slides, setSlides] = useState<string[]>([CDN_FALLBACK]);
  const [idx, setIdx] = useState(0);

  // Probe which hero-N.jpg files actually exist
  useEffect(() => {
    Promise.allSettled(
      CANDIDATES.map(
        (src) =>
          new Promise<string>((resolve, reject) => {
            const img = new window.Image();
            img.onload = () => resolve(src);
            img.onerror = () => reject();
            img.src = src;
          })
      )
    ).then((results) => {
      const valid = results
        .filter((r): r is PromiseFulfilledResult<string> => r.status === "fulfilled")
        .map((r) => r.value);
      if (valid.length > 0) setSlides(valid);
    });
  }, []);

  // Cycle slides
  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 17000);
    return () => clearInterval(t);
  }, [slides]);

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left — text */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-32 pb-16 lg:py-0 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #F8F3EA 0%, #EDE7DB 100%)" }}
      >
        <div className="absolute top-20 right-0 w-64 h-64 rounded-full opacity-[0.06]" style={{ border: "1px solid #1C1814" }} />
        <div className="absolute bottom-20 left-0 w-40 h-40 rounded-full opacity-[0.05]" style={{ border: "1px solid #1C1814" }} />

        {/* Sakura petals */}
        {[
          { left: "7%",  size: 13, color: "#F5C2CA", dur: 8,   delay: 0,   xDrift: 22,  rotEnd: 200  },
          { left: "25%", size: 10, color: "#F0B8C2", dur: 10,  delay: 2.5, xDrift: -16, rotEnd: -150 },
          { left: "44%", size: 15, color: "#F8D0D6", dur: 9,   delay: 1.3, xDrift: 28,  rotEnd: 220  },
          { left: "62%", size: 11, color: "#F5C2CA", dur: 11,  delay: 4.8, xDrift: -20, rotEnd: 175  },
          { left: "78%", size: 12, color: "#F0B8C2", dur: 8.5, delay: 3.2, xDrift: 18,  rotEnd: -190 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: p.left, top: 0 }}
            animate={{ y: [-p.size, 900], x: [0, p.xDrift], rotate: [0, p.rotEnd], opacity: [0, 0.72, 0.72, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "linear" }}
          >
            <svg width={p.size} height={Math.round(p.size * 1.4)} viewBox="0 0 20 28" aria-hidden="true">
              <path d="M 10,0 C 18,4 20,14 10,28 C 0,14 2,4 10,0 Z" fill={p.color} />
            </svg>
          </motion.div>
        ))}

        {/* Cartoon udon bowl with rising steam — desktop only */}
        <motion.div
          className="absolute pointer-events-none select-none hidden lg:block"
          style={{ bottom: "7%", right: "5%" }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
          aria-hidden="true"
        >
          {/* Steam wisps above the bowl */}
          <div style={{ position: "relative", height: "62px", width: "110px" }}>
            {[
              { x: 14, delay: 0,   d: "M 7,58 C 1,46 13,34 7,22 C 1,10 10,3 8,0" },
              { x: 45, delay: 0.9, d: "M 7,58 C 13,46 1,34 7,22 C 13,10 3,3 7,0" },
              { x: 76, delay: 1.8, d: "M 7,58 C 1,46 13,34 7,22 C 1,10 10,3 8,0" },
            ].map((w, i) => (
              <motion.svg
                key={i}
                width="14" height="62"
                viewBox="0 0 14 62"
                style={{ position: "absolute", bottom: 0, left: w.x }}
                animate={{ y: [0, -24], opacity: [0, 0.5, 0] }}
                transition={{ duration: 2.7, repeat: Infinity, delay: w.delay, ease: "easeOut" }}
              >
                <path d={w.d} stroke="#8B6430" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              </motion.svg>
            ))}
          </div>

          {/* Bowl */}
          <svg width="110" height="92" viewBox="0 0 120 100">
            <ellipse cx="60" cy="98" rx="46" ry="5" fill="rgba(0,0,0,0.08)" />
            <path d="M 10,50 C 5,78 22,96 60,98 C 98,96 115,78 110,50 Z" fill="#EDE0C4" stroke="#7A5C2E" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M 17,50 C 13,74 28,90 60,92 C 92,90 107,74 103,50 Z" fill="#B87D48" opacity="0.18" />
            <ellipse cx="60" cy="50" rx="50" ry="13" fill="#F2E6CE" stroke="#7A5C2E" strokeWidth="2.5" />
            <path d="M 20,46 C 33,36 46,56 59,46 C 72,36 85,56 98,46" fill="none" stroke="#D4A853" strokeWidth="3" strokeLinecap="round" />
            <path d="M 24,53 C 37,43 50,63 63,53 C 76,43 89,63 98,53" fill="none" stroke="#C09040" strokeWidth="2.5" strokeLinecap="round" />
            {/* Narutomaki */}
            <circle cx="42" cy="42" r="7" fill="#F5EDE0" stroke="#7A5C2E" strokeWidth="1.5" />
            <path d="M 37,42 C 39,37 45,37 47,42" fill="#E8ABA5" />
            {/* Green onion */}
            <circle cx="74" cy="42" r="3.5" fill="#7CB87A" />
            <circle cx="80" cy="46" r="2.5" fill="#6AAA68" />
            <circle cx="70" cy="47" r="2" fill="#7CB87A" />
            {/* Chopsticks */}
            <line x1="50" y1="28" x2="42" y2="72" stroke="#9B6B2E" strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="26" x2="54" y2="72" stroke="#9B6B2E" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>

        <motion.div variants={stagger} initial="initial" animate="animate" className="relative max-w-lg">
          <motion.p variants={fadeUp} className="font-body text-xs tracking-[0.4em] uppercase text-warm-gray mb-6">
            Santa Rosa, California
          </motion.p>

          {/* Heading + logo: logo is centered beside both title lines */}
          <motion.div variants={fadeUp} className="flex items-center gap-6 mb-10">
            <div>
              <h1 className="font-display font-light text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-dark">
                Ippinn
              </h1>
              <div className="my-4" style={{ height: "1px", width: "6rem", backgroundColor: "#D4C9B8" }} />
              <p className="font-display text-[clamp(1.2rem,3vw,2rem)] italic font-light text-dark-muted tracking-wide">
                Udon &amp; Tempura
              </p>
            </div>
            <Image
              src="/logo.png"
              alt="Ippinn logo"
              width={160}
              height={160}
              className="shrink-0"
              style={{ mixBlendMode: "multiply" }}
            />
          </motion.div>

          <motion.p variants={fadeUp} className="font-body text-sm text-warm-gray tracking-wide max-w-sm mb-10 -mt-6">
            Handcrafted noodles. From-scratch broths. Always fresh.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
            <OrderButton className="inline-block font-body text-xs tracking-[0.25em] uppercase px-8 py-4 bg-accent text-cream hover:bg-accent-light transition-colors duration-300" />
            <a
              href="#menu"
              className="inline-block font-body text-xs tracking-[0.25em] uppercase px-8 py-4 border border-dark text-dark hover:bg-dark hover:text-cream transition-all duration-300"
            >
              View Menu
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Right — crossfading slideshow */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="lg:w-[55%] relative min-h-[50vh] lg:min-h-screen overflow-hidden"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={slides[idx]}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={slides[idx]}
              alt="Ippinn food"
              fill
              className="object-cover"
              priority={idx === 0}
              sizes="(max-width: 1024px) 100vw, 55vw"
              unoptimized
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient blend into text side */}
        <div className="absolute inset-0 pointer-events-none z-10" style={{ background: "linear-gradient(to right, #F8F3EA 0%, transparent 12%)" }} />

        {/* Slide dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 right-6 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="transition-all duration-300"
                style={{
                  width: i === idx ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: i === idx ? "#F8F3EA" : "rgba(248,243,234,0.4)",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-8 lg:left-20 flex items-center gap-3"
      >
        <motion.div
          animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="h-px w-8" style={{ background: "linear-gradient(to right, #7D7268, transparent)" }}
        />
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-warm-gray">Scroll</span>
      </motion.div>
    </section>
  );
}
