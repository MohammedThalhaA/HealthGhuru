"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GoalCategory } from '@/lib/types';

const goalSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.enum(['weight', 'blood_sugar', 'blood_pressure', 'sleep', 'fitness', 'mental_health', 'other'] as const),
  startValue: z.number().min(0, "Must be positive"),
  targetValue: z.number().min(0, "Must be positive"),
  unit: z.string().min(1, "Unit is required"),
  targetDate: z.string().min(1, "Target date is required"),
});

type GoalFormValues = z.infer<typeof goalSchema>;

interface GoalCreateModalProps {
  onClose: () => void;
  onCreate: (data: GoalFormValues) => void;
}

export function GoalCreateModal({ onClose, onCreate }: GoalCreateModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      category: 'fitness',
      unit: '',
    },
    mode: 'onChange'
  });

  const onSubmit = (data: GoalFormValues) => {
    onCreate(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface">
          <h2 className="font-heading font-bold text-xl text-dark">Create New Goal</h2>
          <button onClick={onClose} className="text-text-muted hover:text-dark transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Goal Title</label>
            <input 
              {...register('title')}
              placeholder="e.g., Run a 5K, Lower A1C"
              className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 peer ${errors.title ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}`}
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Category</label>
              <select 
                {...register('category')}
                className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none"
              >
                <option value="weight">Weight</option>
                <option value="blood_sugar">Blood Sugar</option>
                <option value="blood_pressure">Blood Pressure</option>
                <option value="sleep">Sleep</option>
                <option value="fitness">Fitness</option>
                <option value="mental_health">Mental Health</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Target Date</label>
              <input 
                type="date"
                {...register('targetDate')}
                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.targetDate ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Start Value</label>
              <input 
                type="number"
                step="0.1"
                {...register('startValue', { valueAsNumber: true })}
                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.startValue ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Target Value</label>
              <input 
                type="number"
                step="0.1"
                {...register('targetValue', { valueAsNumber: true })}
                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.targetValue ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Unit</label>
              <input 
                type="text"
                placeholder="kg, %, etc."
                {...register('unit')}
                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.unit ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}`}
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={!isValid}>Create Goal</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
