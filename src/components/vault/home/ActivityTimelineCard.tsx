'use client';

import React from 'react';
import { Clock, FileText, Target, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { MOCK_VAULT_EVENTS } from '@/lib/mockData';
import EmptyState from '@/components/ui/EmptyState';

const ActivityTimelineCard: React.FC = () => {
  if (MOCK_VAULT_EVENTS.length === 0) {
    return (
      <div className="w-full h-full bg-white border border-gray-200 rounded-3xl p-6 col-span-1 md:col-span-2">
        <EmptyState 
          icon={Clock} 
          title="No Recent Activity" 
          description="Your health story starts here — add your first record or goal to see it on your timeline." 
        />
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'record_added': return <FileText className="w-4 h-4 text-primary-light" />;
      case 'goal_updated':
      case 'goal_created': return <Target className="w-4 h-4 text-secondary" />;
      case 'article_saved': return <Bookmark className="w-4 h-4 text-surface-alt0" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="w-full h-full min-h-[340px] bg-white border border-gray-200 rounded-3xl p-6 col-span-1 md:col-span-2 shadow-sm hover:shadow transition-shadow overflow-hidden flex flex-col">
      <h3 className="font-semibold text-gray-900 mb-6 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-gray-400" />
        Recent Activity
      </h3>
      
      <div className="flex-1 relative">
        <div className="absolute top-0 bottom-0 left-[15px] w-px bg-gray-100 z-0"></div>
        <div className="space-y-6 relative z-10">
          {MOCK_VAULT_EVENTS.slice(0, 4).map((event) => (
            <div key={event.id} className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                {getIcon(event.type)}
              </div>
              <div className="ml-4">
                <Link href={event.linkHref} className="text-sm font-medium text-gray-900 hover:text-primary transition-colors">
                  {event.label}
                </Link>
                <p className="text-xs text-gray-500 mt-1">{event.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimelineCard;
