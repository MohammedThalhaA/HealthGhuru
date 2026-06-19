import React from 'react';
import Link from 'next/link';
import { FileText, MoreVertical } from 'lucide-react';
import { PillBadge } from '@/components/ui/PillBadge';
import { VaultRecord } from '@/lib/types';

interface RecordCardProps {
  record: VaultRecord;
}

export function RecordCard({ record }: RecordCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getTypeName = (type: string) => {
    return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="bg-white border border-border hover:border-primary/30 rounded-[14px] p-5 shadow-[0_4px_24px_rgba(46,125,50,0.08)] hover:-translate-y-1 transition-all group relative flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
          <FileText size={20} />
        </div>
        <button className="text-text-muted hover:text-dark">
          <MoreVertical size={18} />
        </button>
      </div>

      <h3 className="font-heading font-bold text-lg text-dark leading-tight mb-2 line-clamp-2">
        <Link href={`/records/${record.id}`} className="hover:text-primary transition-colors">
          {record.title}
        </Link>
      </h3>
      
      <p className="text-sm text-text-secondary mb-1">
        {getTypeName(record.type)} &middot; {formatDate(record.date)}
      </p>
      
      <p className="text-sm text-text-muted mb-4 line-clamp-1">
        {record.doctorOrFacility || 'Unknown Facility'}
      </p>

      <div className="mt-auto flex flex-wrap gap-2">
        {record.tags.map(tag => (
          <PillBadge key={tag} className="text-[10px] px-2 py-0.5">{tag}</PillBadge>
        ))}
      </div>
      
      <Link href={`/records/${record.id}`} className="absolute inset-0 z-0 opacity-0" aria-label={`View ${record.title}`}></Link>
    </div>
  );
}
