const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const sql = neon(process.env.DATABASE_URL);

async function initDb() {
  console.log('Initializing database tables...');
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        dob DATE,
        gender VARCHAR(50),
        height NUMERIC,
        weight NUMERIC,
        city VARCHAR(255),
        calorie_target INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Created users table');

    await sql`
      CREATE TABLE IF NOT EXISTS user_plans (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        tier VARCHAR(50) DEFAULT 'free',
        records_used INTEGER DEFAULT 0,
        records_limit INTEGER DEFAULT 10,
        active_goals_limit INTEGER DEFAULT 3,
        family_members_limit INTEGER DEFAULT 0,
        ads_enabled BOOLEAN DEFAULT TRUE,
        ocr_enabled BOOLEAN DEFAULT FALSE,
        data_export_enabled BOOLEAN DEFAULT FALSE,
        account_created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Created user_plans table');

    await sql`
      CREATE TABLE IF NOT EXISTS family_members (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        relationship VARCHAR(50) NOT NULL,
        avatar_initials VARCHAR(10),
        dob DATE
      );
    `;
    console.log('Created family_members table');

    await sql`
      CREATE TABLE IF NOT EXISTS vault_records (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        record_date TIMESTAMP WITH TIME ZONE NOT NULL,
        doctor_or_facility VARCHAR(255),
        tags TEXT[],
        file_name VARCHAR(255) NOT NULL,
        extracted_text TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Created vault_records table');

    await sql`
      CREATE TABLE IF NOT EXISTS goals (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        start_value NUMERIC NOT NULL,
        target_value NUMERIC NOT NULL,
        unit VARCHAR(50) NOT NULL,
        target_date TIMESTAMP WITH TIME ZONE NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Created goals table');

    await sql`
      CREATE TABLE IF NOT EXISTS goal_progress_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        goal_id UUID REFERENCES goals(id) ON DELETE CASCADE,
        entry_date TIMESTAMP WITH TIME ZONE NOT NULL,
        value NUMERIC NOT NULL,
        note TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Created goal_progress_entries table');

    await sql`
      CREATE TABLE IF NOT EXISTS articles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        excerpt TEXT NOT NULL,
        read_time INTEGER NOT NULL,
        publish_date TIMESTAMP WITH TIME ZONE NOT NULL,
        image_url VARCHAR(255),
        content TEXT,
        matched_goal_category VARCHAR(50)
      );
    `;
    console.log('Created articles table');

    await sql`
      CREATE TABLE IF NOT EXISTS user_saved_articles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, article_id)
      );
    `;
    console.log('Created user_saved_articles table');

    await sql`
      CREATE TABLE IF NOT EXISTS vault_activity_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        member_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
        type VARCHAR(50) NOT NULL,
        label VARCHAR(255) NOT NULL,
        event_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
        link_href VARCHAR(255) NOT NULL
      );
    `;
    console.log('Created vault_activity_events table');

    await sql`
      CREATE TABLE IF NOT EXISTS workout_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        log_date TIMESTAMP WITH TIME ZONE NOT NULL,
        type VARCHAR(50) NOT NULL,
        duration INTEGER NOT NULL,
        intensity VARCHAR(50) NOT NULL,
        calories INTEGER NOT NULL,
        notes TEXT
      );
    `;
    console.log('Created workout_logs table');

    await sql`
      CREATE TABLE IF NOT EXISTS sleep_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        log_date TIMESTAMP WITH TIME ZONE NOT NULL,
        bedtime TIME NOT NULL,
        wake_time TIME NOT NULL,
        duration NUMERIC NOT NULL,
        quality INTEGER NOT NULL,
        notes TEXT
      );
    `;
    console.log('Created sleep_logs table');

    await sql`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        entry_date TIMESTAMP WITH TIME ZONE NOT NULL,
        text TEXT NOT NULL,
        mood INTEGER NOT NULL
      );
    `;
    console.log('Created journal_entries table');

    await sql`
      CREATE TABLE IF NOT EXISTS meal_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        log_date DATE NOT NULL,
        UNIQUE(user_id, log_date)
      );
    `;
    console.log('Created meal_logs table');

    await sql`
      CREATE TABLE IF NOT EXISTS meal_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        meal_log_id UUID REFERENCES meal_logs(id) ON DELETE CASCADE,
        meal_type VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        calories INTEGER NOT NULL,
        protein NUMERIC NOT NULL,
        carbs NUMERIC NOT NULL,
        fat NUMERIC NOT NULL
      );
    `;
    console.log('Created meal_items table');

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initDb();
