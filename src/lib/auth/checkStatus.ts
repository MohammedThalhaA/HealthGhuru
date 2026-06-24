'use server';

import { sql } from '@/lib/db';

export async function checkUserStatus(email: string): Promise<string | null> {
  try {
    const users = await sql`SELECT status FROM users WHERE email = ${email}`;
    if (users.length > 0) {
      return users[0].status || 'active';
    }
    return null;
  } catch (error) {
    console.error('Error checking user status:', error);
    return null;
  }
}
