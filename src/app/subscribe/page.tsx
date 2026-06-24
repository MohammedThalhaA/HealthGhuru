import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import SubscribeForm from "@/components/forms/SubscribeForm";

import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Subscribe | HealthGhuru",
  description: "Start your wellness journey with personalized health content and expert tips.",
};

export default function SubscribePage() {
  return (
    <div className="min-h-screen md:h-screen flex flex-col md:flex-row md:overflow-hidden">
      
      {/* Left Panel - Visual */}
      <div className="w-full md:w-1/2 bg-gradient-dark relative min-h-[40vh] md:min-h-0 md:h-full hidden sm:block">
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
      <div className="w-full md:w-1/2 bg-white flex flex-col py-12 px-4 sm:px-8 md:px-16 min-h-screen md:min-h-0 md:h-full md:overflow-y-auto relative hide-scrollbar">
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
          <Link href="/" className="text-text-secondary hover:text-dark transition-colors flex items-center gap-2 font-medium text-sm bg-white/80 backdrop-blur px-3 py-2 rounded-full md:bg-transparent md:px-0 md:py-0">
            <ArrowLeft size={16} /> Back to Website
          </Link>
        </div>
        <ScrollReveal variant="fadeIn" className="w-full max-w-lg mx-auto my-auto pt-16 md:pt-6 pb-8">
          
          <div className="flex justify-center mb-6">
            <Link href="/" className="transition-transform hover:scale-105">
              <div className="relative w-36 h-14">
                <Image
                  src="/images/logo_transparent.png"
                  alt="HealthGhuru Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="text-center mb-6">
            <h2 className="form-card-heading font-display text-2xl md:text-3xl text-dark mb-2">Start Your Wellness Journey</h2>
            <p className="form-card-subtitle text-text-secondary text-sm md:text-base">
              Get personalized health content, expert tips, and exclusive resources.
            </p>
          </div>

          <SubscribeForm />

        </ScrollReveal>
      </div>

    </div>
  );
}
