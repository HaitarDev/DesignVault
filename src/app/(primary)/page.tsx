import HeroSection from "@/components/hero-section/hero-section";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-amber-50 ">
      <Navbar />
      <HeroSection />
    </div>
  );
}
