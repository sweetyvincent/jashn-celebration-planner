'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { CelebrationCanvas } from '@/components/3d/CelebrationCanvas';
import { useEventStore } from '@/lib/store/event-store';
import { EventType } from '@/types/event';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Calendar,
  PieChart,
  Users,
  Store,
  Lightbulb,
  MessageSquare,
  Flame,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';

export default function LandingPage() {
  const [activeScene, setActiveScene] = useState<EventType>('wedding');
  const { loadDemoEvent } = useEventStore();

  const handleDemoSelect = (type: EventType) => {
    setActiveScene(type);
    loadDemoEvent(type);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      {/* Hero Section with 3D Canvas Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
        {/* Full-screen 3D Atmosphere */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
          <CelebrationCanvas eventType={activeScene} intensity="hero" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-500/30 text-xs font-semibold text-[var(--text-primary)] shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>AI-Powered Event & Celebration Architect</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15]">
            From a Spark of Thought to{' '}
            <span className="text-gold-gradient block sm:inline">a Flawless Celebration</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[var(--text-muted)] font-medium leading-relaxed">
            Organize weddings, milestone birthdays, and community festivals with cinematic 3D planning,
            intelligent budget rebalancing, and an empathetic AI copilot that acts on your word.
          </p>

          {/* Event Scene Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleDemoSelect('wedding')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                activeScene === 'wedding'
                  ? 'glass-panel-elevated ring-2 ring-rose-500 text-rose-600 dark:text-rose-400 scale-105'
                  : 'glass-panel text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>💍</span>
              <span>Royal Wedding</span>
            </button>
            <button
              onClick={() => handleDemoSelect('birthday')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                activeScene === 'birthday'
                  ? 'glass-panel-elevated ring-2 ring-amber-500 text-amber-600 dark:text-amber-400 scale-105'
                  : 'glass-panel text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>🎂</span>
              <span>Milestone Birthday</span>
            </button>
            <button
              onClick={() => handleDemoSelect('community')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                activeScene === 'community'
                  ? 'glass-panel-elevated ring-2 ring-emerald-500 text-emerald-600 dark:text-emerald-400 scale-105'
                  : 'glass-panel text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>🎪</span>
              <span>Community Mela</span>
            </button>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/start"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F4B33D] via-[#FF8A3D] to-[#E85D8A] text-white text-base font-bold shadow-xl shadow-rose-500/25 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Start Planning (3 Mins)</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass-panel text-[var(--text-primary)] text-base font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Explore Live Demo Plan</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10 border-t border-[var(--border-color)]">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">&lt; 3 mins</div>
              <div className="text-xs text-[var(--text-muted)] font-medium">To complete blueprint</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">100%</div>
              <div className="text-xs text-[var(--text-muted)] font-medium">Editable & Undoable</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">0 Keys</div>
              <div className="text-xs text-[var(--text-muted)] font-medium">Required for full demo</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">60 FPS</div>
              <div className="text-xs text-[var(--text-muted)] font-medium">Smooth 3D + Lite fallback</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Every Dimension of Your Celebration, Mastered
          </h2>
          <p className="text-base text-[var(--text-muted)]">
            A cohesive suite combining creative inspiration with rigorous logistical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1: Budget Studio */}
          <div className="glass-panel p-6 rounded-3xl hover:shadow-xl transition-all border border-amber-500/20">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
              <PieChart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">3D Budget Studio</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              Visual category breakdowns, planned vs actual spend, contingency safety-cushions, and instant "What-if" sliders.
            </p>
            <Link href="/event/budget" className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline">
              <span>Explore Budget Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 2: Timeline & Run-of-Show */}
          <div className="glass-panel p-6 rounded-3xl hover:shadow-xl transition-all border border-rose-500/20">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Timeline & Run-of-Show</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              Backward planning from 12 months down to minute-by-minute day-of schedules with milestone countdowns.
            </p>
            <Link href="/event/timeline" className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1 hover:underline">
              <span>View Interactive Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 3: AI Copilot with Function Calling */}
          <div className="glass-panel p-6 rounded-3xl hover:shadow-xl transition-all border border-purple-500/20">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Actionable AI Copilot</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              Chat in natural language. Say "Cut budget by 10%" or "Add Jain catering task" and watch the plan apply changes with full undo.
            </p>
            <Link href="/event/chat" className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline">
              <span>Test AI Copilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 4: Vendor Pipeline & Questions */}
          <div className="glass-panel p-6 rounded-3xl hover:shadow-xl transition-all border border-emerald-500/20">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Vendor Tracker & Advice</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              Track venues, decorators, and caterers through quotes and payments. Includes AI questions to ask and red flag checklists.
            </p>
            <Link href="/event/vendors" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline">
              <span>Manage Vendors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 5: Guests & Seating */}
          <div className="glass-panel p-6 rounded-3xl hover:shadow-xl transition-all border border-blue-500/20">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Guest Lists & RSVP</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              Manage dietary tags, plus-ones, table assignments, and share a public RSVP invitation link.
            </p>
            <Link href="/event/guests" className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
              <span>Organize Guests</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 6: Ideas & Moodboard */}
          <div className="glass-panel p-6 rounded-3xl hover:shadow-xl transition-all border border-amber-600/20">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/10 flex items-center justify-center text-amber-600 mb-4">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Ideas Studio & Moodboard</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              Color swatches, cultural theme concepts, creative menu items, and budget-saving hacks curated for your event.
            </p>
            <Link href="/event/ideas" className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline">
              <span>Browse Curated Moodboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[var(--border-color)] py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-[var(--text-muted)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>✨</span>
            <span className="font-bold text-[var(--text-primary)]">Jashn</span>
            <span>— GenAI & 3D Celebration Architect</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/design" className="hover:text-[var(--text-primary)] transition-colors">
              Design System
            </Link>
            <Link href="/dashboard" className="hover:text-[var(--text-primary)] transition-colors">
              Dashboard
            </Link>
            <Link href="/start" className="hover:text-[var(--text-primary)] transition-colors">
              Wizard
            </Link>
          </div>
          <div>Built with Next.js 15, Three.js & Google Gemini</div>
        </div>
      </footer>
    </div>
  );
}
