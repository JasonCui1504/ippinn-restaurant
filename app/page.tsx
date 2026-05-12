import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuSection from "@/components/MenuSection";
import HoursLocation from "@/components/HoursLocation";
import OrderCTA from "@/components/OrderCTA";
import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <FeaturedSection />
        <HoursLocation />
        <OrderCTA />
      </main>
      <Footer />
    </>
  );
}
