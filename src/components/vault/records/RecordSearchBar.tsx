"use client";

import React from 'react';
import { Search } from 'lucide-react';

interface RecordSearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function RecordSearchBar({ value, onChange }: RecordSearchBarProps) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search records..." 
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        style={{ fontSize: '16px' }}
      />
    </div>
  );
}
