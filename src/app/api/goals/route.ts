/* eslint-disable @typescript-eslint/no-explicit-any */
import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

async function ensureTableExists() {
  await sql`
    CREATE TABLE IF NOT EXISTS app_vault_goals (
      id TEXT PRIMARY KEY,
      member_id TEXT NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      start_value NUMERIC NOT NULL,
      target_value NUMERIC NOT NULL,
      unit TEXT NOT NULL,
      target_date TIMESTAMP NOT NULL,
      status TEXT NOT NULL,
      history JSONB NOT NULL DEFAULT '[]'::jsonb
    );
  `;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get('memberId');
    
    if (!memberId) {
      return NextResponse.json({ success: false, error: 'memberId is required' }, { status: 400 });
    }
    
    await ensureTableExists();
    
    const goals = await sql`
      SELECT * FROM app_vault_goals 
      WHERE member_id = ${memberId}
      ORDER BY target_date ASC
    `;
    
    const formattedGoals = goals.map(g => ({
      id: g.id,
      memberId: g.member_id,
      title: g.title,
      category: g.category,
      startValue: Number(g.start_value),
      targetValue: Number(g.target_value),
      unit: g.unit,
      targetDate: g.target_date,
      status: g.status,
      history: g.history || []
    }));
    
    return NextResponse.json({ success: true, goals: formattedGoals });
  } catch (error: any) {
    console.error('Error fetching goals:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await ensureTableExists();
    
    // Check if goal exists to do an upsert
    const existing = await sql`SELECT id FROM app_vault_goals WHERE id = ${body.id}`;
    
    if (existing.length > 0) {
      // Update
      await sql`
        UPDATE app_vault_goals SET
          title = ${body.title},
          category = ${body.category},
          start_value = ${body.startValue},
          target_value = ${body.targetValue},
          unit = ${body.unit},
          target_date = ${body.targetDate},
          status = ${body.status},
          history = ${JSON.stringify(body.history)}::jsonb
        WHERE id = ${body.id}
      `;
    } else {
      // Insert
      await sql`
        INSERT INTO app_vault_goals (
          id, member_id, title, category, start_value, target_value, unit, target_date, status, history
        ) VALUES (
          ${body.id}, ${body.memberId}, ${body.title}, ${body.category}, 
          ${body.startValue}, ${body.targetValue}, ${body.unit}, 
          ${body.targetDate}, ${body.status}, ${JSON.stringify(body.history)}::jsonb
        )
      `;
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving goal:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }
    
    await sql`DELETE FROM app_vault_goals WHERE id = ${id}`;
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting goal:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
