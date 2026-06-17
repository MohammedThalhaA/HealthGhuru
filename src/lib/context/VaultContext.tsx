'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FamilyMember, UserPlan, VaultRecord, Goal, Article } from '../types';
import { MOCK_FAMILY_MEMBERS, MOCK_USER_PLAN, MOCK_VAULT_RECORDS, MOCK_GOALS, MOCK_ARTICLES } from '../mockData';

interface VaultContextProps {
  userPlan: UserPlan;
  activeMember: FamilyMember;
  familyMembers: FamilyMember[];
  records: VaultRecord[];
  goals: Goal[];
  savedArticles: Article[];
  switchMember: (memberId: string) => void;
  addRecord: (record: VaultRecord) => void;
  addGoal: (goal: Goal) => void;
  toggleSavedArticle: (articleId: string) => void;
  hasAccessToPro: boolean;
  canAddRecord: boolean;
  canAddGoal: boolean;
  updatePlan: (tier: 'free' | 'pro') => void;
}

const VaultContext = createContext<VaultContextProps | undefined>(undefined);

export const VaultProvider = ({ children }: { children: ReactNode }) => {
  // Try to load initial states from localStorage
  const getInitialPlan = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('vault_user_plan');
      if (stored) return JSON.parse(stored) as UserPlan;
    }
    return MOCK_USER_PLAN;
  };

  const [userPlan, setUserPlan] = useState<UserPlan>(getInitialPlan);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(MOCK_FAMILY_MEMBERS);
  const [activeMemberId, setActiveMemberId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('vault_active_member') || MOCK_FAMILY_MEMBERS[0].id;
    }
    return MOCK_FAMILY_MEMBERS[0].id;
  });

  const activeMember = familyMembers.find(m => m.id === activeMemberId) || familyMembers[0];

  const [records, setRecords] = useState<VaultRecord[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  // Sync active member to localStorage
  useEffect(() => {
    localStorage.setItem('vault_active_member', activeMemberId);
  }, [activeMemberId]);

  // Load namespace specific data when active member changes
  useEffect(() => {
    const recordsKey = `vault_records_${activeMemberId}`;
    const goalsKey = `vault_goals_${activeMemberId}`;
    const savedKey = `vault_saved_articles_${activeMemberId}`;

    const storedRecords = localStorage.getItem(recordsKey);
    const storedGoals = localStorage.getItem(goalsKey);
    const storedSaved = localStorage.getItem(savedKey);

    // If no stored records/goals for user-1, populate from mock data (for demo purposes)
    if (activeMemberId === 'user-1' && !storedRecords) {
      setRecords(MOCK_VAULT_RECORDS);
      localStorage.setItem(recordsKey, JSON.stringify(MOCK_VAULT_RECORDS));
    } else {
      setRecords(storedRecords ? JSON.parse(storedRecords) : []);
    }

    if (activeMemberId === 'user-1' && !storedGoals) {
      setGoals(MOCK_GOALS);
      localStorage.setItem(goalsKey, JSON.stringify(MOCK_GOALS));
    } else {
      setGoals(storedGoals ? JSON.parse(storedGoals) : []);
    }

    if (activeMemberId === 'user-1' && !storedSaved) {
      const savedMock = MOCK_ARTICLES.filter(a => a.saved);
      setSavedArticles(savedMock);
      localStorage.setItem(savedKey, JSON.stringify(savedMock));
    } else {
      setSavedArticles(storedSaved ? JSON.parse(storedSaved) : []);
    }
  }, [activeMemberId]);

  // Save specific data when it changes
  useEffect(() => {
    localStorage.setItem(`vault_records_${activeMemberId}`, JSON.stringify(records));
  }, [records, activeMemberId]);

  useEffect(() => {
    localStorage.setItem(`vault_goals_${activeMemberId}`, JSON.stringify(goals));
  }, [goals, activeMemberId]);

  useEffect(() => {
    localStorage.setItem(`vault_saved_articles_${activeMemberId}`, JSON.stringify(savedArticles));
  }, [savedArticles, activeMemberId]);

  const switchMember = (memberId: string) => {
    if (userPlan.tier === 'free' && memberId !== MOCK_FAMILY_MEMBERS[0].id) {
      // Free users can't switch/have other members
      return;
    }
    setActiveMemberId(memberId);
  };

  const addRecord = (record: VaultRecord) => {
    if (records.length >= userPlan.recordsLimit) return;
    setRecords(prev => [...prev, record]);
  };

  const addGoal = (goal: Goal) => {
    const activeGoals = goals.filter(g => g.status === 'active').length;
    if (activeGoals >= userPlan.activeGoalsLimit) return;
    setGoals(prev => [...prev, goal]);
  };

  const toggleSavedArticle = (articleId: string) => {
    const existing = savedArticles.find(a => a.id === articleId);
    if (existing) {
      setSavedArticles(prev => prev.filter(a => a.id !== articleId));
    } else {
      const articleToAdd = MOCK_ARTICLES.find(a => a.id === articleId);
      if (articleToAdd) {
        setSavedArticles(prev => [...prev, { ...articleToAdd, saved: true }]);
      }
    }
  };

  const updatePlan = (tier: 'free' | 'pro') => {
    const newPlan: UserPlan = {
      tier,
      recordsUsed: userPlan.recordsUsed,
      recordsLimit: tier === 'pro' ? 9999 : 10,
      activeGoalsLimit: tier === 'pro' ? 10 : 1,
      familyMembersLimit: tier === 'pro' ? 5 : 1,
    };
    setUserPlan(newPlan);
    localStorage.setItem('vault_user_plan', JSON.stringify(newPlan));
  };

  const hasAccessToPro = userPlan.tier === 'pro';
  const canAddRecord = records.length < userPlan.recordsLimit;
  const activeGoals = goals.filter(g => g.status === 'active').length;
  const canAddGoal = activeGoals < userPlan.activeGoalsLimit;

  return (
    <VaultContext.Provider
      value={{
        userPlan,
        activeMember,
        familyMembers,
        records,
        goals,
        savedArticles,
        switchMember,
        addRecord,
        addGoal,
        toggleSavedArticle,
        hasAccessToPro,
        canAddRecord,
        canAddGoal,
        updatePlan,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => {
  const context = useContext(VaultContext);
  if (context === undefined) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
};
