import { signIn } from '@/lib/auth/auth.config';
import { AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import { redirect } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const errorMessage = searchParams.error ? 'Invalid credentials.' : '';

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <Link href="/login" className="text-text-secondary hover:text-dark transition-colors flex items-center gap-2 font-medium text-sm">
          <ArrowLeft size={16} /> Back to User Login
        </Link>
      </div>
      
      <ScrollReveal variant="scaleUp" className="w-full max-w-[440px]">
        <div className="bg-white rounded-[20px] shadow-2xl border border-primary/10 p-8 sm:p-10 relative overflow-hidden">
          
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-accent" />

          {/* Logo */}
          <div className="flex justify-center mb-6">
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
            <div className="flex justify-center mb-3">
              <div className="bg-accent/10 p-3 rounded-full text-accent">
                <Shield size={24} />
              </div>
            </div>
            <h2 className="font-display text-3xl text-dark mb-2">Admin Portal</h2>
            <p className="text-text-secondary text-sm">Sign in to manage HealthGhuru</p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm border border-red-100">
              <AlertCircle size={16} className="shrink-0" />
              {errorMessage}
            </div>
          )}

          <form
            action={async (formData) => {
              'use server';
              try {
                const data = Object.fromEntries(formData);
                await signIn('credentials', { ...data, redirectTo: '/admin' });
              } catch (error: any) {
                if (error.type === 'CredentialsSignin') {
                  redirect('/admin/login?error=CredentialsSignin');
                }
                throw error;
              }
            }}
            className="space-y-5"
          >
            <div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder=" "
                  className="block w-full px-4 pt-6 pb-2 text-dark bg-surface-alt border border-transparent rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-accent peer"
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-text-muted duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-medium"
                >
                  Admin Email
                </label>
              </div>
            </div>
            
            <div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder=" "
                  className="block w-full px-4 pt-6 pb-2 text-dark bg-surface-alt border border-transparent rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-accent peer"
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-text-muted duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-medium"
                >
                  Password
                </label>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary"
              size="lg"
              className="w-full mt-2 relative"
            >
              Access Dashboard
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-xs text-text-muted uppercase tracking-wider font-semibold">
              Restricted Area
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
