"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

import { signIn } from "next-auth/react";
import { registerUser } from "@/lib/auth/actions/registerUser";
import { useToast } from '@/components/providers/ToastProvider';

const subscribeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  plan: z.enum(["free", "premium"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

export default function SubscribeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      plan: "free",
    },
  });

  const selectedPlan = watch("plan");

  const onSubmit = async (data: SubscribeFormValues) => {
    setIsLoading(true);
    
    try {
      // Register the user in the database
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        plan: data.plan,
        phone: data.phone,
      });

      setIsSuccess(true);
      
      // Auto redirect to vault by logging in
      setTimeout(async () => {
        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        
        if (result?.ok) {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/login';
        }
      }, 2000);
      
    } catch (e: Error | unknown) {
      console.error(e);
      // To show the error, we could set a root form error or use a toast
      toast.error(e instanceof Error ? e.message : "Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-bounce">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="font-display text-3xl text-dark">Welcome to HealthGhuru!</h3>
        <p className="text-text-secondary">
          Your wellness journey begins now. Taking you to your dashboard...
        </p>
        <Button onClick={() => signIn('credentials', { email: 'user@example.com', password: 'password123', callbackUrl: '/vault' })} variant="primary" className="mt-4 w-full">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-3">
        {/* Full Name Input */}
        <div>
          <div className="relative">
            <input
              {...register("name")}
              id="name"
              placeholder=" "
              className={`form-input block w-full px-4 pt-5 pb-1.5 text-dark bg-surface-alt border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary peer ${
                errors.name ? "border-red-500 focus:ring-red-500" : "border-transparent"
              }`}
            />
            <label
              htmlFor="name"
              className="form-label absolute text-sm text-text-muted duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-medium"
            >
              Full Name
            </label>
          </div>
          {errors.name && <p className="form-error-text mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email Input */}
        <div>
          <div className="relative">
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder=" "
              className={`form-input block w-full px-4 pt-5 pb-1.5 text-dark bg-surface-alt border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary peer ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-transparent"
              }`}
            />
            <label
              htmlFor="email"
              className="form-label absolute text-sm text-text-muted duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-medium"
            >
              Email Address
            </label>
          </div>
          {errors.email && <p className="form-error-text mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div>
          <div className="relative">
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder=" "
              className={`form-input block w-full px-4 pt-5 pb-1.5 text-dark bg-surface-alt border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary peer ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-transparent"
              }`}
            />
            <label
              htmlFor="password"
              className="form-label absolute text-sm text-text-muted duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-medium"
            >
              Password
            </label>
          </div>
          {errors.password && <p className="form-error-text mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        {/* Confirm Password Input */}
        <div>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              placeholder=" "
              className={`form-input block w-full px-4 pt-5 pb-1.5 text-dark bg-surface-alt border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary peer ${
                errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-transparent"
              }`}
            />
            <label
              htmlFor="confirmPassword"
              className="form-label absolute text-sm text-text-muted duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-medium"
            >
              Confirm Password
            </label>
          </div>
          {errors.confirmPassword && <p className="form-error-text mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
        </div>

        {/* Phone Input */}
        <div>
          <div className="relative">
            <input
              {...register("phone")}
              type="tel"
              id="phone"
              placeholder=" "
              className="form-input block w-full px-4 pt-5 pb-1.5 text-dark bg-surface-alt border border-transparent rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary peer"
            />
            <label
              htmlFor="phone"
              className="form-label absolute text-sm text-text-muted duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-medium"
            >
              Phone (Optional)
            </label>
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Free Plan */}
        <div
          onClick={() => setValue("plan", "free")}
          className={cn(
            "plan-selection-card relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
            selectedPlan === "free"
              ? "border-primary bg-primary/5 shadow-md"
              : "border-border bg-white hover:border-primary/40"
          )}
        >
          {selectedPlan === "free" && (
            <div className="absolute top-3 right-3 text-primary">
              <CheckCircle2 size={18} />
            </div>
          )}
          <h4 className="plan-card-title font-heading font-bold text-base text-dark mb-2">FREE</h4>
          <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary mb-3">
            <li className="plan-card-feature flex items-center gap-2"><CheckCircle2 size={14} className="text-primary/70" /> Weekly blog</li>
            <li className="plan-card-feature flex items-center gap-2"><CheckCircle2 size={14} className="text-primary/70" /> Basic tips</li>
          </ul>
          <div className="plan-card-price font-mono text-lg font-bold text-dark mt-auto">₹0<span className="text-xs font-body text-text-muted font-normal">/month</span></div>
        </div>

        {/* Premium Plan */}
        <div
          onClick={() => setValue("plan", "premium")}
          className={cn(
            "plan-selection-card relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
            selectedPlan === "premium"
              ? "border-accent bg-accent/5 shadow-md"
              : "border-border bg-white hover:border-accent/40"
          )}
        >
          {selectedPlan === "premium" && (
            <div className="absolute top-3 right-3 text-accent">
              <CheckCircle2 size={18} />
            </div>
          )}
          <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2">
            <span className="bg-dark text-accent text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Popular ★</span>
          </div>
          <h4 className="plan-card-title font-heading font-bold text-base text-dark mb-2">PREMIUM</h4>
          <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary mb-3">
            <li className="plan-card-feature flex items-center gap-2"><CheckCircle2 size={14} className="text-accent" /> Everything</li>
            <li className="plan-card-feature flex items-center gap-2"><CheckCircle2 size={14} className="text-accent" /> Personalized</li>
            <li className="plan-card-feature flex items-center gap-2"><CheckCircle2 size={14} className="text-accent" /> Expert Q&A</li>
          </ul>
          <div className="plan-card-price font-mono text-lg font-bold text-dark mt-auto">₹299<span className="text-xs font-body text-text-muted font-normal">/month</span></div>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full relative"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={20} />
            Processing...
          </>
        ) : (
          "Subscribe Now"
        )}
      </Button>

      <p className="text-center text-xs text-text-muted">
        By subscribing you agree to our{" "}
        <a href="#" className="underline hover:text-primary">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-primary">
          Terms of Service
        </a>.
      </p>
    </form>
  );
}
