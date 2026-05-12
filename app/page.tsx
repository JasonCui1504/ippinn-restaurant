import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuSection from "@/components/MenuSection";
import HoursLocation from "@/components/HoursLocation";
import OrderCTA from "@/components/OrderCTA";
import FeaturedSection from "@/components/FeaturedSection";
import ReviewsSection from "@/components/ReviewsSection";
import InkBrushReveal from "@/components/InkBrushReveal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <InkBrushReveal />
        <About />
        <MenuSection />
        <FeaturedSection />
        <ReviewsSection />
        <HoursLocation />
        <OrderCTA />
      </main>
      <Footer />
    </>
  );
}
