'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { useEventStore } from '@/lib/store/event-store';
import {
  Sparkles,
  Calendar,
  PieChart,
  Users,
  Store,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  PlusCircle,
  FileDown
} from 'lucide-react';

export default function DashboardPage() {
  const {
    eventTitle,
    eventType,
    eventDate,
    city,
    guestCount,
    totalBudget,
    currency,
    plan,
    guests,
    loadDemoEvent
  } = useEventStore();

  const budgetItems = plan?.budget || [];
  const timelineTasks = plan?.timeline || [];
  const completedTasks = timelineTasks.filter((t) => t.status === 'done');
  const progressPercent = timelineTasks.length > 0
    ? Math.round((completedTasks.length / timelineTasks.length) * 100)
    : 0;

  const totalSpent = budgetItems.reduce((acc, b) => acc + (b.actualAmount || 0), 0);
  const totalPaid = budgetItems.reduce((acc, b) => acc + (b.paidAmount || 0), 0);
  const acceptedRSVP = guests.filter((g) => g.rsvpStatus === 'accepted').length;

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Header & Event Overview Bar */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/20 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <span>{eventType === 'wedding' ? '💍 Wedding' : eventType === 'birthday' ? '🎂 Birthday' : '🎪 Community'}</span>
                <span>•</span>
                <span>{city || 'Destination Set'}</span>
                {eventDate && (
                  <>
                    <span>•</span>
                    <span>{eventDate}</span>
                  </>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] mt-1 tracking-tight">
                {eventTitle}
              </h1>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {plan?.summary.theme || 'Celebration Blueprint Active'}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/event/chat"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md hover:opacity-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Copilot</span>
              </Link>
              <Link
                href="/start"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-panel text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Plan Another</span>
              </Link>
            </div>
          </div>

          {/* AI Next Best Action Daily Suggestion */}
          <div className="mt-6 pt-6 border-t border-[var(--border-color)] flex items-start gap-3 bg-amber-500/10 dark:bg-amber-500/5 p-4 rounded-2xl">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[var(--text-primary)] font-bold block text-sm">
                AI Next Best Action for Today:
              </strong>
              <span className="text-[var(--text-muted)] mt-0.5 block">
                {eventType === 'wedding'
                  ? 'Finalize Sangeet sound curfew permissions with Jaipur Haveli administration before vendor payments.'
                  : eventType === 'birthday'
                  ? 'Confirm dietary peanut/dairy allergies with the remaining 12 RSVP parents for custom snack box orders.'
                  : 'Submit society laser show clearance letter to the local municipal council safety office.'}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Key Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Progress */}
          <div className="glass-panel p-5 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
              <span>Overall Planning</span>
              <Calendar className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">
              {progressPercent}%
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              {completedTasks.length} of {timelineTasks.length} tasks completed
            </div>
            <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 mt-3 overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Budget */}
          <div className="glass-panel p-5 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
              <span>Target Budget</span>
              <PieChart className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
              ₹{totalBudget.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              Committed: ₹{totalSpent.toLocaleString()} ({Math.round((totalSpent / totalBudget) * 100)}%)
            </div>
            <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 mt-3 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Paid */}
          <div className="glass-panel p-5 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
              <span>Actual Paid Out</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
              ₹{totalPaid.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              Balance remaining: ₹{(totalBudget - totalPaid).toLocaleString()}
            </div>
          </div>

          {/* Guests */}
          <div className="glass-panel p-5 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
              <span>Confirmed RSVPs</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-2">
              {acceptedRSVP} / {guestCount}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              {guestCount - acceptedRSVP} awaiting response
            </div>
          </div>
        </div>

        {/* Operational Modules Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Budget Studio Card */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-[var(--text-primary)] flex items-center gap-2">
                <PieChart className="w-5 h-5 text-amber-500" />
                <span>Budget Studio</span>
              </h3>
              <Link href="/event/budget" className="text-xs font-semibold text-amber-600 hover:underline">
                Open Studio →
              </Link>
            </div>
            <div className="space-y-2 text-xs">
              {budgetItems.slice(0, 4).map((b) => (
                <div key={b.id} className="flex items-center justify-between py-1.5 border-b border-[var(--border-color)]">
                  <span className="font-medium text-[var(--text-primary)] truncate max-w-[180px]">{b.name}</span>
                  <span className="font-semibold text-[var(--text-muted)]">₹{b.plannedAmount.toLocaleString()} ({b.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Card */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-[var(--text-primary)] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-rose-500" />
                <span>Upcoming Milestones</span>
              </h3>
              <Link href="/event/timeline" className="text-xs font-semibold text-rose-600 hover:underline">
                View Schedule →
              </Link>
            </div>
            <div className="space-y-2 text-xs">
              {timelineTasks.slice(0, 4).map((t) => (
                <div key={t.id} className="flex items-center justify-between py-1.5 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-2 truncate max-w-[200px]">
                    <span className={`w-2 h-2 rounded-full ${t.status === 'done' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="font-medium text-[var(--text-primary)] truncate">{t.title}</span>
                  </div>
                  <span className="text-[var(--text-muted)] shrink-0">{t.phase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vendors Card */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-[var(--text-primary)] flex items-center gap-2">
                <Store className="w-5 h-5 text-emerald-500" />
                <span>Vendor Pipeline</span>
              </h3>
              <Link href="/event/vendors" className="text-xs font-semibold text-emerald-600 hover:underline">
                Manage Vendors →
              </Link>
            </div>
            <div className="space-y-2 text-xs">
              {(plan?.vendors || []).slice(0, 4).map((v) => (
                <div key={v.id} className="flex items-center justify-between py-1.5 border-b border-[var(--border-color)]">
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">{v.name}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">{v.category}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
