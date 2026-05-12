"use client";

import { motion } from "framer-motion";

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const fadeLine = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1, transition: { duration: 1, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #EDE7DB 0%, #F8F3EA 60%, #F0E8DA 100%)",
        }}
      />

      {/* Decorative circles */}
      <div
        className="absolute top-24 right-16 w-64 h-64 rounded-full opacity-[0.06]"
        style={{ border: "1px solid #1C1814" }}
      />
      <div
        className="absolute top-32 right-24 w-44 h-44 rounded-full opacity-[0.05]"
        style={{ border: "1px solid #1C1814" }}
      />
      <div
        className="absolute bottom-20 left-12 w-80 h-80 rounded-full opacity-[0.04]"
        style={{ border: "1px solid #1C1814" }}
      />

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.p
          variants={fadeUp}
          className="font-body text-xs tracking-[0.4em] uppercase text-warm-gray mb-8"
        >
          Santa Rosa, California
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display font-light text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] tracking-tight text-dark mb-4"
        >
          Ippinn
        </motion.h1>

        <motion.div variants={fadeLine} className="origin-center mx-auto mb-6" style={{ height: "1px", width: "8rem", backgroundColor: "#D4C9B8" }} />

        <motion.p
          variants={fadeUp}
          className="font-display text-[clamp(1.2rem,3vw,2rem)] italic font-light text-dark-muted tracking-wide mb-3"
        >
          Udon &amp; Tempura
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-body text-sm text-warm-gray tracking-wide max-w-sm mx-auto mb-12"
        >
          Handcrafted noodles. From-scratch broths. Always fresh.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://order.mealkey.com/ippinn"
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

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-warm-gray">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, #7D7268, transparent)" }}
        />
      </motion.div>
    </section>
  );
}
