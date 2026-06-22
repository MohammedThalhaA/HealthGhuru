import { requireAdmin } from '@/lib/auth/session';
import { sql } from '@/lib/db';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AuditLogClient } from './AuditLogClient';

export default async function AdminAuditLogPage() {
  await requireAdmin();

  // In a real app we'd paginate at the DB level via query params, 
  // but for simplicity we'll fetch top 100
  const logs = await sql`
    SELECT 
      a.id, 
      a.action_type, 
      a.target_table, 
      a.target_id, 
      a.before_value, 
      a.after_value, 
      a.created_at,
      u.name as admin_name
    FROM admin_audit_log a
    JOIN users u ON a.admin_user_id = u.id
    ORDER BY a.created_at DESC
    LIMIT 100
  `;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <ScrollReveal>
        <SectionHeader 
          title="Audit Log" 
          eyebrow="Admin Console"
          subtitle="Track all administrative actions performed on the platform."
        />
      </ScrollReveal>

      <ScrollReveal delay={0.2} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(46,125,50,0.08)] border border-border overflow-hidden p-1">
        <AuditLogClient initialLogs={logs} />
      </ScrollReveal>
    </div>
  );
}
