"use client";

import React from 'react';
import { Search, Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FamilyMemberSwitcher } from './FamilyMemberSwitcher';
import { PlanStatusStrip } from './PlanStatusStrip';
import { useVault } from '@/lib/context/VaultContext';
import { IconAction } from '@/components/ui/IconAction';

const ROUTE_TITLES: Record<string, string> = {
  '/dashboard': 'Vault Home',
  '/records': 'My Records',
  '/goals': 'Health Goals',
  '/library': 'Health Library',
  '/profile': 'Profile Settings',
};

export function TopBar() {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const { familyMembers, activeMemberId, activityHistory } = useVault();
  const activeMember = familyMembers.find(m => m.id === activeMemberId) || familyMembers[0];
  
  // Find the closest matching route title
  const currentTitle = Object.keys(ROUTE_TITLES).find(route => pathname.startsWith(route)) 
    ? ROUTE_TITLES[Object.keys(ROUTE_TITLES).find(route => pathname.startsWith(route)) as string]
    : 'Vault';

  // Close dropdown when clicking outside
  const notificationsRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-surface border-b border-border flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-6">
        <h1 className="font-heading font-bold text-2xl text-dark">
          {currentTitle}
        </h1>
        <div className="h-8 w-px bg-border hidden md:block"></div>
        <FamilyMemberSwitcher />
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden lg:block">
          <IconAction context="status" className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search size={18} className="text-text-muted" />
          </IconAction>
          <input 
            type="text" 
            placeholder="Search vault..." 
            className="pl-10 pr-4 py-2 bg-surface-alt border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary w-64 transition-all"
          />
        </div>

        <PlanStatusStrip />

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-full hover:bg-surface-alt flex items-center justify-center text-text-secondary relative transition-colors"
          >
            <IconAction context="status">
              <Bell size={20} />
            </IconAction>
            {activityHistory.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            )}
          </button>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-full mt-2 right-0 w-80 bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-border flex justify-between items-center bg-surface-alt/50">
                <h3 className="font-heading font-bold text-sm text-dark">Recent Activity</h3>
                <span className="text-xs text-text-muted">{activityHistory.length} items</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {activityHistory.length === 0 ? (
                  <div className="p-6 text-center text-sm text-text-muted">No recent activity.</div>
                ) : (
                  activityHistory.map((activity) => (
                    <div key={activity.id} className="p-4 border-b border-border/50 hover:bg-surface-alt transition-colors">
                      <p className="text-sm font-medium text-text-primary leading-tight mb-1">{activity.label}</p>
                      <p className="text-xs text-text-muted">{new Date(activity.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <Link href="/profile">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold cursor-pointer hover:bg-primary-dark transition-colors shadow-sm">
            {activeMember?.avatarInitials || 'ME'}
          </div>
        </Link>
      </div>
    </header>
  );
}
