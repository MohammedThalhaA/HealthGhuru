'use client';

import React from 'react';

const SecurityPanel: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Security & Privacy</h3>
      
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-900">Two-Factor Authentication</p>
            <p className="text-sm text-gray-500">Add an extra layer of security to your vault.</p>
          </div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium rounded-xl transition-colors">
            Enable
          </button>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-900">Biometric Unlock</p>
            <p className="text-sm text-gray-500">Use Face ID or Touch ID on supported devices.</p>
          </div>
          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary cursor-pointer">
            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
          </div>
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium text-gray-900">Download Data Archive</p>
            <p className="text-sm text-gray-500">Get a copy of all your records and goals in a zip file.</p>
          </div>
          <button className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl transition-colors shadow-sm">
            Request Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityPanel;
