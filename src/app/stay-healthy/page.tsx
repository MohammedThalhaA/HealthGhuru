import { Metadata } from "next";
import StayHeroSection from "@/components/stay-healthy/StayHeroSection";
import SixTips from "@/components/stay-healthy/SixTips";
import ContentPillar from "@/components/stay-healthy/ContentPillar";
import FiveExercises from "@/components/stay-healthy/FiveExercises";
import SleepRisks from "@/components/stay-healthy/SleepRisks";
import HealthierLivesAccordion from "@/components/stay-healthy/HealthierLivesAccordion";
import MentalHealthEditorial from "@/components/stay-healthy/MentalHealthEditorial";

export const metadata: Metadata = {
  title: "Stay Healthy | HealthGhuru",
  description: "Evidence-based tips and strategies for Nutrition, Fitness, Mental Health, and Sleep.",
};

export default function StayHealthyPage() {
  return (
    <>
      <StayHeroSection />
      <SixTips />

      {/* Content Pillars */}
      <ContentPillar
        label="NUTRITION"
        title="Fuel Your Body Right"
        body="We provide nutrition strategies and ideas to help you achieve your objectives, whether you're trying to maintain, lose, or gain weight."
        bulletPoints={[
          "Eat more filling foods",
          "Plan meals in advance",
          "Find physical activities you enjoy",
          "Manage your stress",
          "Supplement your strategies"
        ]}
        imageUrl="/images/nutrition_pillar.png"
        imageAlt="Healthy Food"
        ctaText="Read Nutrition Articles →"
        ctaHref="/blog?category=Nutrition"
      />

      <ContentPillar
        label="FITNESS"
        title="Move Your Body, Change Your Life"
        body="Regular physical activity provides immediate and long-term health benefits and enhances overall quality of life."
        bulletPoints={[
          "Reduces the risk of diseases",
          "Improves mental health",
          "Increases muscle and bone health",
          "Increases energy levels",
          "Lowers excess weight"
        ]}
        imageUrl="/images/fitness_pillar.png"
        imageAlt="Fitness Workout"
        reversed
        ctaText="Explore Workouts →"
        ctaHref="/blog?category=Fitness"
        className="bg-surface-alt"
      />

      <ContentPillar
        label="MENTAL HEALTH"
        title="A Healthy Mind is Everything"
        body="Emotional, psychological, and social wellbeing all fall under the category of mental health. It influences our thoughts, feelings, and actions."
        bulletPoints={[
          "Value yourself",
          "Take care of your body",
          "Surround yourself with good people",
          "Learn how to deal with stress",
          "Avoid alcohol and other drugs",
          "Set realistic goals"
        ]}
        imageUrl="/images/mental_health_pillar.png"
        imageAlt="Mental Wellbeing"
        ctaText="Mental Health Guide →"
        ctaHref="/blog?category=Mental+Health"
      />

      <ContentPillar
        label="SLEEP"
        title="Rest is Not a Luxury"
        body="Good sleep is a very important aspect of our everyday life. Sleep affects our quality of life in many ways."
        bulletPoints={[
          "Lower your risk for serious health problems",
          "Reduce stress and improve your mood",
          "Get along better with people",
          "Stay at a healthy weight"
        ]}
        imageUrl="/images/sleep_pillar.png"
        imageAlt="Good Sleep"
        reversed
        ctaText="Improve Your Sleep →"
        ctaHref="/blog?category=Sleep"
        className="bg-surface-alt"
      />

      <HealthierLivesAccordion />
      <FiveExercises />
      <MentalHealthEditorial />
      <SleepRisks />
    </>
  );
}
