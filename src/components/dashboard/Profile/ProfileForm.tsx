"use client";

import React, { useState } from 'react';
import { useDashboard } from '@/lib/context/DashboardContext';
import { useToast } from '@/components/ui/Toast';
import { Save, User } from 'lucide-react';

export default function ProfileForm() {
  const { user, updateUser } = useDashboard();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    dob: user.dob || '',
    gender: user.gender || 'Prefer not to say',
    height: user.height?.toString() || '',
    weight: user.weight?.toString() || '',
    city: user.city || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: formData.name,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      height: Number(formData.height) || undefined,
      weight: Number(formData.weight) || undefined,
      city: formData.city,
    });
    addToast('Profile updated successfully! 💾', 'success');
  };

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border overflow-hidden h-full">
      <div className="bg-surface-alt px-6 py-4 border-b border-border flex items-center gap-2">
        <User size={18} className="text-primary" />
        <h3 className="font-heading font-bold text-dark uppercase tracking-wide">Personal Details</h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-bold text-dark mb-1 block">Full Name</label>
            <input 
              required
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-border rounded-lg p-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-dark mb-1 block">Email Address</label>
            <input 
              required
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-border rounded-lg p-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-bold text-dark mb-1 block">Date of Birth</label>
            <input 
              name="dob"
              type="date" 
              value={formData.dob}
              onChange={handleChange}
              className="w-full border border-border rounded-lg p-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-dark mb-1 block">Gender</label>
            <select 
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-border rounded-lg p-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="text-sm font-bold text-dark mb-1 block">Height (cm)</label>
            <input 
              name="height"
              type="number" 
              value={formData.height}
              onChange={handleChange}
              className="w-full border border-border rounded-lg p-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-dark mb-1 block">Weight (kg)</label>
            <input 
              name="weight"
              type="number" 
              value={formData.weight}
              onChange={handleChange}
              className="w-full border border-border rounded-lg p-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-dark mb-1 block">City</label>
            <input 
              name="city"
              type="text" 
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-border rounded-lg p-3 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex justify-end">
          <button 
            type="submit"
            className="flex items-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-full shadow-btn-primary hover:brightness-105 active:shadow-none active:translate-y-1 transition-all"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}
