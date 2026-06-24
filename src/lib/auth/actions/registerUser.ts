'use server';

import { sql } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { MOCK_USER_PLAN } from '@/lib/mockData';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  plan: z.enum(['free', 'premium']),
  phone: z.string().optional(),
});

export async function registerUser(input: z.infer<typeof registerSchema>) {
  const { name, email, password, plan } = registerSchema.parse(input);

  // Check if email already exists
  const existingUsers = await sql`SELECT id FROM users WHERE email = ${email}`;
  if (existingUsers.length > 0) {
    throw new Error('An account with this email already exists.');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const newUsers = await sql`
    INSERT INTO users (name, email, password_hash, role, status)
    VALUES (${name}, ${email}, ${passwordHash}, 'user', 'active')
    RETURNING id;
  `;
  const userId = newUsers[0].id;

  // Create user plan based on selection
  // Base configuration using MOCK_USER_PLAN limits as a template
  const isPro = plan === 'premium';
  
  await sql`
    INSERT INTO user_plans (
      user_id, tier, records_used, records_limit, active_goals_limit, 
      family_members_limit, ads_enabled, ocr_enabled, data_export_enabled
    )
    VALUES (
      ${userId}::uuid, 
      ${isPro ? 'pro' : 'free'}, 
      0, 
      ${isPro ? 99999 : MOCK_USER_PLAN.recordsLimit}, 
      ${isPro ? 99999 : MOCK_USER_PLAN.activeGoalsLimit}, 
      ${isPro ? 5 : MOCK_USER_PLAN.familyMembersLimit}, 
      ${!isPro}, 
      ${isPro}, 
      ${isPro}
    );
  `;

  return { success: true, userId };
}
