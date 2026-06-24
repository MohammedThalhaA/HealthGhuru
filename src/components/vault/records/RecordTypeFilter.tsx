"use client";

import React from 'react';
import { RecordType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface RecordTypeFilterProps {
  activeType: RecordType | 'all';
  onChange: (type: RecordType | 'all') => void;
}

const RECORD_TYPES: { value: RecordType | 'all', label: string }[] = [
  { value: 'all', label: 'All Records' },
  { value: 'lab_report', label: 'Lab Reports' },
  { value: 'prescription', label: 'Prescriptions' },
  { value: 'visit_note', label: 'Visit Notes' },
  { value: 'vaccination', label: 'Vaccinations' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'other', label: 'Other' },
];

export function RecordTypeFilter({ activeType, onChange }: RecordTypeFilterProps) {
  return (
    <div className="flex overflow-x-auto pb-2 -mx-3 px-3 md:mx-0 md:px-0 md:pb-0 hide-scrollbar">
      <div className="flex flex-nowrap md:flex-wrap gap-2 min-w-max">
      {RECORD_TYPES.map(type => (
        <button
          key={type.value}
          onClick={() => onChange(type.value)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-heading font-semibold transition-colors border",
            activeType === type.value
              ? "bg-[#F9A825] text-dark border-[#F9A825]"
              : "bg-white text-text-secondary border-border hover:border-primary/40"
          )}
        >
          {type.label}
        </button>
      ))}
      </div>
    </div>
  );
}
