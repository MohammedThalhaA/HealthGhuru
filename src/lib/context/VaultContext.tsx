/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserPlan, VaultRecord, Goal, FamilyMember, LibraryArticle, VaultActivityEvent
} from '../types';
import { 
  MOCK_USER_PLAN, MOCK_VAULT_RECORDS, MOCK_GOALS, MOCK_FAMILY_MEMBERS, MOCK_LIBRARY_ARTICLES, MOCK_VAULT_ACTIVITY
} from '../mockData';

interface VaultContextType {
  userPlan: UserPlan;
  setUserPlan: (plan: UserPlan) => void;
  activeMemberId: string;
  setActiveMemberId: (id: string) => void;
  familyMembers: FamilyMember[];
  updateFamilyMember: (member: FamilyMember) => void;
  records: VaultRecord[];
  addRecord: (record: VaultRecord) => void;
  deleteRecord: (id: string) => void;
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (id: string) => void;
  articles: LibraryArticle[];
  toggleSavedArticle: (id: string) => void;
  activityHistory: VaultActivityEvent[];
  addActivity: (activity: VaultActivityEvent) => void;
  welcomeSeen: boolean;
  setWelcomeSeen: (seen: boolean) => void;
  milestoneSeen: boolean;
  setMilestoneSeen: (seen: boolean) => void;
  isLoaded: boolean;
  userEmail: string;
}

