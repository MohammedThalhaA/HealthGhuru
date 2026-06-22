import { requireAdmin } from '@/lib/auth/session';
import { sql } from '@/lib/db';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArticleTableClient } from './ArticleTableClient';

export default async function AdminContentPage() {
  await requireAdmin();

  const articles = await sql`
    SELECT id, title, category, status, publish_date as date, read_time
    FROM articles
    WHERE deleted_at IS NULL
    ORDER BY publish_date DESC
  `;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <ScrollReveal>
          <SectionHeader 
            title="Content Management" 
            eyebrow="Admin Console"
            subtitle="Manage and publish articles to the Health Library."
          />
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <Link 
            href="/admin/content/new"
            className="bg-accent hover:opacity-90 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5 inline-block"
          >
            + New Article
          </Link>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.2} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(46,125,50,0.08)] border border-border overflow-hidden p-1">
        <ArticleTableClient initialArticles={articles} />
      </ScrollReveal>
    </div>
  );
}
