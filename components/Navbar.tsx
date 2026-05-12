"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Hours", href: "#hours" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#" className="flex flex-col leading-none">
          <span
            className="font-display text-2xl font-semibold tracking-wide"
            style={{ color: "#1C1814" }}
          >
            一品
          </span>
          <span
            className="font-display text-xs tracking-[0.25em] uppercase"
            style={{ color: "#7D7268" }}
          >
            Ippinn
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-sm tracking-widest uppercase text-warm-gray hover:text-dark transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://order.mealkey.com/ippinn"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm tracking-widest uppercase px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-cream transition-all duration-300"
          >
            Order Online
          </a>
        </nav>

        <button
          className="md:hidden text-dark p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-dark transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-px bg-dark transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px bg-dark transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-cream border-t border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-sm tracking-widest uppercase text-warm-gray hover:text-dark transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://order.mealkey.com/ippinn"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm tracking-widest uppercase px-5 py-2 border border-accent text-accent text-center hover:bg-accent hover:text-cream transition-all duration-300"
              >
                Order Online
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
