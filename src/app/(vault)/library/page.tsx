"use client";

import React, { useState } from 'react';
import { useVault } from '@/lib/context/VaultContext';
import { LibraryFilterBar } from '@/components/vault/library/LibraryFilterBar';
import { PersonalizedFeed } from '@/components/vault/library/PersonalizedFeed';
import { AdSlot } from '@/components/ui/AdSlot';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState('For You');
  const { userPlan } = useVault();
  const isFree = userPlan.tier === 'free';

  return (
    <div className="space-y-4 md:space-y-8 animate-in fade-in duration-500">
      <ScrollReveal>
        <SectionHeader 
          title="Health Library" 
          eyebrow="My Vault"
          subtitle="Articles curated for your health journey."
        />
      </ScrollReveal>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-8 items-start">
        <div className="flex-1 w-full min-w-0">
          <ScrollReveal delay={0.1}>
            <LibraryFilterBar activeFilter={activeFilter} onChange={setActiveFilter} />
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="min-h-[300px] md:min-h-[500px]">
            <PersonalizedFeed filter={activeFilter} />
          </ScrollReveal>
        </div>

        {isFree && (
          <div className="hidden lg:block w-[300px] shrink-0 sticky top-28">
            <ScrollReveal delay={0.3}>
              <AdSlot />
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  );
}
