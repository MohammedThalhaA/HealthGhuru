'use client';

import React from 'react';

const AccountForm: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
      
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-24 h-24 bg-gray-100 border-4 border-white shadow rounded-full overflow-hidden">
          <img src="/images/avatar_placeholder.png" alt="Profile" className="w-full h-full object-cover opacity-50" />
        </div>
        <div>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm shadow-sm">
            Change Photo
          </button>
        </div>
      </div>

      <form className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" defaultValue="Mohammed" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" defaultValue="mohammed@example.com" disabled className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input type="date" defaultValue="1990-05-15" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select defaultValue="male" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <button type="button" className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors shadow-sm">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
