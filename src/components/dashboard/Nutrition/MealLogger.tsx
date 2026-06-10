"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Sunrise, Sun, Moon, Coffee } from 'lucide-react';
import { MealItem, MealLog } from '@/lib/types';
import { MOCK_MEALS_TODAY } from '@/lib/mockData';

export default function MealLogger() {
  const [mealLog, setMealLog] = useState<MealLog>({
    date: new Date().toISOString().split('T')[0],
    ...MOCK_MEALS_TODAY
  });
  
  const [activeForm, setActiveForm] = useState<keyof Omit<MealLog, 'date'> | null>(null);

  // Load from localStorage if exists
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const savedLog = localStorage.getItem(`hg_nutrition_${todayStr}`);
    if (savedLog) {
      try {
        setMealLog(JSON.parse(savedLog));
      } catch (e) {
        console.error("Error parsing meal log");
      }
    }
  }, []);

  // Save to localStorage when updated
  const saveLog = (newLog: MealLog) => {
    setMealLog(newLog);
    localStorage.setItem(`hg_nutrition_${newLog.date}`, JSON.stringify(newLog));
  };

  const handleAddFood = (e: React.FormEvent<HTMLFormElement>, mealType: keyof Omit<MealLog, 'date'>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newFood: MealItem = {
      name: fd.get('name') as string,
      calories: Number(fd.get('calories')),
      protein: Number(fd.get('protein')),
      carbs: Number(fd.get('carbs')),
      fat: Number(fd.get('fat')),
    };

    const newLog = {
      ...mealLog,
      [mealType]: [...mealLog[mealType], newFood]
    };
    saveLog(newLog);
    setActiveForm(null); // close form
  };

  const handleDeleteFood = (mealType: keyof Omit<MealLog, 'date'>, index: number) => {
    const newLog = {
      ...mealLog,
      [mealType]: mealLog[mealType].filter((_, i) => i !== index)
    };
    saveLog(newLog);
  };

  const MealSection = ({ 
    type, title, icon: Icon 
  }: { 
    type: keyof Omit<MealLog, 'date'>, title: string, icon: any 
  }) => {
    const items = mealLog[type];
    const totalCals = items.reduce((sum, item) => sum + item.calories, 0);

    return (
      <div className="bg-white rounded-[16px] shadow-sm border border-border overflow-hidden mb-6">
        {/* Section Header */}
        <div className="px-5 py-4 border-b border-border bg-surface-alt flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon size={20} className="text-primary" />
            <h3 className="font-heading font-bold text-dark uppercase tracking-wide">{title}</h3>
          </div>
          <button 
            onClick={() => setActiveForm(activeForm === type ? null : type)}
            className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
          >
            <Plus size={16} /> Add Food
          </button>
        </div>

        {/* Add Food Inline Form */}
        {activeForm === type && (
          <div className="p-4 bg-primary/5 border-b border-primary/20">
            <form onSubmit={(e) => handleAddFood(e, type)} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <input required name="name" type="text" placeholder="Food name" className="sm:col-span-4 border border-border rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none" />
              <input required name="calories" type="number" placeholder="Kcal" className="sm:col-span-2 border border-border rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none" />
              <input required name="protein" type="number" placeholder="Pro (g)" className="sm:col-span-1 border border-border rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none" />
              <input required name="carbs" type="number" placeholder="Carb (g)" className="sm:col-span-1 border border-border rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none" />
              <input required name="fat" type="number" placeholder="Fat (g)" className="sm:col-span-1 border border-border rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none" />
              <button type="submit" className="sm:col-span-3 bg-primary text-white rounded font-bold text-sm hover:bg-primary-dark transition-colors">Add</button>
            </form>
          </div>
        )}

        {/* Food Items List */}
        <div className="divide-y divide-border">
          {items.map((item, idx) => (
            <div key={idx} className="px-5 py-3 flex items-center justify-between hover:bg-surface transition-colors">
              <div className="flex-1">
                <p className="font-semibold text-dark text-sm">{item.name}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="font-mono font-bold text-dark">{item.calories} kcal</span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-text-muted">
                  <span>P:{item.protein}g</span>
                  <span>C:{item.carbs}g</span>
                  <span>F:{item.fat}g</span>
                </div>
                <button 
                  onClick={() => handleDeleteFood(type, idx)}
                  className="text-text-muted hover:text-status-danger transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="px-5 py-4 text-center text-text-muted text-sm italic">
              No food logged for {title.toLowerCase()} yet.
            </div>
          )}
        </div>

        {/* Section Footer */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-surface border-t border-border flex justify-end">
            <span className="text-sm font-bold text-text-secondary">Total: {totalCals} kcal</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <MealSection type="breakfast" title="Breakfast" icon={Sunrise} />
      <MealSection type="lunch" title="Lunch" icon={Sun} />
      <MealSection type="dinner" title="Dinner" icon={Moon} />
      <MealSection type="snacks" title="Snacks" icon={Coffee} />
    </div>
  );
}
