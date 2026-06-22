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
  records: VaultRecord[];
  addRecord: (record: VaultRecord) => void;
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (goal: Goal) => void;
  articles: LibraryArticle[];
  toggleSavedArticle: (id: string) => void;
  activityHistory: VaultActivityEvent[];
  addActivity: (activity: VaultActivityEvent) => void;
  welcomeSeen: boolean;
  setWelcomeSeen: (seen: boolean) => void;
  milestoneSeen: boolean;
  setMilestoneSeen: (seen: boolean) => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export function VaultProvider({ children }: { children: React.ReactNode }) {
  const [userPlan, setUserPlan] = useState<UserPlan>(MOCK_USER_PLAN);
  const [activeMemberId, setActiveMemberId] = useState<string>('self');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(MOCK_FAMILY_MEMBERS);
  const [records, setRecords] = useState<VaultRecord[]>(MOCK_VAULT_RECORDS);
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
  const [articles, setArticles] = useState<LibraryArticle[]>(MOCK_LIBRARY_ARTICLES);
  const [activityHistory, setActivityHistory] = useState<VaultActivityEvent[]>(MOCK_VAULT_ACTIVITY);
  const [welcomeSeen, setWelcomeSeen] = useState<boolean>(false);
  const [milestoneSeen, setMilestoneSeen] = useState<boolean>(false);

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
    const storedRecords = localStorage.getItem(`vault_records_${memberId}`);
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords));
    } else {
      setRecords(memberId === 'self' ? MOCK_VAULT_RECORDS : []);
    }

    const storedGoals = localStorage.getItem(`vault_goals_${memberId}`);
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    } else {
      setGoals(memberId === 'self' ? MOCK_GOALS : []);
    }

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
        console.error('Failed to fetch real articles, using mock fallback', err);
        if (storedArticles) {
          const savedIds = JSON.parse(storedArticles);
          setArticles(MOCK_LIBRARY_ARTICLES.map(a => ({ ...a, saved: savedIds.includes(a.id) })));
        }
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

  const addGoal = (goal: Goal) => {
    const newGoals = [goal, ...goals];
    setGoals(newGoals);
    localStorage.setItem(`vault_goals_${activeMemberId}`, JSON.stringify(newGoals));
    
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
    
    addActivity({
      id: `act_${Date.now()}`,
      memberId: activeMemberId,
      type: 'goal_updated',
      label: `Updated progress on ${updatedGoal.title}`,
      timestamp: new Date().toISOString(),
      linkHref: `/goals`
    });
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

  return (
    <VaultContext.Provider value={{
      userPlan, setUserPlan: handleSetUserPlan,
      activeMemberId, setActiveMemberId: handleSetActiveMemberId,
      familyMembers,
      records, addRecord,
      goals, addGoal, updateGoal,
      articles, toggleSavedArticle,
      activityHistory, addActivity,
      welcomeSeen, setWelcomeSeen: handleSetWelcomeSeen,
      milestoneSeen, setMilestoneSeen: handleSetMilestoneSeen
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
