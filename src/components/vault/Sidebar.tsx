"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderLock, Target, BookOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const VAULT_NAV = [
  { label: 'Vault Home', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Records', href: '/records', icon: FolderLock },
  { label: 'Goals', href: '/goals', icon: Target },
  { label: 'Health Library', href: '/library', icon: BookOpen },
  { label: 'Profile', href: '/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[var(--sidebar-width,260px)] h-screen fixed top-0 left-0 bg-surface flex flex-col z-40 border-r border-border">
      <div className="p-6">
        <Link href="/" className="inline-block mb-8 transition-transform hover:scale-105">
          <div className="relative w-40 h-12">
            <Image
              src="/images/logo_transparent.png"
              alt="HealthGhuru Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
        
        <nav className="space-y-1 mt-4">
          {VAULT_NAV.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                data-cursor="tab"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-heading font-medium transition-all duration-200 border-l-4",
                  isActive 
                    ? "bg-primary/10 text-primary border-primary" 
                    : "text-text-secondary hover:text-dark hover:bg-surface border-transparent"
                )}
              >
                <Icon size={20} className={isActive ? "text-primary" : "text-text-secondary"} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
