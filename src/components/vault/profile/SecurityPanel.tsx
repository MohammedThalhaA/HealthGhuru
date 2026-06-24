"use client";

import React from 'react';
import { Shield, Key, Smartphone, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function SecurityPanel() {
  return (
    <div className="bg-white border border-border rounded-xl md:rounded-[14px] shadow-[0_4px_24px_rgba(46,125,50,0.08)] p-4 md:p-8">
      <div className="flex items-center gap-3 mb-6 md:mb-8 pb-4 md:pb-6 border-b border-border">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Shield size={24} className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-base md:text-xl text-dark">Security & Privacy</h3>
          <p className="text-xs md:text-sm text-text-secondary mt-1">Manage your account security and data preferences.</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Password */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="mt-1 text-text-muted"><Key size={20} /></div>
            <div>
              <h4 className="font-heading font-semibold text-dark mb-1">Password</h4>
              <p className="text-sm text-text-secondary">Last changed 3 months ago</p>
            </div>
          </div>
          <Button variant="outline" className="bg-white">Update Password</Button>
        </div>

        {/* 2FA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="mt-1 text-primary"><Smartphone size={20} /></div>
            <div>
              <h4 className="font-heading font-semibold text-dark mb-1">Two-Factor Authentication</h4>
              <p className="text-sm text-text-secondary">Added an extra layer of security to your account</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Enabled</span>
            <Button variant="ghost" size="sm">Manage</Button>
          </div>
        </div>

        {/* Export Data */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-border">
          <div className="flex gap-4">
            <div className="mt-1 text-text-muted"><FileDown size={20} /></div>
            <div>
              <h4 className="font-heading font-semibold text-dark mb-1">Export Vault Data</h4>
              <p className="text-sm text-text-secondary">Download a copy of all your records, goals, and history.</p>
            </div>
          </div>
          <Button variant="outline" className="bg-white gap-2">
            <FileDown size={16} /> Request Archive
          </Button>
        </div>

        {/* Delete Account */}
        <div className="pt-6 border-t border-border">
          <h4 className="font-heading font-semibold text-red-600 mb-2">Danger Zone</h4>
          <p className="text-sm text-text-secondary mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
