'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Lock, Plus } from 'lucide-react';
import { useVault } from '@/lib/context/VaultContext';

const FamilyMemberSwitcher: React.FC = () => {
  const { activeMember, familyMembers, switchMember, userPlan } = useVault();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full transition-colors"
      >
        <div className="w-6 h-6 bg-surface text-primary-dark rounded-full flex items-center justify-center text-xs font-bold">
          {activeMember.avatarInitials}
        </div>
        <span className="text-sm font-medium text-gray-800 hidden sm:block">{activeMember.name}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-2xl py-2 z-50 overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Family Vault</p>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto">
            {familyMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => {
                  switchMember(member.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors ${
                  activeMember.id === member.id ? 'bg-surface-alt/50' : ''
                }`}
              >
                <div className="w-8 h-8 bg-surface text-primary-dark rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                  {member.avatarInitials}
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium text-gray-900">{member.name}</span>
                  <span className="text-xs text-gray-500 capitalize">{member.relationship}</span>
                </div>
              </button>
            ))}
            
            {userPlan.tier === 'free' ? (
              <div className="flex items-center px-4 py-3 bg-gray-50/50 opacity-75 border-t border-gray-100 cursor-not-allowed group">
                <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Plus className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left flex-1">
                  <span className="text-sm font-medium text-gray-700">Add Family Member</span>
                  <span className="text-xs text-gray-500 flex items-center mt-0.5">
                    <Lock className="w-3 h-3 mr-1" /> Pro feature
                  </span>
                </div>
              </div>
            ) : (
              <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-100 text-primary">
                <div className="w-8 h-8 bg-surface-alt text-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-left">Add Family Member</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyMemberSwitcher;
