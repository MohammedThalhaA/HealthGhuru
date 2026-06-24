"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Eye, EyeOff, CheckCircle2, User, Crown } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { signIn } from "next-auth/react";
import { checkUserStatus } from '@/lib/auth/checkStatus';
import { useToast } from '@/components/providers/ToastProvider';

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleDemoUser = async (type: 'free' | 'pro') => {
    setValue('email', type === 'free' ? 'user@example.com' : 'admin@healthghuru.com', { shouldValidate: true });
    setValue('password', 'password123', { shouldValidate: true });
    // Use handleSubmit to actually trigger the onSubmit flow
    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Pre-flight check for account status
      const status = await checkUserStatus(data.email);
      if (status === 'suspended') {
        toast.error("Your account has been suspended. Please contact support.");
        setIsLoading(false);
        return;
      }
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === 'suspended') {
          toast.error("Your account has been suspended. Please contact support.");
        } else {
          toast.error("Invalid credentials. Please check your email and password.");
        }
        setIsLoading(false);
      } else {
        setIsSuccess(true);
        // Automatically redirect to dashboard
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-bounce">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-heading text-xl font-bold text-dark">Login Successful!</h3>
        <p className="text-text-secondary text-sm">Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      
      {/* Demo Users */}
      <div className="flex gap-3 mb-6">
        <button
          type="button"
          onClick={() => handleDemoUser('free')}
          className="flex-1 flex flex-col items-center justify-center py-2 px-3 border border-border rounded-xl bg-surface hover:border-primary/50 hover:bg-primary/5 transition-colors group"
        >
          <User size={18} className="text-text-muted group-hover:text-primary mb-1" />
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider group-hover:text-primary">Demo Free</span>
        </button>
        <button
          type="button"
          onClick={() => handleDemoUser('pro')}
          className="flex-1 flex flex-col items-center justify-center py-2 px-3 border border-accent/20 rounded-xl bg-accent/5 hover:border-accent hover:bg-accent/10 transition-colors group"
        >
          <Crown size={18} className="text-accent/70 group-hover:text-accent mb-1" />
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider group-hover:text-accent">Demo Pro</span>
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <a href="/admin/login" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider flex items-center gap-1">
          Access Admin Portal &rarr;
        </a>
      </div>

      {/* Email Input */}
      <div>
        <div className="relative">
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder=" "
            className={`form-input block w-full px-4 pt-6 pb-2 text-dark bg-surface-alt border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary peer ${
              errors.email ? "border-red-500 focus:ring-red-500" : "border-transparent"
            }`}
          />
          <label
            htmlFor="email"
            className="form-label absolute text-sm text-text-muted duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-medium"
          >
            Email Address
          </label>
        </div>
        {errors.email && (
          <p className="form-error-text mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder=" "
            className={`form-input block w-full px-4 pt-6 pb-2 text-dark bg-surface-alt border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary peer ${
              errors.password ? "border-red-500 focus:ring-red-500" : "border-transparent"
            }`}
          />
          <label
            htmlFor="password"
            className="form-label absolute text-sm text-text-muted duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-medium"
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-dark transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="form-error-text mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end">
        <a href="#" className="text-sm text-primary font-medium hover:underline">
          Forgot Password?
        </a>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full mt-2 relative"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={20} />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
