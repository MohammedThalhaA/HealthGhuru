'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderLock, Target, BookOpen, User } from 'lucide-react';

const VAULT_NAV = [
  { label: 'Vault Home', href: '/vault', icon: LayoutDashboard },
  { label: 'Records', href: '/records', icon: FolderLock },
  { label: 'Goals', href: '/goals', icon: Target },
  { label: 'Health Library', href: '/library', icon: BookOpen },
  { label: 'Profile', href: '/profile', icon: User },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col fixed left-0 top-0">
      <div className="h-20 flex items-center px-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl leading-none">H</span>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">HealthGhuru</span>
        </Link>
      </div>

      <div className="p-4">
        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 mt-2">My Vault</p>
        <nav className="space-y-1">
          {VAULT_NAV.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-surface-alt text-primary-dark font-medium' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="w-10 h-10 bg-surface-alt text-primary rounded-full flex items-center justify-center mb-3">
            <FolderLock className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-semibold text-gray-900 mb-1">Secure Vault</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Your health data is stored securely and never shared without permission.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
