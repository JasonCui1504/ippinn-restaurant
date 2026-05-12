"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  {
    jp: "うどん",
    en: "Udon",
    desc: "Hand-cut wheat noodles in a delicate dashi broth. Choose from classic kake, beef, curry, or seasonal specials.",
    icon: "○",
  },
  {
    jp: "ラーメン",
    en: "Ramen",
    desc: "Rich, slow-simmered ramen broths with springy noodles and carefully chosen toppings.",
    icon: "○",
  },
  {
    jp: "天ぷら",
    en: "Tempura",
    desc: "Crispy, light-battered seasonal vegetables and seafood, fried to order.",
    icon: "○",
  },
  {
    jp: "ご飯",
    en: "Rice Bowls",
    desc: "Fried rice and donburi-style bowls, made fresh with Japanese seasonings.",
    icon: "○",
  },
  {
    jp: "おつまみ",
    en: "Sides",
    desc: "Potstickers, edamame, and rotating small plates to round out your meal.",
    icon: "○",
  },
  {
    jp: "お飲み物",
    en: "Drinks",
    desc: "Japanese soft drinks, hot green tea, and seasonal beverages.",
    icon: "○",
  },
];

export default function MenuSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="menu" ref={ref} className="py-28 px-6" style={{ backgroundColor: "#EDE7DB" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-body text-xs tracking-[0.4em] uppercase text-warm-gray mb-4"
          >
            What We Serve
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light text-dark"
          >
            The Menu
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="origin-center mx-auto mt-5"
            style={{ height: "1px", width: "5rem", backgroundColor: "#D4C9B8" }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-sm text-warm-gray mt-5 max-w-md mx-auto"
          >
            Full menu with photos coming soon. Walk in or order online to see today's offerings.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.en}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: "easeOut" as const }}
              className="bg-cream p-10 group hover:bg-dark transition-colors duration-500 cursor-default"
            >
              <p className="font-display text-4xl text-accent opacity-50 group-hover:opacity-80 mb-4 transition-opacity duration-500">
                {cat.jp}
              </p>
              <h3 className="font-display text-2xl font-medium text-dark group-hover:text-cream mb-2 transition-colors duration-500">
                {cat.en}
              </h3>
              <div
                className="mb-4 transition-colors duration-500"
                style={{ height: "1px", width: "2rem", backgroundColor: "#D4C9B8" }}
              />
              <p className="font-body text-sm text-warm-gray group-hover:text-cream/70 leading-relaxed transition-colors duration-500">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://order.mealkey.com/ippinn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body text-xs tracking-[0.25em] uppercase px-8 py-4 bg-accent text-cream hover:bg-accent-light transition-colors duration-300"
          >
            Order Online
          </a>
        </motion.div>
      </div>
    </section>
  );
}
