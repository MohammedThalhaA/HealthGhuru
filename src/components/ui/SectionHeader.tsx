import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col", centered ? "items-center text-center" : "items-start", className)}>
      {eyebrow && (
        <span className={cn(
          "font-heading text-sm font-bold uppercase tracking-widest mb-3",
          light ? "text-primary-light" : "text-primary"
        )}>
          {eyebrow}
        </span>
      )}
      
      <h2 className={cn(
        "font-display text-h2 mb-4",
        light ? "text-white" : "text-dark"
      )}>
        {title}
      </h2>
      
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className={cn("h-[1px] w-12", light ? "bg-white/20" : "bg-primary/20")} />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="var(--color-accent)"/>
        </svg>
        <div className={cn("h-[1px] w-12", light ? "bg-white/20" : "bg-primary/20")} />
      </div>

      {subtitle && (
        <p className={cn(
          "font-body max-w-2xl text-lg",
          light ? "text-white/80" : "text-text-secondary"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
