"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface LibraryFilterBarProps {
  activeFilter: string;
  onChange: (filter: string) => void;
}

const FILTERS = ['For You', 'Saved', 'Nutrition', 'Fitness', 'Sleep', 'Mental Health'];

export function LibraryFilterBar({ activeFilter, onChange }: LibraryFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
      {FILTERS.map(filter => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          data-cursor="tab"
          className={cn(
            "px-5 py-2 rounded-full text-sm font-heading font-semibold transition-colors border",
            activeFilter === filter
              ? "bg-[#F9A825] text-dark border-[#F9A825] shadow-sm"
              : "bg-white text-text-secondary border-border hover:border-primary/40 hover:bg-surface-alt"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
