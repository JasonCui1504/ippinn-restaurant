"use client";

import { motion } from "framer-motion";
import OrderButton from "./OrderButton";

const vp = { once: true, amount: 0 as const };

export default function OrderCTA() {
  return (
    <section id="order" className="py-32 px-6 text-center overflow-hidden relative" style={{ backgroundColor: "#1C1814" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ border: "1px solid #F8F3EA" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ border: "1px solid #F8F3EA" }} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={vp}
          className="font-body text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: "#C9A96E" }}
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
          style={{ color: "#C4B8AB" }}
        >
          Order direct, via Uber Eats, or via DoorDash — choose what works for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }} viewport={vp}
        >
          <OrderButton className="font-body text-xs tracking-[0.3em] uppercase px-10 py-4 border border-[#F8F3EA] text-[#F8F3EA] hover:bg-[#F8F3EA] hover:text-[#1C1814] transition-all duration-300" />
        </motion.div>
      </div>
    </section>
  );
}
