'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, Settings, CreditCard, ShieldAlert } from 'lucide-react';
import { IconAction } from '@/components/ui/IconAction';

export function AdminSidebarNav() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
    { href: '/admin/content', label: 'Content / CMS', icon: FileText },
    { href: '/admin/audit-log', label: 'Audit Log', icon: ShieldAlert },
  ];

  return (
    <>
      <nav className="space-y-1 mt-4 flex-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              data-cursor="tab"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-heading font-medium transition-all duration-200 border-l-4 ${
                isActive 
                  ? "bg-primary/10 text-primary border-primary" 
                  : "text-text-secondary hover:text-dark hover:bg-surface border-transparent"
              }`}
            >
              <IconAction context="nav">
                <Icon size={20} className={isActive ? "text-primary" : "text-text-secondary"} />
              </IconAction>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4">
        <Link 
          href="/admin/settings" 
          data-cursor="tab"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-heading font-medium transition-all duration-200 border-l-4 ${
            pathname.startsWith('/admin/settings')
              ? "bg-primary/10 text-primary border-primary"
              : "text-text-secondary hover:text-dark hover:bg-surface border-transparent"
          }`}
        >
          <IconAction context="nav">
            <Settings size={20} className={pathname.startsWith('/admin/settings') ? "text-primary" : "text-text-secondary"} />
          </IconAction>
          Settings
        </Link>
      </div>
    </>
  );
}
