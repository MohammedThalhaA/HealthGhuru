"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderLock, Target, BookOpen, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const VAULT_NAV = [
  { label: 'Home', desktopLabel: 'Vault Home', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Records', desktopLabel: 'Records', href: '/records', icon: FolderLock },
  { label: 'Goals', desktopLabel: 'Goals', href: '/goals', icon: Target },
  { label: 'Library', desktopLabel: 'Health Library', href: '/library', icon: BookOpen },
  { label: 'Profile', desktopLabel: 'Profile', href: '/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* ── MOBILE: Fixed bottom tab bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border flex items-end justify-around px-1 pb-[env(safe-area-inset-bottom,0px)]"
        style={{ height: '60px' }}
      >
        {VAULT_NAV.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 px-1 min-w-[56px] rounded-md transition-colors",
                isActive ? "text-primary" : "text-text-secondary"
              )}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] leading-tight font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── DESKTOP: Fixed left sidebar ── */}
      <aside className="hidden md:flex w-[var(--sidebar-width,260px)] h-screen fixed top-0 left-0 bg-surface flex-col z-40 border-r border-border">
        <div className="p-6 flex flex-col flex-1">
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
                  <span>{item.desktopLabel}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <Link
              href="/"
              data-cursor="tab"
              className="group flex items-center gap-3 px-4 py-3 rounded-lg font-heading font-medium transition-all duration-200 border-l-4 border-transparent text-text-secondary hover:text-red-600 hover:bg-red-50"
            >
              <LogOut size={20} className="text-text-secondary group-hover:text-red-600" />
              Sign Out
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
