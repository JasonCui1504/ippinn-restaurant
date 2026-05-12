"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

// Using a later, higher-quality food photo
const HERO_PHOTO =
  "https://website-cdn.menusifu.com/wp-content/uploads/ippinnllc.com/2023/04/微信图片_20230413172828.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left — text side */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-32 pb-16 lg:py-0"
        style={{ background: "linear-gradient(135deg, #F8F3EA 0%, #EDE7DB 100%)" }}
      >
        <div className="absolute top-20 right-0 w-64 h-64 rounded-full opacity-[0.06]" style={{ border: "1px solid #1C1814" }} />
        <div className="absolute bottom-20 left-0 w-40 h-40 rounded-full opacity-[0.05]" style={{ border: "1px solid #1C1814" }} />

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="relative max-w-lg"
        >
          {/* Logo — uses /logo.png if uploaded, falls back to CDN white logo inverted */}
          <motion.div variants={fadeUp} className="mb-8">
            <Image
              src="/logo.png"
              alt="Ippinn logo"
              width={140}
              height={70}
              className="opacity-90"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://website-cdn.menusifu.com/public/images/Transparent+Logo.png";
                (e.currentTarget as HTMLImageElement).className = "invert opacity-80";
              }}
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-body text-xs tracking-[0.4em] uppercase text-warm-gray mb-6"
          >
            Santa Rosa, California
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display font-light text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-dark mb-4"
          >
            Ippinn
          </motion.h1>

          <motion.div
            variants={{
              initial: { scaleX: 0 },
              animate: { scaleX: 1, transition: { duration: 1, ease: "easeOut" as const } },
            }}
            className="origin-left mb-6"
            style={{ height: "1px", width: "6rem", backgroundColor: "#D4C9B8" }}
          />

          <motion.p
            variants={fadeUp}
            className="font-display text-[clamp(1.2rem,3vw,2rem)] italic font-light text-dark-muted tracking-wide mb-3"
          >
            Udon &amp; Tempura
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-body text-sm text-warm-gray tracking-wide max-w-sm mb-10"
          >
            Handcrafted noodles. From-scratch broths. Always fresh.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://order.mealkeyway.com/merchant/41456f38576537682f514e7074536b36506e503552673d3d/main"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-body text-xs tracking-[0.25em] uppercase px-8 py-4 bg-accent text-cream hover:bg-accent-light transition-colors duration-300"
            >
              Order Online
            </a>
            <a
              href="#menu"
              className="inline-block font-body text-xs tracking-[0.25em] uppercase px-8 py-4 border border-dark text-dark hover:bg-dark hover:text-cream transition-all duration-300"
            >
              View Menu
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Right — single clean photo, no overlays */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="lg:w-[55%] relative min-h-[50vh] lg:min-h-screen"
      >
        <Image
          src={HERO_PHOTO}
          alt="Ippinn udon bowl"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          unoptimized
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #F8F3EA 0%, transparent 12%)" }}
        />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-8 lg:left-20 flex items-center gap-3"
      >
        <motion.div
          animate={{ x: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="h-px w-8"
          style={{ background: "linear-gradient(to right, #7D7268, transparent)" }}
        />
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-warm-gray">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
