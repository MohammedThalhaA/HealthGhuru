/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'vault_records'
    `;
    return NextResponse.json({ columns });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
