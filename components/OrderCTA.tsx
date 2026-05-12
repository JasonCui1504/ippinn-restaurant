"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function OrderCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="py-32 px-6 text-center overflow-hidden relative"
      style={{ backgroundColor: "#1C1814" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ border: "1px solid #F8F3EA" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{ border: "1px solid #F8F3EA" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-body text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: "#9B2335" }}
        >
          Ready to eat?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-tight mb-8"
          style={{ color: "#F8F3EA" }}
        >
          Pickup &amp; delivery,<br />
          <span className="italic">on your schedule.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-body text-sm leading-relaxed mb-10"
          style={{ color: "#7D7268" }}
        >
          Order online for pickup or delivery. Fresh, made-to-order, and
          ready when you are.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          href="https://order.mealkey.com/ippinn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-body text-xs tracking-[0.3em] uppercase px-10 py-4 border transition-all duration-300"
          style={{
            borderColor: "#F8F3EA",
            color: "#F8F3EA",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#F8F3EA";
            (e.currentTarget as HTMLElement).style.color = "#1C1814";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#F8F3EA";
          }}
        >
          Order Now
        </motion.a>
      </div>
    </section>
  );
}
