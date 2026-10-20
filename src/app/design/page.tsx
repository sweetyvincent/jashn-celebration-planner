'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sparkles, Heart, Flame, Shield, Check, ArrowRight } from 'lucide-react';

export default function DesignSystemPage() {
  const coreTokens = [
    { name: 'Deep Plum', hex: '#2B1442', role: 'Primary Brand / Dark Background' },
    { name: 'Royal Indigo', hex: '#3B2A7A', role: 'Elevated Accents & Badges' },
    { name: 'Saffron Gold', hex: '#F4B33D', role: 'Celebratory Radiance & Primary Buttons' },
    { name: 'Rose', hex: '#E85D8A', role: 'Wedding Accent & Romantic Highlights' },
    { name: 'Marigold', hex: '#FF8A3D', role: 'Birthday Festive & Energy Accents' },
    { name: 'Ivory', hex: '#FFF8EE', role: 'Warm Canvas Surface & Cards' },
    { name: 'Emerald', hex: '#1F9D7A', role: 'Community & Eco-Friendly Highlights' }
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>Living Design System (Storybook-Lite)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1">
            Jashn Aesthetic Tokens & Components
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-2xl">
            A celebration design system pairing editorial typography with rich Indian celebration palettes and glassmorphism tactile feedback.
          </p>
        </div>

        {/* Section 1: Color Tokens */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">1. Palette & Cultural Tokens</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {coreTokens.map((t) => (
              <div key={t.hex} className="glass-panel p-4 rounded-2xl space-y-2">
                <div
                  className="w-full h-16 rounded-xl shadow-inner border border-white/20"
                  style={{ backgroundColor: t.hex }}
                />
                <div>
                  <div className="font-bold text-xs text-[var(--text-primary)]">{t.name}</div>
                  <div className="text-[10px] text-[var(--text-muted)] font-mono">{t.hex}</div>
                  <div className="text-[9px] text-[var(--text-muted)] mt-1">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Event Type Accent Shifts */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">2. Event Type Dynamic Accents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-3xl border-2 border-rose-500/30 space-y-3">
              <span className="text-3xl">💍</span>
              <h3 className="font-bold text-base text-[var(--text-primary)]">Wedding Context</h3>
              <p className="text-xs text-[var(--text-muted)]">
                Rose `#E85D8A` & Saffron Gold `#F4B33D` highlights evoke marigold pheras, mehendi rituals, and royal palace courtyards.
              </p>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-500/20 text-rose-600">
                  Rose Glow
                </span>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-600">
                  Gold Shimmer
                </span>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border-2 border-amber-500/30 space-y-3">
              <span className="text-3xl">🎂</span>
              <h3 className="font-bold text-base text-[var(--text-primary)]">Birthday Context</h3>
              <p className="text-xs text-[var(--text-muted)]">
                Marigold `#FF8A3D` & Indigo `#3B2A7A` provide vibrant playfulness, cake sparkles, and colorful confetti pops.
              </p>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-600">
                  Marigold Blast
                </span>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-purple-500/20 text-purple-600">
                  Indigo Pop
                </span>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border-2 border-emerald-500/30 space-y-3">
              <span className="text-3xl">🎪</span>
              <h3 className="font-bold text-base text-[var(--text-primary)]">Community Mela Context</h3>
              <p className="text-xs text-[var(--text-muted)]">
                Emerald `#1F9D7A` & Terracotta gold evoke sustainable Diwali melas, diya illumination, and community solidarity.
              </p>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-600">
                  Emerald Green
                </span>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-600">
                  Diya Saffron
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Component Library */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">3. Interactive Component Showcase</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons */}
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">Button Hierarchy</h3>
              <div className="flex flex-wrap items-center gap-3">
                <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs shadow-md">
                  Celebration Primary
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md">
                  AI Action Tool
                </button>
                <button className="px-5 py-2.5 rounded-xl glass-panel text-[var(--text-primary)] font-semibold text-xs">
                  Glass Secondary
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md">
                  Safe / Success
                </button>
              </div>
            </div>

            {/* Badges & Cards */}
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">Status Badges & Glows</h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600">
                  ✓ Verified Vendor
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-600">
                  ⚠️ Critical Curfew Risk
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600">
                  ⏳ 12-Month Timeline
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-600">
                  ✨ AI Copilot Tool
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
