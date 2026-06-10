import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ThreePillars from "@/components/home/ThreePillars";
import ScienceSection from "@/components/home/ScienceSection";
import FoodCategories from "@/components/home/FoodCategories";
import ExerciseSpotlight from "@/components/home/ExerciseSpotlight";
import NewsletterCTA from "@/components/home/NewsletterCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ThreePillars />
      <ScienceSection />
      <FoodCategories />
      <ExerciseSpotlight />
      <NewsletterCTA />
    </>
  );
}
