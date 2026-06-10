import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import SubscribeForm from "@/components/forms/SubscribeForm";

export const metadata: Metadata = {
  title: "Subscribe | HealthGhuru",
  description: "Start your wellness journey with personalized health content and expert tips.",
};

export default function SubscribePage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      
      {/* Left Panel - Visual */}
      <div className="w-full md:w-1/2 bg-gradient-dark relative min-h-[40vh] md:min-h-screen hidden sm:block">
        <Image
          src="/images/nutrition_pillar.png"
          alt="Wellness Lifestyle"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <ScrollReveal variant="fadeUp">
            <blockquote className="border-l-4 border-accent pl-6 mb-8">
              <p className="font-display text-3xl md:text-4xl text-white leading-tight">
                &quot;Your health is an investment, not an expense.&quot;
              </p>
            </blockquote>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-5 py-3 border border-white/20">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-dark bg-gray-300 overflow-hidden relative"><Image src="/images/fitness_pillar.png" alt="User" fill className="object-cover"/></div>
                <div className="w-8 h-8 rounded-full border-2 border-dark bg-gray-400 overflow-hidden relative"><Image src="/images/mental_health_pillar.png" alt="User" fill className="object-cover"/></div>
                <div className="w-8 h-8 rounded-full border-2 border-dark bg-primary flex items-center justify-center text-xs text-white font-bold">+</div>
              </div>
              <span className="text-white text-sm font-medium">Join 5,000+ health enthusiasts</span>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center py-16 px-4 sm:px-8 md:px-16 min-h-screen">
        <ScrollReveal variant="fadeIn" className="w-full max-w-lg mx-auto">
          
          <div className="flex justify-center mb-10">
            <Link href="/">
              <div className="bg-surface-alt rounded-lg p-2 flex items-center justify-center border border-primary/10">
                <div className="relative w-36 h-12">
                  <Image
                    src="/images/logo.png"
                    alt="HealthGhuru Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-dark mb-3">Start Your Wellness Journey</h2>
            <p className="text-text-secondary">
              Get personalized health content, expert tips, and exclusive resources.
            </p>
          </div>

          <SubscribeForm />

        </ScrollReveal>
      </div>

    </div>
  );
}
