import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import LoginForm from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login | HealthGhuru",
  description: "Sign in to your HealthGhuru account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <ScrollReveal variant="scaleUp" className="w-full max-w-[440px]">
        <div className="bg-white rounded-[20px] shadow-2xl border border-primary/10 p-8 sm:p-10 relative overflow-hidden">
          
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-primary" />

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="transition-transform hover:scale-105">
              <div className="relative w-48 h-20">
                <Image
                  src="/images/logo_transparent.png"
                  alt="HealthGhuru Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="font-display text-3xl text-dark mb-2">Welcome Back</h2>
            <p className="text-text-secondary text-sm">Sign in to your HealthGhuru account</p>
          </div>

          <LoginForm />

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-text-muted font-medium uppercase tracking-wider">or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <span className="text-sm text-text-secondary">Don&apos;t have an account? </span>
              <Link href="/subscribe" className="text-sm text-primary font-bold hover:underline">
                Subscribe &rarr;
              </Link>
            </div>
          </div>

        </div>
      </ScrollReveal>
    </div>
  );
}
