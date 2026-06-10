import { Article, MealLog, WorkoutLog, SleepLog, WeeklyDataPoint, JournalEntry } from './types';

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'sun-salutation-secrets',
    title: 'Sun Salutation Secrets: Elevate Your Wellness with Surya Namaskar',
    category: 'Fitness',
    readTime: 5,
    date: '2026-06-05',
    saved: true,
    readProgress: 100,
    excerpt: 'Discover how 12 flowing poses can transform your morning routine and overall health.',
  },
  {
    id: '2',
    slug: 'nutrient-timing',
    title: 'Mastering Nutrient Timing: Optimizing Your Diet for Peak Performance',
    category: 'Nutrition',
    readTime: 7,
    date: '2026-06-03',
    saved: true,
    readProgress: 60,
    excerpt: 'When you eat matters as much as what you eat. Learn how to time your nutrition for maximum effect.',
  },
  {
    id: '3',
    slug: 'exercises-for-abs',
    title: 'The Best Exercises for Stronger Abs and a Stronger Core',
    category: 'Fitness',
    readTime: 4,
    date: '2026-06-01',
    saved: false,
    readProgress: 0,
    excerpt: 'Core strength is the foundation of all athletic movement. Here are the 7 most effective core exercises.',
  },
  {
    id: '4',
    slug: 'yoga-mental-health',
    title: 'The Benefits of Yoga for Mental Health: A Holistic Approach to Wellness',
    category: 'Mental Health',
    readTime: 6,
    date: '2026-05-28',
    saved: true,
    readProgress: 35,
    excerpt: 'Yoga is not just exercise. The mind-body connection it creates can dramatically reduce anxiety and depression.',
  },
  {
    id: '5',
    slug: 'boost-immune-system',
    title: 'Boost Your Immune System Naturally: Effective Strategies for Optimal Health',
    category: 'Nutrition',
    readTime: 5,
    date: '2026-05-25',
    saved: false,
    readProgress: 0,
    excerpt: 'Your immune system is your body\'s defense network. These 8 natural strategies will make it stronger.',
  },
  {
    id: '6',
    slug: 'sleep-quality-guide',
    title: 'Why Sleep Quality Matters More Than Sleep Quantity',
    category: 'Sleep',
    readTime: 6,
    date: '2026-05-22',
    saved: true,
    readProgress: 100,
    excerpt: 'Eight hours of bad sleep is worse than six hours of deep, restorative sleep. Here\'s what the science says.',
  },
  {
    id: '7',
    slug: 'stress-management',
    title: 'The Science of Stress: How Chronic Stress Destroys Your Health',
    category: 'Mental Health',
    readTime: 8,
    date: '2026-05-20',
    saved: false,
    readProgress: 0,
    excerpt: 'Cortisol, the stress hormone, affects everything from your weight to your immune system. Learn to manage it.',
  },
  {
    id: '8',
    slug: 'hydration-myths',
    title: 'Hydration Myths Debunked: How Much Water Do You Really Need?',
    category: 'Nutrition',
    readTime: 4,
    date: '2026-05-18',
    saved: true,
    readProgress: 100,
    excerpt: 'The 8-glasses-a-day rule is not based on science. Here\'s what nutritionists actually recommend.',
  },
  {
    id: '9',
    slug: 'morning-routine',
    title: '7 Morning Habits That Set You Up for a Healthier Day',
    category: 'Fitness',
    readTime: 5,
    date: '2026-05-15',
    saved: false,
    readProgress: 20,
    excerpt: 'How you start your morning determines the quality of your entire day. These 7 habits are backed by science.',
  },
  {
    id: '10',
    slug: 'gut-health',
    title: 'Your Gut is Your Second Brain: The Microbiome Guide',
    category: 'Nutrition',
    readTime: 9,
    date: '2026-05-12',
    saved: false,
    readProgress: 0,
    excerpt: '70% of your immune system lives in your gut. Here\'s how to feed your microbiome for optimal health.',
  },
];

export const MOCK_MEALS_TODAY = {
  breakfast: [
    { name: 'Oats with banana', calories: 280, protein: 8, carbs: 52, fat: 4 },
    { name: 'Green tea', calories: 2, protein: 0, carbs: 0, fat: 0 },
  ],
  lunch: [
    { name: 'Brown rice + dal', calories: 420, protein: 18, carbs: 72, fat: 6 },
    { name: 'Cucumber raita', calories: 65, protein: 3, carbs: 8, fat: 2 },
  ],
  dinner: [
    { name: 'Grilled chicken breast', calories: 220, protein: 42, carbs: 0, fat: 5 },
    { name: 'Stir-fried vegetables', calories: 95, protein: 3, carbs: 18, fat: 2 },
  ],
  snacks: [
    { name: 'Mixed nuts (30g)', calories: 185, protein: 5, carbs: 6, fat: 16 },
  ],
};

export const MOCK_WORKOUT_HISTORY = [
  { id: '1', type: 'Cycling', duration: 45, calories: 360, date: '2026-06-08' },
  { id: '2', type: 'Yoga', duration: 30, calories: 120, date: '2026-06-09' },
  { id: '3', type: 'Swimming', duration: 40, calories: 360, date: '2026-06-10' },
];

export const SLEEP_WEEK_DATA = [
  { day: 'Mon', hours: 5.5, quality: 2 },
  { day: 'Tue', hours: 7.0, quality: 4 },
  { day: 'Wed', hours: 6.5, quality: 3 },
  { day: 'Thu', hours: 8.0, quality: 5 },
  { day: 'Fri', hours: 7.5, quality: 4 },
  { day: 'Sat', hours: 9.0, quality: 5 },
  { day: 'Sun', hours: 6.0, quality: 3 },
];

export const MOOD_HISTORY = [
  { date: 'May 28', mood: 3 }, { date: 'May 29', mood: 4 },
  { date: 'May 30', mood: 2 }, { date: 'May 31', mood: 3 },
  { date: 'Jun 1',  mood: 4 }, { date: 'Jun 2',  mood: 5 },
  { date: 'Jun 3',  mood: 4 }, { date: 'Jun 4',  mood: 3 },
  { date: 'Jun 5',  mood: 4 }, { date: 'Jun 6',  mood: 4 },
  { date: 'Jun 7',  mood: 5 }, { date: 'Jun 8',  mood: 3 },
  { date: 'Jun 9',  mood: 4 }, { date: 'Jun 10', mood: 4 },
];

export const CALORIES_PER_MINUTE: Record<string, number> = {
  Cycling: 8, Walking: 5, Swimming: 9, Yoga: 4,
  'Push-ups': 7, Running: 10, Plank: 5, Other: 6,
};

export const WEEKLY_OVERVIEW_DATA: WeeklyDataPoint[] = [
  { day: 'Mon', nutritionScore: 80, sleepHours: 5.5, activeMinutes: 45, moodScore: 3 },
  { day: 'Tue', nutritionScore: 85, sleepHours: 7.0, activeMinutes: 30, moodScore: 4 },
  { day: 'Wed', nutritionScore: 70, sleepHours: 6.5, activeMinutes: 40, moodScore: 4 },
  { day: 'Thu', nutritionScore: 90, sleepHours: 8.0, activeMinutes: 60, moodScore: 5 },
  { day: 'Fri', nutritionScore: 85, sleepHours: 7.5, activeMinutes: 0, moodScore: 4 },
  { day: 'Sat', nutritionScore: 75, sleepHours: 9.0, activeMinutes: 90, moodScore: 5 },
  { day: 'Sun', nutritionScore: 80, sleepHours: 6.0, activeMinutes: 20, moodScore: 3 },
];
