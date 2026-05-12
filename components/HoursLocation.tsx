"use client";

import { motion } from "framer-motion";

const hours = [
  { days: "Sunday – Thursday", time: "11:00 AM – 8:30 PM" },
  { days: "Friday – Saturday", time: "11:00 AM – 9:00 PM" },
];

export default function HoursLocation() {
  return (
    <section id="hours" className="py-28 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0 }}
          >
            <p className="font-body text-xs tracking-[0.4em] uppercase text-warm-gray mb-5">Hours</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-dark mb-10">
              When to find us
            </h2>

            <div className="flex flex-col gap-0 border-t border-border">
              {hours.map((h) => (
                <div key={h.days} className="flex justify-between items-baseline py-5 border-b border-border">
                  <span className="font-body text-sm text-dark-muted">{h.days}</span>
                  <span className="font-display text-lg text-dark font-medium">{h.time}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-warm-gray mb-3">Contact</p>
              <a href="tel:+17075219911" className="font-display text-2xl text-dark hover:text-accent transition-colors duration-200">
                (707) 521-9911
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0 }}
          >
            <p className="font-body text-xs tracking-[0.4em] uppercase text-warm-gray mb-5">Location</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-dark mb-10">
              Come visit us
            </h2>

            <div className="mb-8">
              <p className="font-display text-xl text-dark mb-1">1880 Mendocino Ave</p>
              <p className="font-display text-xl text-dark-muted">Santa Rosa, CA 95401</p>
            </div>

            <p className="font-body text-sm text-warm-gray leading-relaxed mb-8">
              Right across the street from Santa Rosa Junior College —
              easy to find, easy to park, easy to love.
            </p>

            <a
              href="https://maps.google.com/?q=1880+Mendocino+Ave,+Santa+Rosa,+CA+95401"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-xs tracking-[0.3em] uppercase text-dark border-b border-dark pb-0.5 hover:text-accent hover:border-accent transition-colors duration-200"
            >
              Get Directions
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <div className="mt-8 overflow-hidden border border-border" style={{ height: "220px" }}>
              <iframe
                src="https://maps.google.com/maps?q=1880+Mendocino+Ave,+Santa+Rosa,+CA+95401&output=embed&z=15"
                width="100%"
                height="220"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ippinn location map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