interface VaultProviderProps {
  children: React.ReactNode;
  initialUserName?: string | null;
  initialUserEmail?: string | null;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export function VaultProvider({ children, initialUserName, initialUserEmail }: VaultProviderProps) {
  const defaultFamilyMembers: FamilyMember[] = [
    {
      id: 'self',
      name: initialUserName || 'User',
      relationship: 'self',
      avatarInitials: initialUserName ? initialUserName.substring(0, 2).toUpperCase() : 'US',
      dob: '1990-01-01', // Mock dob for now
    },
    ...MOCK_FAMILY_MEMBERS.filter(m => m.id !== 'self')
  ];

  const [userPlan, setUserPlan] = useState<UserPlan>(MOCK_USER_PLAN);
  const [activeMemberId, setActiveMemberId] = useState<string>('self');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(defaultFamilyMembers);

  // Sync initial user props to state in case of client-side navigation between different users
  useEffect(() => {
    if (initialUserName) {
      setFamilyMembers(prev => prev.map(m => {
        if (m.id === 'self') {
          return {
            ...m,
            name: initialUserName,
            avatarInitials: initialUserName.substring(0, 2).toUpperCase()
          };
        }
        return m;
      }));
    }
  }, [initialUserName]);
  const [records, setRecords] = useState<VaultRecord[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [articles, setArticles] = useState<LibraryArticle[]>([]);
  const [activityHistory, setActivityHistory] = useState<VaultActivityEvent[]>(MOCK_VAULT_ACTIVITY);
  const [welcomeSeen, setWelcomeSeen] = useState<boolean>(false);
  const [milestoneSeen, setMilestoneSeen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Load from localStorage if available
    const storedPlan = localStorage.getItem('vault_user_plan');
    if (storedPlan) setUserPlan(JSON.parse(storedPlan));

    const storedActiveMember = localStorage.getItem('vault_active_member');
    if (storedActiveMember) setActiveMemberId(storedActiveMember);

    const storedWelcome = localStorage.getItem('vault_welcome_seen');
    if (storedWelcome) setWelcomeSeen(JSON.parse(storedWelcome));

    const storedMilestone = localStorage.getItem('vault_milestone_seen');
    if (storedMilestone) setMilestoneSeen(JSON.parse(storedMilestone));

    const storedSelfProfile = localStorage.getItem(`vault_self_profile_${initialUserEmail || 'default'}`);
    if (storedSelfProfile) {
      try {
        const parsedProfile = JSON.parse(storedSelfProfile);
        setFamilyMembers(prev => prev.map(m => m.id === 'self' ? { ...m, ...parsedProfile } : m));
      } catch (e) {}
    }

    // Load records/goals based on active member
    loadMemberData(storedActiveMember || 'self');
  }, []);

  const loadMemberData = (memberId: string) => {
    setIsLoaded(false);
    
    // Clear old local storage to prevent future confusion
    try {
      localStorage.removeItem(`vault_records_${memberId}`);
      localStorage.removeItem(`vault_goals_${memberId}`);
      localStorage.removeItem(`vault_activity_${memberId}`);
      localStorage.removeItem(`vault_saved_articles_${memberId}`);
      localStorage.removeItem(`vault_articles_${memberId}`);
    } catch (e) {}

    // Fetch real records from database
    fetch(`/api/records?memberId=${memberId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.records) {
          setRecords(data.records);
          setUserPlan(prev => ({ ...prev, recordsUsed: data.records.length }));
        } else {
          setRecords([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch records from DB', err);
        setRecords([]);
      })
      .finally(() => setIsLoaded(true));

    // Fetch real goals from database
    fetch(`/api/goals?memberId=${memberId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.goals) {
          setGoals(data.goals);
        } else {
          setGoals([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch goals from DB', err);
        setGoals([]);
      });

    // Fetch real articles from database
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.articles) {
          const dbArticles = data.articles.map((a: any) => ({
            id: a.id,
            slug: a.slug,
            title: a.title,
            category: a.category,
            excerpt: a.excerpt,
            readTime: a.read_time,
            date: a.publish_date || new Date().toISOString(),
            saved: false, // In a real app, query saved state
            heroImage: a.hero_image_url || '/images/exercise_plank.png',
            matchedGoalCategory: a.matched_goal_category
          }));
          setArticles(dbArticles);
        } else {
          setArticles([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch articles from DB', err);
        setArticles([]);
      });

    // Temporary: set empty activity until APIs are ready
    setActivityHistory([]);
  };

  const handleSetActiveMemberId = (id: string) => {
    setActiveMemberId(id);
    localStorage.setItem('vault_active_member', id);
    loadMemberData(id);
  };

  const handleSetUserPlan = (plan: UserPlan) => {
    setUserPlan(plan);
    localStorage.setItem('vault_user_plan', JSON.stringify(plan));
  };

  const handleSetWelcomeSeen = (seen: boolean) => {
    setWelcomeSeen(seen);
    localStorage.setItem('vault_welcome_seen', JSON.stringify(seen));
  };

  const handleSetMilestoneSeen = (seen: boolean) => {
    setMilestoneSeen(seen);
    localStorage.setItem('vault_milestone_seen', JSON.stringify(seen));
  };

  const addRecord = (record: VaultRecord) => {
    const newRecords = [record, ...records];
    setRecords(newRecords);
    localStorage.setItem(`vault_records_${activeMemberId}`, JSON.stringify(newRecords));
    
    // Save to DB
    fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    }).catch(err => console.error('Failed to save record to DB:', err));
    
    if (userPlan.tier === 'free') {
      const updatedPlan = { ...userPlan, recordsUsed: userPlan.recordsUsed + 1 };
      handleSetUserPlan(updatedPlan);
    }
    
    addActivity({
      id: `act_${Date.now()}`,
      memberId: activeMemberId,
      type: 'record_added',
      label: `Added ${record.title}`,
      timestamp: new Date().toISOString(),
      linkHref: `/records/${record.id}`
    });
  };

  const deleteRecord = (id: string) => {
    const newRecords = records.filter(r => r.id !== id);
    setRecords(newRecords);
    localStorage.setItem(`vault_records_${activeMemberId}`, JSON.stringify(newRecords));
    
    fetch(`/api/records?id=${id}`, {
      method: 'DELETE',
    }).catch(err => console.error('Failed to delete record from DB:', err));
    
    if (userPlan.tier === 'free' && userPlan.recordsUsed > 0) {
      const updatedPlan = { ...userPlan, recordsUsed: userPlan.recordsUsed - 1 };
      handleSetUserPlan(updatedPlan);
    }
  };

  const addGoal = (goal: Goal) => {
    const newGoals = [goal, ...goals];
    setGoals(newGoals);
    localStorage.setItem(`vault_goals_${activeMemberId}`, JSON.stringify(newGoals));
    
    fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goal)
    }).catch(err => console.error('Failed to save goal to DB:', err));
    
    addActivity({
      id: `act_${Date.now()}`,
      memberId: activeMemberId,
      type: 'goal_created',
      label: `Created goal: ${goal.title}`,
      timestamp: new Date().toISOString(),
      linkHref: `/goals`
    });
  };

  const updateGoal = (updatedGoal: Goal) => {
    const newGoals = goals.map(g => g.id === updatedGoal.id ? updatedGoal : g);
    setGoals(newGoals);
    localStorage.setItem(`vault_goals_${activeMemberId}`, JSON.stringify(newGoals));
    
    fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedGoal)
    }).catch(err => console.error('Failed to update goal in DB:', err));
    
    addActivity({
      id: `act_${Date.now()}`,
      memberId: activeMemberId,
      type: 'goal_updated',
      label: `Updated progress on ${updatedGoal.title}`,
      timestamp: new Date().toISOString(),
      linkHref: `/goals`
    });
  };

  const deleteGoal = (id: string) => {
    const newGoals = goals.filter(g => g.id !== id);
    setGoals(newGoals);
    localStorage.setItem(`vault_goals_${activeMemberId}`, JSON.stringify(newGoals));
    
    fetch(`/api/goals?id=${id}`, {
      method: 'DELETE',
    }).catch(err => console.error('Failed to delete goal from DB:', err));
  };

  const toggleSavedArticle = (id: string) => {
    const newArticles = articles.map(a => a.id === id ? { ...a, saved: !a.saved } : a);
    setArticles(newArticles);
    
    const savedIds = newArticles.filter(a => a.saved).map(a => a.id);
    localStorage.setItem(`vault_saved_articles_${activeMemberId}`, JSON.stringify(savedIds));
    
    const article = newArticles.find(a => a.id === id);
    if (article?.saved) {
      addActivity({
        id: `act_${Date.now()}`,
        memberId: activeMemberId,
        type: 'article_saved',
        label: `Saved "${article.title}"`,
        timestamp: new Date().toISOString(),
        linkHref: `/library`
      });
    }
  };

  const addActivity = (activity: VaultActivityEvent) => {
    const newActivity = [activity, ...activityHistory];
    setActivityHistory(newActivity);
  };

  const updateFamilyMember = (updatedMember: FamilyMember) => {
    const newMembers = familyMembers.map(m => m.id === updatedMember.id ? updatedMember : m);
    setFamilyMembers(newMembers);
    if (updatedMember.id === 'self') {
      localStorage.setItem(`vault_self_profile_${initialUserEmail || 'default'}`, JSON.stringify(updatedMember));
    }
  };

  return (
    <VaultContext.Provider value={{
      userPlan, setUserPlan: handleSetUserPlan,
      activeMemberId, setActiveMemberId: handleSetActiveMemberId,
      familyMembers, updateFamilyMember,
      records, addRecord, deleteRecord,
      goals, addGoal, updateGoal, deleteGoal,
      articles, toggleSavedArticle,
      activityHistory, addActivity,
      welcomeSeen, setWelcomeSeen: handleSetWelcomeSeen,
      milestoneSeen, setMilestoneSeen: handleSetMilestoneSeen,
      isLoaded,
      userEmail: initialUserEmail || 'user@example.com'
    }}>
      {children}
    </VaultContext.Provider>
  );
}

export function useVault() {
  const context = useContext(VaultContext);
  if (context === undefined) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return context;
}
