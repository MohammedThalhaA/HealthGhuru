import React from 'react';
import { VaultProvider } from '@/lib/context/VaultContext';
import Sidebar from '@/components/vault/Sidebar';
import TopBar from '@/components/vault/TopBar';

export default function VaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <VaultProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
        <Sidebar />
        <div className="flex-1 ml-64 flex flex-col h-full overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-8 relative">
            {children}
          </main>
        </div>
      </div>
    </VaultProvider>
  );
}
