const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env' });

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  try {
    await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS hero_image_url VARCHAR(255)`;
    await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS hero_image_alt VARCHAR(255)`;
    await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS author_name VARCHAR(255) DEFAULT 'Dr. Sarah Jenkins'`;
    await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS author_avatar VARCHAR(255) DEFAULT '/images/exercise_plank.png'`;
    await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS author_credential VARCHAR(255) DEFAULT 'MD, Nutrition Science'`;
    await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'published'`;
    await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}'`;
    await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS blocks JSONB`;
    await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`;
    
    // Migrate existing `content` to `blocks` if `blocks` is null
    await sql`
      UPDATE articles 
      SET blocks = jsonb_build_array(
        jsonb_build_object(
          'type', 'paragraph',
          'id', gen_random_uuid(),
          'text', COALESCE(content, excerpt)
        )
      )
      WHERE blocks IS NULL
    `;
    
    console.log('Migration successful');
  } catch (e) {
    console.error(e);
  }
}
migrate();
