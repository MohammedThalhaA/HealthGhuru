"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
    
    // Simulate redirect
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
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
      {/* Email Input */}
      <div>
        <div className="relative">
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder=" "
            className={`block w-full px-4 pt-6 pb-2 text-dark bg-surface-alt border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary peer ${
              errors.email ? "border-red-500 focus:ring-red-500" : "border-transparent"
            }`}
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-text-muted duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-medium"
          >
            Email Address
          </label>
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
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
            className={`block w-full px-4 pt-6 pb-2 text-dark bg-surface-alt border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary peer ${
              errors.password ? "border-red-500 focus:ring-red-500" : "border-transparent"
            }`}
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-text-muted duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-medium"
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
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
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
