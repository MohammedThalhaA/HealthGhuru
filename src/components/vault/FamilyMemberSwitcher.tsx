"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, Lock } from 'lucide-react';
import { useVault } from '@/lib/context/VaultContext';
import { cn } from '@/lib/utils';
import { FamilyMember } from '@/lib/types';
import { IconAction } from '@/components/ui/IconAction';

export function FamilyMemberSwitcher() {
  const { userPlan, activeMemberId, setActiveMemberId, familyMembers } = useVault();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isFree = userPlan.tier === 'free';

  const activeMember = familyMembers.find(m => m.id === activeMemberId) || familyMembers[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (member: FamilyMember) => {
    setActiveMemberId(member.id);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-surface-alt px-2 py-1.5 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-heading text-sm font-bold">
          {activeMember?.avatarInitials || 'ME'}
        </div>
        <div className="flex flex-col items-start hidden sm:flex">
          <span className="text-sm font-heading font-semibold text-text-primary leading-tight">
            {activeMember?.name || 'Self'}
          </span>
          <span className="text-xs text-text-muted capitalize leading-tight">
            {activeMember?.relationship || 'self'}
          </span>
        </div>
        <IconAction context="action">
          <ChevronDown size={16} className={`text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </IconAction>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-[14px] shadow-lg border border-border overflow-hidden z-50">
          <div className="p-2">
            <div className="text-xs font-heading font-semibold text-text-muted uppercase tracking-wider px-3 pb-2 pt-1">
              Switch Vault Profile
            </div>
            
            <div className="space-y-1">
              {familyMembers.map(member => (
                <button
                  key={member.id}
                  onClick={() => handleSelect(member)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                    activeMemberId === member.id ? "bg-surface-alt" : "hover:bg-surface"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-heading text-sm font-bold",
                    activeMemberId === member.id ? "bg-primary text-white" : "bg-primary/20 text-primary"
                  )}>
                    {member.avatarInitials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-primary">{member.name}</span>
                    <span className="text-xs text-text-muted capitalize">{member.relationship}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="my-2 border-t border-border"></div>

            {isFree ? (
              <div className="px-3 py-3 bg-surface-alt rounded-lg m-1 flex items-center justify-between group opacity-70">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-text-muted shadow-sm">
                    <IconAction context="status"><Lock size={14} /></IconAction>
                  </div>
                  <span className="text-sm text-text-secondary font-medium">Add Family Member</span>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = '/profile'; // Simple navigation to profile for now
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-primary hover:bg-surface-alt rounded-lg transition-colors m-1"
              >
                <div className="w-8 h-8 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center text-primary">
                  <IconAction context="action"><Plus size={16} /></IconAction>
                </div>
                <span className="text-sm font-medium">Add Family Member</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
