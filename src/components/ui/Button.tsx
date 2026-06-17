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
    const baseStyles = "inline-flex items-center justify-center font-heading font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl cursor-pointer";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
      secondary: "bg-white border-2 border-primary text-primary hover:bg-surface hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
      ghost: "bg-transparent text-primary hover:bg-primary/5 active:bg-primary/10",
      accent: "bg-accent text-white hover:bg-accent-light hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
    };
    
    const sizes = {
      sm: "text-sm px-4 py-2",
      md: "text-base px-6 py-2.5",
      lg: "text-lg px-8 py-3.5",
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
