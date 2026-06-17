'use client';

import React from 'react';
import { useVault } from '@/lib/context/VaultContext';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Download, Trash2, FileText, Calendar, User as UserIcon, Tag, Search, Target } from 'lucide-react';
import Link from 'next/link';
import LockedFeatureCard from '@/components/ui/LockedFeatureCard';

export default function RecordDetailView() {
  const { recordId } = useParams();
  const router = useRouter();
  const { records, goals, userPlan } = useVault();

  const record = records.find(r => r.id === recordId);

  if (!record) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Record not found</h2>
        <Link href="/records" className="text-primary hover:underline">Return to Records</Link>
      </div>
    );
  }

  // Find linked goals (if goal category matches a tag or something similar)
  // For mock purposes, if tag matches a goal category word
  const linkedGoals = goals.filter(g => 
    record.tags.some(t => t.toLowerCase().includes(g.category.split('_')[0])) ||
    record.tags.some(t => g.title.toLowerCase().includes(t.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col pb-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button onClick={() => router.back()} className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{record.title}</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Download
          </button>
          <button className="flex items-center px-4 py-2 bg-red-50 border border-red-100 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors shadow-sm">
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="w-full bg-gray-100 border border-gray-200 rounded-3xl aspect-[3/4] max-h-[800px] flex items-center justify-center relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <FileText className="w-16 h-16 mb-4 opacity-50" />
              <p className="font-medium text-lg">Document Preview</p>
              <p className="text-sm">{record.fileName}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Features */}
        <div className="space-y-6">
          {/* Metadata Panel */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Record Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 capitalize">{record.type.replace('_', ' ')}</p>
                  <p className="text-xs text-gray-500">Record Type</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(record.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-xs text-gray-500">Date of Record</p>
                </div>
              </div>

              {record.doctorOrFacility && (
                <div className="flex items-start">
                  <UserIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{record.doctorOrFacility}</p>
                    <p className="text-xs text-gray-500">Doctor / Facility</p>
                  </div>
                </div>
              )}

              {record.tags.length > 0 && (
                <div className="flex items-start">
                  <Tag className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <div className="flex flex-wrap gap-2 mb-1">
                      {record.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Tags</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">
                Uploaded {new Date(record.createdAt).toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>

          {/* Linked Goals */}
          {linkedGoals.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Linked Goals</h3>
              <div className="space-y-2">
                {linkedGoals.map(goal => (
                  <Link key={goal.id} href="/goals" className="flex items-center p-3 rounded-xl bg-surface-alt border border-surface hover:bg-surface transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
                      <Target className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900">{goal.title}</p>
                      <p className="text-xs text-primary group-hover:underline">View progress →</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Extracted Text (Pro Feature) */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Extracted Text</h3>
            
            {userPlan.tier === 'pro' ? (
              <div>
                <div className="relative mb-4">
                  <input 
                    type="text" 
                    placeholder="Search within document..." 
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
                <div className="bg-gray-50 rounded-xl p-4 max-h-[300px] overflow-y-auto">
                  <p className="text-sm text-gray-600 font-mono leading-relaxed whitespace-pre-wrap">
                    {record.extractedText || "No text could be extracted from this document."}
                  </p>
                </div>
              </div>
            ) : (
              <LockedFeatureCard 
                title="Searchable Documents" 
                description="Searchable text extraction (OCR) is a Pro feature." 
                className="!p-6 !border-0 bg-gray-50"
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
