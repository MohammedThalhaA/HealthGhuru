"use client";

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download, Printer, Share2, FileText, Calendar, User, Search } from 'lucide-react';
import { useVault } from '@/lib/context/VaultContext';
import { Button } from '@/components/ui/Button';
import { PillBadge } from '@/components/ui/PillBadge';
import { LockedFeatureCard } from '@/components/ui/LockedFeatureCard';

export default function RecordDetailPage({ params }: { params: { recordId: string } }) {
  const { records, userPlan } = useVault();
  const record = records.find(r => r.id === params.recordId);

  if (!record) {
    notFound();
  }

  // const isFree = userPlan.tier === \'free\';
  const ocrEnabled = userPlan.ocrEnabled;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getTypeName = (type: string) => {
    return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 text-sm font-medium">
        <Link href="/records" className="text-text-muted hover:text-dark flex items-center gap-1 transition-colors">
          <ArrowLeft size={16} /> Back to Records
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl text-dark mb-2">{record.title}</h1>
          <div className="flex items-center gap-3 text-text-secondary text-sm">
            <span className="flex items-center gap-1.5"><FileText size={14} /> {getTypeName(record.type)}</span>
            <span>&middot;</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(record.date)}</span>
            {record.doctorOrFacility && (
              <>
                <span>&middot;</span>
                <span className="flex items-center gap-1.5"><User size={14} /> {record.doctorOrFacility}</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="ghost" className="gap-2 px-4 shadow-sm border border-border bg-white text-text-primary">
            <Share2 size={16} /> Share
          </Button>
          <Button variant="ghost" className="gap-2 px-4 shadow-sm border border-border bg-white text-text-primary">
            <Printer size={16} /> Print
          </Button>
          <Button variant="primary" className="gap-2 px-4">
            <Download size={16} /> Download
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {record.tags.map(tag => (
          <PillBadge key={tag} className="bg-surface-alt border-border">{tag}</PillBadge>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {/* Document Preview Area */}
        <div className="lg:col-span-2 bg-surface-alt rounded-[14px] border border-border min-h-[600px] flex items-center justify-center p-8 relative">
          {/* Mock Document Preview */}
          <div className="w-full max-w-lg bg-white shadow-lg aspect-[1/1.4] rounded-sm flex flex-col p-8 opacity-90 border border-gray-200">
             <div className="h-6 w-1/3 bg-gray-200 rounded mb-8"></div>
             <div className="h-4 w-1/2 bg-gray-100 rounded mb-4"></div>
             <div className="h-4 w-full bg-gray-100 rounded mb-4"></div>
             <div className="h-4 w-full bg-gray-100 rounded mb-4"></div>
             <div className="h-4 w-3/4 bg-gray-100 rounded mb-8"></div>
             
             <div className="h-32 w-full bg-blue-50/50 border border-blue-100 rounded mb-8 flex items-center justify-center text-blue-300 font-medium text-sm">Data Table Graphic</div>
             
             <div className="h-4 w-full bg-gray-100 rounded mb-4"></div>
             <div className="h-4 w-full bg-gray-100 rounded mb-4"></div>
             <div className="h-4 w-2/3 bg-gray-100 rounded mb-4"></div>
          </div>
          <div className="absolute bottom-4 right-4 text-xs font-mono text-text-muted bg-white/80 px-2 py-1 rounded backdrop-blur-sm shadow-sm border border-border">
            {record.fileName}
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-[14px] border border-border shadow-[0_4px_24px_rgba(46,125,50,0.08)] p-6">
            <h3 className="font-heading font-bold text-dark mb-4 flex items-center gap-2">
              <Search size={18} className="text-secondary" /> Extracted Text (OCR)
            </h3>
            
            {ocrEnabled ? (
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Search within document..." 
                  className="w-full px-3 py-2 bg-surface-alt border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
                <div className="bg-surface p-4 rounded-lg border border-border max-h-[400px] overflow-y-auto">
                  <p className="text-sm text-text-secondary leading-relaxed font-mono whitespace-pre-wrap">
                    {record.extractedText || "No text could be extracted from this document."}
                  </p>
                </div>
              </div>
            ) : (
              <LockedFeatureCard 
                message="Searchable text extraction is a Pro feature."
                upgradeText="Upgrade &rarr;"
                onUpgrade={() => window.location.href = '/profile'}
                className="bg-surface shadow-none border-dashed"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
