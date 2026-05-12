"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const menuImages = [
  { src: "/6cc01090-3d46-4766-9a64-c79a03caccb1.png", label: "Udon, Ramen & Rice Bowls" },
  { src: "/c6f4942d-f2b3-4d16-a964-887e2d9bf06d.png", label: "Tempura, Sides & Appetizers" },
];

const galleryPhotos = [
  "https://website-cdn.menusifu.com/wp-content/uploads/ippinnllc.com/2023/04/微信图片_20230413172828.jpg",
  "https://website-cdn.menusifu.com/wp-content/uploads/ippinnllc.com/2023/04/微信图片_20230413172826.png",
  "https://website-cdn.menusifu.com/wp-content/uploads/ippinnllc.com/2023/04/微信图片_20230413172824.png",
  "https://website-cdn.menusifu.com/wp-content/uploads/ippinnllc.com/2023/04/微信图片_20230413172822.png",
  "https://website-cdn.menusifu.com/wp-content/uploads/ippinnllc.com/2023/04/微信图片_20230413172819.png",
  "https://website-cdn.menusifu.com/wp-content/uploads/ippinnllc.com/2023/04/微信图片_20230413172811.png",
];

const vp = { once: true, amount: 0 as const };

export default function MenuSection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <section id="menu" className="py-28 px-6" style={{ backgroundColor: "#EDE7DB" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }} viewport={vp}
              className="font-body text-xs tracking-[0.4em] uppercase text-warm-gray mb-4"
            >
              What We Serve
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }} viewport={vp}
              className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light text-dark"
            >
              The Menu
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }} viewport={vp}
              className="origin-center mx-auto mt-5"
              style={{ height: "1px", width: "5rem", backgroundColor: "#D4C9B8" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {menuImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }} viewport={vp}
                className="group cursor-zoom-in"
                onClick={() => setLightbox(img.src)}
              >
                <div className="relative overflow-hidden border border-border bg-cream">
                  <Image
                    src={img.src} alt={img.label}
                    width={900} height={650}
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div
                    className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(28,24,20,0.5), transparent)" }}
                  >
                    <span className="font-body text-xs tracking-[0.25em] uppercase text-cream">
                      {img.label} — click to enlarge
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }} viewport={vp}
            className="text-center"
          >
            <a
              href="https://order.mealkeyway.com/merchant/41456f38576537682f514e7074536b36506e503552673d3d/main"
              target="_blank" rel="noopener noreferrer"
              className="inline-block font-body text-xs tracking-[0.25em] uppercase px-8 py-4 bg-accent text-cream hover:bg-accent-light transition-colors duration-300"
            >
              Order Online
            </a>
          </motion.div>
        </div>
      </section>

      {/* Kitchen gallery */}
      <section className="py-20 px-6 bg-cream overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }} viewport={vp}
            className="font-body text-xs tracking-[0.4em] uppercase text-warm-gray mb-10 text-center"
          >
            From the Kitchen
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryPhotos.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.06 }} viewport={vp}
                className="relative aspect-square overflow-hidden cursor-zoom-in group"
                onClick={() => setLightbox(src)}
              >
                <Image
                  src={src} alt={`Ippinn dish ${i + 1}`} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw" unoptimized
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
          style={{ backgroundColor: "rgba(28,24,20,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }} animate={{ scale: 1 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox} alt="Enlarged view"
              width={1200} height={900}
              className="w-full h-auto max-h-[85vh] object-contain" unoptimized
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 font-body text-xs tracking-widest uppercase text-cream/70 hover:text-cream transition-colors"
            >
              Close ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
