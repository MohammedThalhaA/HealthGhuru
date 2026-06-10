export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
}

export interface ExerciseData {
  name: string;
  description: string;
  image: string;
}

export interface SleepRisk {
  title: string;
  icon: string;
  description: string;
}

// Dashboard Types
export interface User {
  name: string;
  email: string;
  plan: 'free' | 'pro';
  avatar: string | null;
  dob: string;
  gender: string;
  height: number;
  weight: number;
  city: string;
  goals: HealthGoal[];
  calorieTarget: number;
}

export type HealthGoal =
  | 'lose_weight'
  | 'build_muscle'
  | 'sleep_better'
  | 'eat_healthier'
  | 'reduce_stress'
  | 'more_active';

export interface MealItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealLog {
  date: string;
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snacks: MealItem[];
}

export interface WorkoutLog {
  id: string;
  date: string;
  type: string;
  duration: number;
  intensity: 'light' | 'moderate' | 'intense';
  calories: number;
  notes?: string;
}

export interface SleepLog {
  date: string;
  bedtime: string;
  wakeTime: string;
  duration: number;
  quality: number;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  text: string;
  mood: number;
}

export type ArticleCategory = 'Nutrition' | 'Fitness' | 'Sleep' | 'Mental Health';

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: ArticleCategory;
  readTime: number;
  date: string;
  saved: boolean;
  readProgress: number;
  excerpt: string;
}

export interface WeeklyDataPoint {
  day: string;
  nutritionScore: number;
  sleepHours: number;
  activeMinutes: number;
  moodScore: number;
}
