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
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export function VaultProvider({ children }: { children: React.ReactNode }) {
  const [userPlan, setUserPlan] = useState<UserPlan>(MOCK_USER_PLAN);
  const [activeMemberId, setActiveMemberId] = useState<string>('self');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(MOCK_FAMILY_MEMBERS);
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

    // Load records/goals based on active member
    loadMemberData(storedActiveMember || 'self');
  }, []);

  const loadMemberData = (memberId: string) => {
    setIsLoaded(false);
    // Fetch real records from database
    fetch(`/api/records?memberId=${memberId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.records) {
          // Merge local storage records with DB records
          const storedRecords = localStorage.getItem(`vault_records_${memberId}`);
          let mergedRecords = data.records;
          
          if (storedRecords) {
             const localRecords = JSON.parse(storedRecords);
             // Add any local records that aren't in the DB
             const dbIds = new Set(data.records.map((r: any) => r.id));
             const uniqueLocal = localRecords.filter((r: any) => !dbIds.has(r.id));
             mergedRecords = [...uniqueLocal, ...mergedRecords];
             
             // Sync the unique local ones to DB now
             uniqueLocal.forEach((r: any) => {
               fetch('/api/records', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(r)
               }).catch(console.error);
             });
          }
          
          // We no longer automatically re-seed mock data if empty, so the user can have an empty vault.
          
          setRecords(mergedRecords);
          setUserPlan(prev => ({ ...prev, recordsUsed: mergedRecords.length }));
        } else {
          const storedRecords = localStorage.getItem(`vault_records_${memberId}`);
          const fallbackRecords = storedRecords ? JSON.parse(storedRecords) : (memberId === 'self' ? MOCK_VAULT_RECORDS : []);
          setRecords(fallbackRecords);
          setUserPlan(prev => ({ ...prev, recordsUsed: fallbackRecords.length }));
        }
      })
      .catch(err => {
        console.error('Failed to fetch records from DB, using fallback', err);
        const storedRecords = localStorage.getItem(`vault_records_${memberId}`);
        setRecords(storedRecords ? JSON.parse(storedRecords) : (memberId === 'self' ? MOCK_VAULT_RECORDS : []));
      })
      .finally(() => setIsLoaded(true));

    // Fetch real goals from database
    fetch(`/api/goals?memberId=${memberId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.goals) {
          const storedGoals = localStorage.getItem(`vault_goals_${memberId}`);
          let mergedGoals = data.goals;
          
          if (storedGoals) {
             const localGoals = JSON.parse(storedGoals);
             const dbGoalsMap = new Map(data.goals.map((g: any) => [g.id, g]));
             
             const syncedGoals = localGoals.map((localGoal: any) => {
               const dbGoal = dbGoalsMap.get(localGoal.id) as any;
               if (!dbGoal) {
                 fetch('/api/goals', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(localGoal)
                 }).catch(console.error);
                 return localGoal;
               } else if (localGoal.history.length > dbGoal.history.length) {
                 fetch('/api/goals', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(localGoal)
                 }).catch(console.error);
                 return localGoal;
               }
               return dbGoal;
             });
             
             const localIds = new Set(localGoals.map((g: any) => g.id));
             const uniqueDb = data.goals.filter((g: any) => !localIds.has(g.id));
             
             mergedGoals = [...syncedGoals, ...uniqueDb];
          }
          setGoals(mergedGoals);
        } else {
          const storedGoals = localStorage.getItem(`vault_goals_${memberId}`);
          setGoals(storedGoals ? JSON.parse(storedGoals) : []);
        }
      })
      .catch(err => {
        console.error('Failed to fetch real goals, using local fallback', err);
        const storedGoals = localStorage.getItem(`vault_goals_${memberId}`);
        setGoals(storedGoals ? JSON.parse(storedGoals) : []);
      });

    const storedArticles = localStorage.getItem(`vault_saved_articles_${memberId}`);
    
    // Fetch real articles from database
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.articles) {
          const dbArticles = data.articles.map((a: any) => ({
            id: a.id,
            slug: a.slug,
            title: a.title,
            excerpt: a.excerpt,
            category: a.category,
            matchedGoalCategory: a.matched_goal_category,
            heroImage: a.hero_image_url || a.image_url || '/images/exercise_push.png',
            readTime: `${a.read_time} min`,
            saved: storedArticles ? JSON.parse(storedArticles).includes(a.id) : false
          }));
          setArticles(dbArticles);
        }
      })
      .catch(err => {
        console.error('Failed to fetch real articles, using local fallback', err);
        setArticles([]);
      });
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
      localStorage.setItem('vault_self_profile', JSON.stringify(updatedMember));
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
      isLoaded
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
