"use client";

import React, { useState, useEffect } from 'react';
import { PenTool, History, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface JournalLog {
  id: string;
  date: string;
  content: string;
}

export default function JournalEntry() {
  const [content, setContent] = useState('');
  const [entries, setEntries] = useState<JournalLog[]>([]);
  const { addToast } = useToast();

  // Load entries from local storage
  useEffect(() => {
    const saved = localStorage.getItem('hg_journal_entries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse journal entries");
      }
    } else {
      // Load some mock data if empty
      setEntries([
        { id: '1', date: new Date(Date.now() - 86400000).toISOString(), content: 'Felt really energetic today after getting a full 8 hours of sleep. My morning workout went great.' },
        { id: '2', date: new Date(Date.now() - 172800000).toISOString(), content: 'A bit stressed with work, which led to some late-night snacking. Need to focus on mindfulness tomorrow.' }
      ]);
    }
  }, []);

  const saveEntries = (newEntries: JournalLog[]) => {
    setEntries(newEntries);
    localStorage.setItem('hg_journal_entries', JSON.stringify(newEntries));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newEntry: JournalLog = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      content: content.trim()
    };

    saveEntries([newEntry, ...entries]);
    setContent('');
    addToast('Journal entry saved! ✍️', 'success');
  };

  const handleDelete = (id: string) => {
    saveEntries(entries.filter(e => e.id !== id));
    addToast('Entry deleted', 'success');
  };

  const formatDate = (iso: string) => {
    return new Intl.DateTimeFormat('en-GB', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(iso));
  };

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border h-full flex flex-col overflow-hidden">
      
      {/* New Entry Form */}
      <div className="p-6 border-b border-border bg-surface-alt">
        <h3 className="font-heading font-bold text-dark flex items-center gap-2 mb-4">
          <PenTool size={18} className="text-[#FF6B6B]" /> Daily Reflection
        </h3>
        
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? How did your body feel today?"
            rows={4}
            className="w-full border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/50 transition-shadow resize-none bg-white"
          />
          <div className="flex justify-end">
            <button 
              type="submit"
              disabled={!content.trim()}
              className="bg-[#FF6B6B] text-white font-bold py-2 px-6 rounded-lg shadow-[0_4px_0_#D32F2F] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>

      {/* History */}
      <div className="flex-1 flex flex-col min-h-[300px]">
        <div className="px-6 py-4 border-b border-border bg-white flex items-center justify-between shrink-0">
          <h4 className="font-bold text-dark flex items-center gap-2">
            <History size={16} className="text-text-muted" /> Past Entries
          </h4>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 hide-scrollbar">
          {entries.length === 0 ? (
            <div className="h-full flex items-center justify-center text-text-muted text-sm italic">
              No journal entries yet. Start writing!
            </div>
          ) : (
            entries.map(entry => (
              <div key={entry.id} className="bg-surface rounded-xl border border-border p-4 group relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#FF6B6B]">{formatDate(entry.date)}</span>
                  <button 
                    onClick={() => handleDelete(entry.id)}
                    className="text-text-muted/50 hover:text-status-danger transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      
    </div>
  );
}
