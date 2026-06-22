import React from 'react';
import { VaultProvider } from '@/lib/context/VaultContext';
import { Sidebar } from '@/components/vault/Sidebar';
import { TopBar } from '@/components/vault/TopBar';
import CustomCursor from '@/components/ui/CustomCursor';

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VaultProvider>
      <div className="min-h-screen bg-surface flex">
        <CustomCursor />
        <Sidebar />
        <div className="flex-1 ml-[var(--sidebar-width,260px)] flex flex-col min-h-screen">
          <TopBar />
          <main className="flex-1 p-8 pb-20">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </VaultProvider>
  );
}
