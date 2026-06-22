import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import {
  MOCK_ARTICLES,
  MOCK_MEALS_TODAY,
  MOCK_WORKOUT_HISTORY,
  MOCK_USER_PLAN,
  MOCK_FAMILY_MEMBERS,
  MOCK_VAULT_RECORDS,
  MOCK_GOALS,
  MOCK_LIBRARY_ARTICLES,
  MOCK_VAULT_ACTIVITY
} from '../src/lib/mockData';

dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const sql = neon(process.env.DATABASE_URL);

async function seedDb() {
  console.log('Seeding database...');
  try {
    // 1. Create a dummy user
    const passwordHash = await bcrypt.hash('password123', 10);
    const users = await sql`
      INSERT INTO users (name, email, password_hash, dob, gender, height, weight, city, calorie_target)
      VALUES ('Mohammed Thalha', 'user@example.com', ${passwordHash}, '1990-01-01', 'male', 175, 80, 'New York', 2200)
      RETURNING id;
    `;
    const userId = users[0].id;
    console.log(`Created user with ID: ${userId}`);

    // 2. Create user plan
    await sql`
      INSERT INTO user_plans (user_id, tier, records_used, records_limit, active_goals_limit, family_members_limit, ads_enabled, ocr_enabled, data_export_enabled)
      VALUES (${userId}, ${MOCK_USER_PLAN.tier}, ${MOCK_USER_PLAN.recordsUsed}, ${MOCK_USER_PLAN.recordsLimit}, ${MOCK_USER_PLAN.activeGoalsLimit}, ${MOCK_USER_PLAN.familyMembersLimit}, ${MOCK_USER_PLAN.adsEnabled}, ${MOCK_USER_PLAN.ocrEnabled}, ${MOCK_USER_PLAN.dataExportEnabled});
    `;
    
    // 3. Family members
    const familyMemberMap = new Map();
    for (const member of MOCK_FAMILY_MEMBERS) {
      const inserted = await sql`
        INSERT INTO family_members (user_id, name, relationship, avatar_initials, dob)
        VALUES (${userId}, ${member.name}, ${member.relationship}, ${member.avatarInitials}, ${member.dob ? new Date(member.dob) : null})
        RETURNING id;
      `;
      familyMemberMap.set(member.id, inserted[0].id);
    }
    const selfMemberId = familyMemberMap.get('self');
    console.log('Created family members');

    // 4. Articles
    const articleMap = new Map();
    for (const article of [...MOCK_ARTICLES, ...MOCK_LIBRARY_ARTICLES.filter(a => !MOCK_ARTICLES.some(ma => ma.slug === a.slug))]) {
      const inserted = await sql`
        INSERT INTO articles (slug, title, category, excerpt, read_time, publish_date, image_url, matched_goal_category)
        VALUES (${article.slug}, ${article.title}, ${article.category}, ${article.excerpt}, ${article.readTime}, ${new Date(article.date)}, ${'image' in article ? article.image : null}, ${'matchedGoalCategory' in article ? article.matchedGoalCategory : null})
        ON CONFLICT (slug) DO NOTHING
        RETURNING id;
      `;
      if (inserted.length > 0) {
        articleMap.set(article.slug, inserted[0].id);
        if (article.saved) {
           await sql`
             INSERT INTO user_saved_articles (user_id, article_id)
             VALUES (${userId}, ${inserted[0].id})
             ON CONFLICT DO NOTHING;
           `;
        }
      }
    }
    console.log('Created articles');

    // 5. Vault Records
    for (const record of MOCK_VAULT_RECORDS) {
      await sql`
        INSERT INTO vault_records (user_id, member_id, type, title, record_date, doctor_or_facility, tags, file_name, created_at)
        VALUES (${userId}, ${selfMemberId}, ${record.type}, ${record.title}, ${new Date(record.date)}, ${record.doctorOrFacility || null}, ${record.tags}, ${record.fileName}, ${new Date(record.createdAt)});
      `;
    }
    console.log('Created vault records');

    // 6. Goals
    for (const goal of MOCK_GOALS) {
      const insertedGoal = await sql`
        INSERT INTO goals (user_id, member_id, title, category, start_value, target_value, unit, target_date, status)
        VALUES (${userId}, ${selfMemberId}, ${goal.title}, ${goal.category}, ${goal.startValue}, ${goal.targetValue}, ${goal.unit}, ${new Date(goal.targetDate)}, ${goal.status})
        RETURNING id;
      `;
      const goalId = insertedGoal[0].id;
      
      for (const history of goal.history) {
        await sql`
          INSERT INTO goal_progress_entries (goal_id, entry_date, value)
          VALUES (${goalId}, ${new Date(history.date)}, ${history.value});
        `;
      }
    }
    console.log('Created goals');

    // 7. Vault Activity Events
    for (const event of MOCK_VAULT_ACTIVITY) {
      await sql`
        INSERT INTO vault_activity_events (user_id, member_id, type, label, event_timestamp, link_href)
        VALUES (${userId}, ${selfMemberId}, ${event.type}, ${event.label}, ${new Date(event.timestamp)}, ${event.linkHref});
      `;
    }
    console.log('Created vault activity events');

    // 8. Workout history
    for (const workout of MOCK_WORKOUT_HISTORY) {
      await sql`
        INSERT INTO workout_logs (user_id, log_date, type, duration, intensity, calories)
        VALUES (${userId}, ${new Date(workout.date)}, ${workout.type}, ${workout.duration}, 'moderate', ${workout.calories});
      `;
    }

    // 9. Meal Logs (today)
    const today = new Date().toISOString().split('T')[0];
    const insertedMealLog = await sql`
      INSERT INTO meal_logs (user_id, log_date)
      VALUES (${userId}, ${today})
      RETURNING id;
    `;
    const mealLogId = insertedMealLog[0].id;

    for (const type of ['breakfast', 'lunch', 'dinner', 'snacks']) {
      const items = MOCK_MEALS_TODAY[type as keyof typeof MOCK_MEALS_TODAY];
      for (const item of items) {
        await sql`
          INSERT INTO meal_items (meal_log_id, meal_type, name, calories, protein, carbs, fat)
          VALUES (${mealLogId}, ${type}, ${item.name}, ${item.calories}, ${item.protein}, ${item.carbs}, ${item.fat});
        `;
      }
    }
    console.log('Created meal logs and workout logs');

    console.log('Database seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDb();
