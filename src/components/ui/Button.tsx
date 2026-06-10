"use client";

import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-heading font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
    
    const variants = {
      primary: "bg-gradient-primary text-white shadow-[var(--btn-primary-shadow)] hover:-translate-y-[2px] active:translate-y-[2px] active:shadow-none rounded-full",
      secondary: "bg-white border-2 border-primary text-primary hover:-translate-y-[2px] active:translate-y-[2px] rounded-full",
      ghost: "bg-transparent border border-primary text-primary hover:-translate-y-[2px] active:translate-y-[2px] rounded-full",
      accent: "bg-gradient-accent text-dark shadow-md hover:-translate-y-[2px] active:translate-y-[2px] active:shadow-none rounded-full",
    };
    
    const sizes = {
      sm: "text-sm px-4 py-2",
      md: "text-base px-6 py-3",
      lg: "text-lg px-8 py-4",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
