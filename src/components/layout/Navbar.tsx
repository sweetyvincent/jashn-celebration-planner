'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Calendar, PieChart, Users, Store, Lightbulb, MessageSquare, PlusCircle, Compass, Camera } from 'lucide-react';
import { useEventStore } from '@/lib/store/event-store';

export function Navbar() {
  const pathname = usePathname();
  const { eventTitle, eventType, loadDemoEvent } = useEventStore();

  const navLinks = [
    { href: '/', label: 'Story', icon: Compass },
    { href: '/dashboard', label: 'Dashboard', icon: Calendar },
    { href: '/event/budget', label: 'Budget', icon: PieChart },
    { href: '/event/timeline', label: 'Timeline', icon: Calendar },
    { href: '/event/vendors', label: 'Vendors', icon: Store },
    { href: '/event/ar-walkthrough', label: 'Venue AR', icon: Camera },
    { href: '/event/guests', label: 'Guests', icon: Users },
    { href: '/event/ideas', label: 'Ideas & Mood', icon: Lightbulb },
    { href: '/event/chat', label: 'AI Copilot', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F4B33D] to-[#E85D8A] flex items-center justify-center text-white text-lg font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              ✨
            </span>
            <div>
              <div className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-[#2B1442] via-[#E85D8A] to-[#F4B33D] dark:from-[#FFF8EE] dark:via-[#F4B33D] dark:to-[#E85D8A] bg-clip-text text-transparent">
                Jashn
              </div>
              <div className="text-[10px] tracking-wider uppercase font-semibold text-[var(--text-muted)] -mt-1">
                AI Celebration Studio
              </div>
            </div>
          </Link>

          {/* Active Event Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--border-color)] text-xs font-medium text-[var(--text-primary)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate max-w-[180px] font-semibold">{eventTitle}</span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#2B1442] text-white dark:bg-[#FFF8EE] dark:text-[#2B1442] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Demo Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-lg text-[11px] font-medium">
            <span className="text-[var(--text-muted)] px-1.5">Demo:</span>
            <button
              onClick={() => loadDemoEvent('wedding')}
              className={`px-2 py-0.5 rounded transition-all ${
                eventType === 'wedding'
                  ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 font-semibold'
                  : 'hover:text-rose-500'
              }`}
            >
              💍 Wedding
            </button>
            <button
              onClick={() => loadDemoEvent('birthday')}
              className={`px-2 py-0.5 rounded transition-all ${
                eventType === 'birthday'
                  ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-semibold'
                  : 'hover:text-amber-500'
              }`}
            >
              🎂 Birthday
            </button>
            <button
              onClick={() => loadDemoEvent('community')}
              className={`px-2 py-0.5 rounded transition-all ${
                eventType === 'community'
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'hover:text-emerald-500'
              }`}
            >
              🎪 Community
            </button>
          </div>

          {/* New Event Button */}
          <Link
            href="/start"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#F4B33D] to-[#E85D8A] text-white text-xs font-semibold shadow-md shadow-rose-500/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Plan Event</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
