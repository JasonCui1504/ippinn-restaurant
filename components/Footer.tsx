"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 px-6" style={{ backgroundColor: "#1C1814" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12" style={{ borderBottom: "1px solid #3D3530" }}>
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="Ippinn logo"
              width={100}
              height={50}
              className="mb-3"
              style={{ filter: "invert(1)", mixBlendMode: "screen", opacity: 0.85 }}
            />
            <p className="font-body text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#7D7268" }}>
              Ippinn Udon &amp; Tempura
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: "#7D7268" }}>
              Handcrafted Japanese noodles in the heart of Santa Rosa.
            </p>
          </div>

          {/* Visit */}
          <div>
            <p className="font-body text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "#9B2335" }}>
              Visit
            </p>
            <p className="font-body text-sm mb-1" style={{ color: "#EDE7DB" }}>
              1880 Mendocino Ave
            </p>
            <p className="font-body text-sm mb-4" style={{ color: "#7D7268" }}>
              Santa Rosa, CA 95401
            </p>
            <a
              href="tel:+17075219911"
              className="font-body text-sm transition-colors duration-200"
              style={{ color: "#7D7268" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#EDE7DB")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#7D7268")}
            >
              (707) 521-9911
            </a>
          </div>

          {/* Hours */}
          <div>
            <p className="font-body text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "#9B2335" }}>
              Hours
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between gap-4">
                <span className="font-body text-sm" style={{ color: "#7D7268" }}>Sun – Thu</span>
                <span className="font-body text-sm" style={{ color: "#EDE7DB" }}>11am – 8:30pm</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-body text-sm" style={{ color: "#7D7268" }}>Fri – Sat</span>
                <span className="font-body text-sm" style={{ color: "#EDE7DB" }}>11am – 9:00pm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs" style={{ color: "#3D3530" }}>
            © {new Date().getFullYear()} Ippinn LLC. All rights reserved.
          </p>
          <a
            href="https://order.mealkeyway.com/merchant/41456f38576537682f514e7074536b36506e503552673d3d/main"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs tracking-[0.25em] uppercase transition-colors duration-200"
            style={{ color: "#7D7268" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#EDE7DB")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#7D7268")}
          >
            Order Online →
          </a>
        </div>
      </div>
    </footer>
  );
}
