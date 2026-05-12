"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: "easeOut" as const } },
});

const pillars = [
  {
    jp: "手打ち",
    en: "Handmade",
    desc: "Noodles are made in-house and cooked to order — never pre-cooked or reheated.",
  },
  {
    jp: "出汁",
    en: "From Scratch",
    desc: "Every broth and sauce is made from scratch. No shortcuts. No concentrates.",
  },
  {
    jp: "新鮮",
    en: "Ultra Fresh",
    desc: "Toppings are sourced fresh daily. If it's on your bowl, it belongs there today.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.p
              {...fadeUp(0)}
              animate={inView ? fadeUp(0).animate : fadeUp(0).initial}
              className="font-body text-xs tracking-[0.4em] uppercase text-warm-gray mb-5"
            >
              Our Story
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              animate={inView ? fadeUp(0.1).animate : fadeUp(0.1).initial}
              className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight text-dark mb-8"
            >
              Noodle craft,<br />
              <span className="italic">at your pace.</span>
            </motion.h2>
            <motion.p
              {...fadeUp(0.2)}
              animate={inView ? fadeUp(0.2).animate : fadeUp(0.2).initial}
              className="font-body text-sm leading-relaxed text-dark-muted max-w-md"
            >
              Ippinn sits just across the street from Santa Rosa Junior College — and
              we've always believed great Japanese food shouldn't require a special
              occasion or an empty wallet. Our fast-casual counter keeps things
              efficient, but everything that lands in your bowl is made the slow,
              proper way.
            </motion.p>
            <motion.p
              {...fadeUp(0.3)}
              animate={inView ? fadeUp(0.3).animate : fadeUp(0.3).initial}
              className="font-body text-sm leading-relaxed text-dark-muted max-w-md mt-4"
            >
              The space is warm and minimal — blonde wood, shoji lighting, izakaya
              curtains — a place that feels like a breath out.
            </motion.p>
          </div>

          {/* Pillars */}
          <div className="flex flex-col gap-0 border-l border-border">
            {pillars.map((p, i) => (
              <motion.div
                key={p.en}
                {...fadeUp(0.2 + i * 0.1)}
                animate={
                  inView
                    ? fadeUp(0.2 + i * 0.1).animate
                    : fadeUp(0.2 + i * 0.1).initial
                }
                className="flex items-start gap-6 px-8 py-8 border-b border-border last:border-b-0"
              >
                <span
                  className="font-display text-3xl text-accent opacity-70 shrink-0 leading-none pt-1"
                >
                  {p.jp}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium text-dark mb-1">
                    {p.en}
                  </h3>
                  <p className="font-body text-sm text-warm-gray leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
