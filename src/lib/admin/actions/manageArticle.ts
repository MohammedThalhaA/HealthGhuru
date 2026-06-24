'use server';

import { requireAdmin } from '@/lib/auth/session';
import { canManageArticles } from '@/lib/admin/permissions';
import { sql } from '@/lib/db';
import { writeAuditLog } from './auditLog';
import { z } from 'zod';
import { randomUUID } from 'crypto';

const articleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  slug: z.string().min(3),
  category: z.string(),
  matchedGoalCategory: z.string().optional(),
  excerpt: z.string(),
  readTime: z.number().int().min(1),
  status: z.enum(['draft', 'published']),
  heroImageUrl: z.string().optional(),
  heroImageAlt: z.string().optional(),
  authorName: z.string().optional(),
  authorAvatar: z.string().optional(),
  authorCredential: z.string().optional(),
  blocks: z.any().optional(),
  action: z.enum(['create', 'update', 'delete']),
});

export async function manageArticle(input: z.infer<typeof articleSchema>) {
  const session = await requireAdmin();
  if (!canManageArticles(session)) {
    throw new Error('Forbidden');
  }

  const validated = articleSchema.parse(input);

  if (validated.action === 'create') {
    const newId = randomUUID();
    await sql`
      INSERT INTO articles (
        id, title, slug, category, matched_goal_category, excerpt, read_time, status, publish_date,
        hero_image_url, hero_image_alt, author_name, author_avatar, author_credential, blocks
      )
      VALUES (
        ${newId}::uuid, ${validated.title}, ${validated.slug}, ${validated.category}, ${validated.matchedGoalCategory || null}, 
        ${validated.excerpt}, ${validated.readTime}, ${validated.status}, CURRENT_TIMESTAMP,
        ${validated.heroImageUrl || null}, ${validated.heroImageAlt || null}, ${validated.authorName || null}, 
        ${validated.authorAvatar || null}, ${validated.authorCredential || null}, ${JSON.stringify(validated.blocks || [])}::jsonb
      )
    `;

    await writeAuditLog({
      adminUserId: session.user.id,
      actionType: 'article_create',
      targetTable: 'articles',
      targetId: newId,
      afterValue: { title: validated.title, status: validated.status }
    });

    return { success: true, id: newId };
  } 
  
  if (validated.action === 'update' && validated.id) {
    const existing = await sql`SELECT * FROM articles WHERE id = ${validated.id}::uuid`;
    
    await sql`
      UPDATE articles 
      SET 
        title = ${validated.title},
        slug = ${validated.slug},
        category = ${validated.category},
        matched_goal_category = ${validated.matchedGoalCategory || null},
        excerpt = ${validated.excerpt},
        read_time = ${validated.readTime},
        status = ${validated.status},
        hero_image_url = ${validated.heroImageUrl || null},
        hero_image_alt = ${validated.heroImageAlt || null},
        author_name = ${validated.authorName || null},
        author_avatar = ${validated.authorAvatar || null},
        author_credential = ${validated.authorCredential || null},
        blocks = ${JSON.stringify(validated.blocks || [])}::jsonb,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${validated.id}::uuid
    `;

    await writeAuditLog({
      adminUserId: session.user.id,
      actionType: 'article_update',
      targetTable: 'articles',
      targetId: validated.id,
      beforeValue: existing[0],
      afterValue: { title: validated.title, status: validated.status }
    });

    return { success: true };
  }

  if (validated.action === 'delete' && validated.id) {
    // Hard delete
    await sql`DELETE FROM articles WHERE id = ${validated.id}::uuid`;

    await writeAuditLog({
      adminUserId: session.user.id,
      actionType: 'article_delete',
      targetTable: 'articles',
      targetId: validated.id,
      afterValue: { deleted_at: 'NOW()' }
    });

    return { success: true };
  }

  throw new Error('Invalid action or missing ID');
}
