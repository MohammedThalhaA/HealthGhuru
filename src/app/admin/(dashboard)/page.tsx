import { requireAdmin } from '@/lib/auth/session';
import { sql } from '@/lib/db';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Users, FileText, Target, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  await requireAdmin();

  // Raw SQL queries to get KPI metrics
  const totalUsers = await sql`SELECT count(*) FROM users`;
  const proUsers = await sql`SELECT count(*) FROM user_plans WHERE tier = 'pro'`;
  const activeGoals = await sql`SELECT count(*) FROM goals WHERE status = 'active'`;
  const vaultRecords = await sql`SELECT count(*) FROM vault_records WHERE DATE(created_at) = CURRENT_DATE`;

  const kpis = [
    { label: 'Total Users', value: totalUsers[0].count, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pro Subscribers', value: proUsers[0].count, icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Records Today', value: vaultRecords[0].count, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Active Goals', value: activeGoals[0].count, icon: Target, color: 'text-accent', bg: 'bg-accent/10' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <ScrollReveal>
        <SectionHeader 
          title="Platform Analytics" 
          eyebrow="Admin Console"
          subtitle="Overview of HealthGhuru platform usage and metrics."
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <ScrollReveal key={i} delay={0.1 * i}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <p className="text-sm text-text-secondary font-medium mb-1">{kpi.label}</p>
                  <p className="text-3xl font-heading font-bold text-dark">{kpi.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${kpi.bg} ${kpi.color} flex items-center justify-center`}>
                  <Icon size={24} />
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal delay={0.4}>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border h-96 flex items-center justify-center">
          <p className="text-text-secondary italic">Recharts integration placeholder (Records Uploaded over 30 days)</p>
        </div>
      </ScrollReveal>
    </div>
  );
}
