const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env' });

const sql = neon(process.env.DATABASE_URL);

async function createAdmin() {
  const hash = await bcrypt.hash('admin123', 10);
  try {
    await sql`
      INSERT INTO users (id, name, email, password_hash, dob, gender, height, weight, city, role)
      VALUES (gen_random_uuid(), 'System Admin', 'admin@healthghuru.com', ${hash}, '1980-01-01', 'other', 170, 70, 'Admin City', 'admin')
      ON CONFLICT (email) DO UPDATE SET role = 'admin', password_hash = ${hash};
    `;
    console.log('Admin user created/updated: admin@healthghuru.com / admin123');
  } catch (err) {
    console.error(err);
  }
}

createAdmin();
