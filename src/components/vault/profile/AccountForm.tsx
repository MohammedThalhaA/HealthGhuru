"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useVault } from '@/lib/context/VaultContext';
import { useToast } from '@/components/providers/ToastProvider';

export function AccountForm() {
  const { familyMembers, updateFamilyMember, userEmail } = useVault();
  const { toast } = useToast();
  const selfMember = familyMembers.find(m => m.relationship === 'self') || familyMembers[0];

  const [formData, setFormData] = useState({
    name: selfMember.name || '',
    email: userEmail || '',
    dob: selfMember.dob || '',
    gender: 'male',
    phone: '',
    city: '',
    height: '',
    weight: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateFamilyMember({
      ...selfMember,
      name: formData.name,
      dob: formData.dob
    });
    toast.success('Profile updated', 'Your personal details have been saved.');
  };

  return (
    <div className="bg-white border border-border rounded-xl md:rounded-[14px] shadow-[0_4px_24px_rgba(46,125,50,0.08)] p-4 md:p-8">
      <h3 className="font-heading font-bold text-base md:text-xl text-dark mb-4 md:mb-6">Personal Details</h3>

      <form className="space-y-4 md:space-y-6" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-xs md:text-sm font-medium text-text-primary mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              style={{ fontSize: '16px' }}
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-text-primary mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-xs md:text-sm font-medium text-text-primary mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              style={{ fontSize: '16px' }}
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-text-primary mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none"
              style={{ fontSize: '16px' }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-text-primary mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-6">
          <div>
            <label className="block text-xs md:text-sm font-medium text-text-primary mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              style={{ fontSize: '16px' }}
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-text-primary mb-1">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              style={{ fontSize: '16px' }}
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-text-primary mb-1">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-3 md:px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>

        <div className="pt-3 md:pt-4 flex items-center justify-end border-t border-border mt-6 md:mt-8">
          <Button type="submit" variant="primary">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
