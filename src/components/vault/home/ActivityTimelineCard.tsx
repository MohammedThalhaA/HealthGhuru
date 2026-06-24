"use client";

import React from 'react';
import Link from 'next/link';
import { FileText, Target, Bookmark, Activity } from 'lucide-react';
import { useVault } from '@/lib/context/VaultContext';
import { EmptyState } from '@/components/ui/EmptyState';

import { VaultActivityEvent } from '@/lib/types';

export function ActivityTimelineCard() {
  const { records, goals, articles, activeMemberId } = useVault();
  
  // Dynamically compute activity from real data
  const memberActivities: VaultActivityEvent[] = [];
  
  // 1. Records
  records.filter(r => r.memberId === activeMemberId).forEach(r => {
    memberActivities.push({
      id: r.id,
      memberId: r.memberId,
      type: 'record_added',
      label: `Added ${r.title}`,
      timestamp: r.createdAt || r.date,
      linkHref: `/records/${r.id}`
    });
  });

  // 2. Goals
  goals.filter(g => g.memberId === activeMemberId).forEach(g => {
    g.history.forEach((h, index) => {
      memberActivities.push({
        id: `${g.id}_${index}`,
        memberId: g.memberId,
        type: 'goal_updated',
        label: `Logged progress on ${g.title} (${h.value}${g.unit})`,
        timestamp: h.date,
        linkHref: `/goals`
      });
    });
  });

  // 3. Saved Articles
  articles.filter(a => a.saved).forEach(a => {
    // We don't have a saved timestamp, so we'll just use today minus a few hours to make it look recent if saved
    // but ideally we'd store the saved timestamp. For now, we'll place them at the end.
    memberActivities.push({
      id: `art_${a.id}`,
      memberId: activeMemberId,
      type: 'article_saved',
      label: `Saved "${a.title}"`,
      timestamp: new Date().toISOString(), // Fallback
      linkHref: `/library`
    });
  });

  // Sort by newest first
  memberActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  const topActivities = memberActivities.slice(0, 5);

  const getIcon = (type: string) => {
    switch(type) {
      case 'record_added': return <FileText size={16} className="text-secondary" />;
      case 'goal_updated': 
      case 'goal_created': return <Target size={16} className="text-accent" />;
      case 'article_saved': return <Bookmark size={16} className="text-primary" />;
      default: return <Activity size={16} className="text-text-muted" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl md:rounded-[14px] p-4 md:p-6 shadow-[0_4px_24px_rgba(46,125,50,0.08)] h-full flex flex-col overflow-hidden">
      <h3 className="font-heading font-bold text-base md:text-lg text-dark mb-4 md:mb-6 shrink-0">Recent Activity</h3>
      
      {topActivities.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center">
          <EmptyState 
            icon={Activity} 
            title="No activity yet" 
            description="Your vault is currently empty. Start by adding a record or setting a goal." 
            className="border-0 bg-transparent p-0"
          />
        </div>
      ) : (
        <div className="space-y-6 flex-1 overflow-y-auto pr-2 pb-2">
          {topActivities.map((activity, index) => (
            <div key={activity.id} className="flex gap-4 relative group">
              {index !== topActivities.length - 1 && (
                <div className="absolute top-8 left-4 w-px h-[calc(100%-8px)] bg-border"></div>
              )}
              <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center shrink-0 z-10 border-2 border-white group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                {getIcon(activity.type)}
              </div>
              <div className="pt-1.5 flex-1">
                <p className="timeline-item-title text-sm text-text-primary leading-tight font-medium">
                  {activity.label}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="timeline-item-time text-xs text-text-muted" suppressHydrationWarning>
                    {formatDate(activity.timestamp)}
                  </span>
                  <Link href={activity.linkHref} className="text-xs text-secondary hover:underline font-medium">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
