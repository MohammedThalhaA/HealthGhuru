/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { auth } from '@/lib/auth/auth.config';

async function ensureTableExists() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS app_vault_records (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        member_id TEXT NOT NULL,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        doctor_or_facility TEXT,
        tags JSONB,
        file_name TEXT,
        file_url TEXT,
        extracted_text TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (err) {
    console.error('Failed to create app_vault_records table', err);
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    await ensureTableExists();
    
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get('memberId');
    
    let records;
    if (memberId) {
      records = await sql`SELECT * FROM app_vault_records WHERE user_id = ${session.user.id} AND member_id = ${memberId} ORDER BY created_at DESC`;
    } else {
      records = await sql`SELECT * FROM app_vault_records WHERE user_id = ${session.user.id} ORDER BY created_at DESC`;
    }
    
    // Transform to frontend model
    const transformed = records.map(r => ({
      id: r.id,
      memberId: r.member_id,
      type: r.type,
      title: r.title,
      date: r.date,
      doctorOrFacility: r.doctor_or_facility,
      tags: r.tags || [],
      fileName: r.file_name,
      fileUrl: r.file_url,
      extractedText: r.extracted_text,
      createdAt: r.created_at
    }));
    
    return NextResponse.json({ success: true, records: transformed });
  } catch (error: any) {
    console.error('Error fetching records:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    await ensureTableExists();
    
    const body = await request.json();
    const { id, memberId, type, title, date, doctorOrFacility, tags, fileName, fileUrl, extractedText, createdAt } = body;
    
    await sql`
      INSERT INTO app_vault_records (
        id, user_id, member_id, type, title, date, doctor_or_facility, tags, file_name, file_url, extracted_text, created_at
      ) VALUES (
        ${id}, ${session.user.id}, ${memberId}, ${type}, ${title}, ${date}, ${doctorOrFacility || null}, ${JSON.stringify(tags || [])}, ${fileName}, ${fileUrl || null}, ${extractedText || null}, ${createdAt || new Date().toISOString()}
      )
      ON CONFLICT (id) DO NOTHING
    `;
    
    return NextResponse.json({ success: true, record: body });
  } catch (error: any) {
    console.error('Error creating record:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }
    
    await sql`DELETE FROM app_vault_records WHERE id = ${id} AND user_id = ${session.user.id}`;
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
