const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const sql = neon(process.env.DATABASE_URL);

async function migrateAdmin() {
  console.log('Running admin migration...');
  try {
    // 1. Add role to users table with CHECK constraint
    await sql`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS role VARCHAR(10) NOT NULL DEFAULT 'user'
      CHECK (role IN ('user', 'admin'));
    `;
    console.log('Added role column to users table');

    // 2. Create admin_audit_log table
    await sql`
      CREATE TABLE IF NOT EXISTS admin_audit_log (
        id SERIAL PRIMARY KEY,
        admin_user_id UUID NOT NULL REFERENCES users(id),
        action_type VARCHAR(64) NOT NULL,
        target_table VARCHAR(64) NOT NULL,
        target_id VARCHAR(64),
        before_value JSONB,
        after_value JSONB,
        ip_address VARCHAR(45),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `;
    console.log('Created admin_audit_log table');

    // 3. Create indexes for performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_audit_admin_user ON admin_audit_log(admin_user_id);
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_audit_created_at ON admin_audit_log(created_at DESC);
    `;
    console.log('Created indexes for admin_audit_log');

    console.log('Admin migration complete!');
  } catch (error) {
    console.error('Error during admin migration:', error);
  }
}

migrateAdmin();
