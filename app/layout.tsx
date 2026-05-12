import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Ippinn Udon & Tempura — Santa Rosa, CA",
  description:
    "Handcrafted udon, tempura, and ramen in Santa Rosa. Noodles made in-house, broths from scratch, and always fresh. Student-friendly prices.",
  openGraph: {
    title: "Ippinn Udon & Tempura",
    description: "Handcrafted udon & tempura in Santa Rosa, CA",
    url: "https://ippinnllc.com",
    siteName: "Ippinn Udon & Tempura",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body className="bg-cream text-dark antialiased">{children}</body>
    </html>
  );
}
