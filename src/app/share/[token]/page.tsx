'use client';

import React from 'react';
import Link from 'next/link';
import { useEventStore } from '@/lib/store/event-store';
import { Sparkles, Calendar, PieChart, Users, Store, ShieldCheck, Heart } from 'lucide-react';

export default function SharePlanPage() {
  const { eventTitle, eventType, eventDate, city, guestCount, totalBudget, plan } = useEventStore();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-6 sm:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shared Read-Only Blueprint</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            {eventTitle}
          </h1>
          <p className="text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
            {plan?.summary.description || 'Complete logistical & creative celebration master plan.'}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-[var(--text-primary)] pt-2">
            <span>📅 {eventDate || 'Auspicious Date'}</span>
            <span>•</span>
            <span>📍 {city || 'Destination'}</span>
            <span>•</span>
            <span>👥 {guestCount} Guests</span>
            <span>•</span>
            <span>💰 ₹{totalBudget.toLocaleString()}</span>
          </div>
        </div>

        {/* Budget Summary */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <PieChart className="w-5 h-5 text-amber-500" />
            <span>Category Budget Allocations</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {plan?.budget.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)]">
                <span className="text-xs font-medium text-[var(--text-muted)] block truncate">{b.name}</span>
                <span className="text-base font-extrabold text-[var(--text-primary)] mt-1 block">
                  ₹{b.plannedAmount.toLocaleString()}
                </span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">{b.percentage}% weight</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Milestones */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-rose-500" />
            <span>Key Timeline Milestones</span>
          </h2>
          <div className="space-y-2">
            {plan?.timeline.slice(0, 6).map((t) => (
              <div key={t.id} className="flex justify-between items-center p-3 rounded-xl bg-black/5 dark:bg-white/5 text-xs">
                <span className="font-semibold text-[var(--text-primary)]">{t.title}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/15 text-amber-600 font-bold uppercase">
                  {t.phase}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs shadow-md"
          >
            <span>Plan Your Own Celebration with Jashn AI</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
