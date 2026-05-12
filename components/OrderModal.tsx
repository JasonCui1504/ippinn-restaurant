"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const platforms = [
  {
    label: "Order Direct",
    desc: "Pickup or delivery — best prices, no platform fees",
    href: "https://order.mealkeyway.com/merchant/41456f38576537682f514e7074536b36506e503552673d3d/main",
    primary: true,
  },
  {
    label: "Uber Eats",
    desc: "Delivery via Uber Eats",
    href: "https://www.ubereats.com/store/ippinn-udon/ijgfUR1LVi22D7WIHnfR3A",
    primary: false,
  },
  {
    label: "DoorDash",
    desc: "Delivery via DoorDash",
    href: "https://www.doordash.com/en/store/ippinn-udon-&-tempura-santa-rosa-539147/",
    primary: false,
  },
];

export default function OrderModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] flex items-center justify-center px-4"
        style={{ backgroundColor: "rgba(28,24,20,0.82)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      >
        <motion.div
          key="card"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-md"
          style={{ backgroundColor: "#F8F3EA" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 pt-8 pb-6" style={{ borderBottom: "1px solid #D4C9B8" }}>
            <div>
              <p className="font-body text-[10px] tracking-[0.35em] uppercase text-warm-gray mb-1">
                Ippinn Udon &amp; Tempura
              </p>
              <h2 className="font-display text-2xl font-light text-dark">
                How would you like to order?
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-warm-gray hover:text-dark transition-colors duration-200 ml-4 shrink-0"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Options */}
          <div className="flex flex-col">
            {platforms.map((p, i) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group flex items-center justify-between px-8 py-5 hover:bg-cream-dark transition-colors duration-200"
                style={{
                  borderBottom: i < platforms.length - 1 ? "1px solid #D4C9B8" : "none",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#EDE7DB")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-display text-lg text-dark">{p.label}</span>
                    {p.primary && (
                      <span className="font-body text-[9px] tracking-[0.2em] uppercase px-2 py-0.5" style={{ backgroundColor: "#9B2335", color: "#F8F3EA" }}>
                        Best Value
                      </span>
                    )}
                  </div>
                  <span className="font-body text-xs text-warm-gray">{p.desc}</span>
                </div>
                <svg
                  width="14" height="14" viewBox="0 0 12 12" fill="none"
                  className="shrink-0 ml-4 text-warm-gray transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="px-8 py-4" style={{ borderTop: "1px solid #D4C9B8" }}>
            <p className="font-body text-[10px] text-warm-gray text-center">
              (707) 521-9911 &nbsp;·&nbsp; 1880 Mendocino Ave, Santa Rosa, CA
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
