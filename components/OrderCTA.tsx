"use client";

import { motion } from "framer-motion";

const platforms = [
  {
    label: "Order Direct",
    sub: "Pickup & Delivery",
    href: "https://order.mealkeyway.com/merchant/41456f38576537682f514e7074536b36506e503552673d3d/main",
    primary: true,
  },
  {
    label: "Uber Eats",
    sub: "Delivery",
    href: "https://www.ubereats.com/store/ippinn-udon/ijgfUR1LVi22D7WIHnfR3A",
    primary: false,
  },
  {
    label: "DoorDash",
    sub: "Delivery",
    href: "https://www.doordash.com/en/store/ippinn-udon-&-tempura-santa-rosa-539147/",
    primary: false,
  },
];

const vp = { once: true, amount: 0 as const };

export default function OrderCTA() {
  return (
    <section className="py-32 px-6 text-center overflow-hidden relative" style={{ backgroundColor: "#1C1814" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ border: "1px solid #F8F3EA" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ border: "1px solid #F8F3EA" }} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={vp}
          className="font-body text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: "#9B2335" }}
        >
          Ready to eat?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }} viewport={vp}
          className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-tight mb-8"
          style={{ color: "#F8F3EA" }}
        >
          Pickup &amp; delivery,<br />
          <span className="italic">on your schedule.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }} viewport={vp}
          className="font-body text-sm leading-relaxed mb-12"
          style={{ color: "#C4B8AB" }}  // ← was #7D7268, now readable on dark
        >
          Order direct for pickup, or get it delivered via your favourite platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }} viewport={vp}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          {platforms.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1 px-8 py-4 border transition-all duration-300 hover:bg-[#2A2520]"
              style={{ borderColor: p.primary ? "#F8F3EA" : "#5A4F47" }}
            >
              <span
                className="font-body text-xs tracking-[0.25em] uppercase"
                style={{ color: "#F8F3EA" }}  // ← all labels white now
              >
                {p.label}
              </span>
              <span
                className="font-body text-[10px] tracking-wider"
                style={{ color: "#A09080" }}  // ← was #3D3530, now readable
              >
                {p.sub}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
