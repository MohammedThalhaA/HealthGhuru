import React from "react";
import { cn } from "@/lib/utils";

const DoubleLeaf = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 22V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 14C12 14 9.5 7 4 6C4 12 8 16 12 16Z" fill="inherit" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M12 16C12 16 15 10 20 9C20 15 16 19.5 12 20Z" fill="inherit" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

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
        <DoubleLeaf size={24} className={cn(light ? "text-white fill-white/20" : "text-primary fill-primary/20")} />
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
