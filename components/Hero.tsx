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
        className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-32 pb-16 lg:py-0"
        style={{ background: "linear-gradient(135deg, #F8F3EA 0%, #EDE7DB 100%)" }}
      >
        <div className="absolute top-20 right-0 w-64 h-64 rounded-full opacity-[0.06]" style={{ border: "1px solid #1C1814" }} />
        <div className="absolute bottom-20 left-0 w-40 h-40 rounded-full opacity-[0.05]" style={{ border: "1px solid #1C1814" }} />

        <motion.div variants={stagger} initial="initial" animate="animate" className="relative max-w-lg">
          <motion.p variants={fadeUp} className="font-body text-xs tracking-[0.4em] uppercase text-warm-gray mb-6">
            Santa Rosa, California
          </motion.p>

          {/* Heading + logo inline */}
          <motion.div variants={fadeUp} className="flex items-center gap-5 mb-4">
            <h1 className="font-display font-light text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-dark">
              Ippinn
            </h1>
            <Image
              src="/logo.png"
              alt="Ippinn logo"
              width={90}
              height={90}
              className="shrink-0"
              style={{ mixBlendMode: "multiply" }}
            />
          </motion.div>

          <motion.div
            variants={{ initial: { scaleX: 0 }, animate: { scaleX: 1, transition: { duration: 1, ease: "easeOut" as const } } }}
            className="origin-left mb-6"
            style={{ height: "1px", width: "6rem", backgroundColor: "#D4C9B8" }}
          />

          <motion.p variants={fadeUp} className="font-display text-[clamp(1.2rem,3vw,2rem)] italic font-light text-dark-muted tracking-wide mb-3">
            Udon &amp; Tempura
          </motion.p>

          <motion.p variants={fadeUp} className="font-body text-sm text-warm-gray tracking-wide max-w-sm mb-10">
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
