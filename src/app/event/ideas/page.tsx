'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { useEventStore } from '@/lib/store/event-store';
import { IdeaItem } from '@/types/event';
import {
  Lightbulb,
  Bookmark,
  Sparkles,
  Flame,
  Palette,
  Utensils,
  Music,
  Gift,
  HelpCircle,
  RefreshCw,
  Plus
} from 'lucide-react';

export default function IdeasStudioPage() {
  const { eventTitle, plan, toggleSaveIdea } = useEventStore();
  const [selectedKind, setSelectedKind] = useState<string>('All');
  const [isTwisting, setIsTwisting] = useState(false);
  const [activeTwist, setActiveTwist] = useState<string | null>(null);

  const ideas = plan?.ideas || [];

  const kinds = [
    { id: 'All', label: 'All Inspirations', icon: Lightbulb },
    { id: 'theme', label: 'Themes', icon: Palette },
    { id: 'decor', label: 'Decor Concepts', icon: Sparkles },
    { id: 'menu', label: 'Culinary Menus', icon: Utensils },
    { id: 'entertainment', label: 'Entertainment & Music', icon: Music },
    { id: 'gift', label: 'Gifts & Favors', icon: Gift },
    { id: 'hack', label: 'Budget Hacks', icon: Flame }
  ];

  const filteredIdeas = selectedKind === 'All' ? ideas : ideas.filter((i) => i.kind === selectedKind);

  const handleApplyTwist = (twistName: string) => {
    setIsTwisting(true);
    setActiveTwist(twistName);
    setTimeout(() => {
      setIsTwisting(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <Lightbulb className="w-4 h-4" />
              <span>Creative Ideation & Moodboard Studio</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1">
              Ideas & Aesthetic Moodboard
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
              Curated concepts for decor, interactive food bars, and intelligent budget-saving hacks.
            </p>
          </div>
        </div>

        {/* "Regenerate with Twist" Controls */}
        <div className="glass-panel p-5 rounded-3xl border border-amber-500/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            <Sparkles className="w-4 h-4" />
            <span>AI "Regenerate with Twist" Controls</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { id: 'budget', label: '💡 Cut Costs by 25% (Budget Friendly)' },
              { id: 'royal', label: '👑 Elevate to Royal Heritage' },
              { id: 'eco', label: '🌱 100% Eco-Friendly & Zero Waste' },
              { id: 'modern', label: '✨ Modern Minimalist Twist' },
              { id: 'kids', label: '🎈 Interactive Kids & Family Corner' }
            ].map((twist) => (
              <button
                key={twist.id}
                onClick={() => handleApplyTwist(twist.label)}
                disabled={isTwisting}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold glass-panel hover:glass-panel-elevated transition-all flex items-center gap-1.5 ${
                  activeTwist === twist.label ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <span>{twist.label}</span>
              </button>
            ))}
          </div>

          {isTwisting && (
            <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-2 animate-pulse pt-1">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Synthesizing creative variations for "{activeTwist}"...</span>
            </div>
          )}
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {kinds.map((k) => {
            const Icon = k.icon;
            const isSelected = selectedKind === k.id;
            return (
              <button
                key={k.id}
                onClick={() => setSelectedKind(k.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#2B1442] text-white dark:bg-white dark:text-[#2B1442] shadow-sm'
                    : 'glass-panel text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{k.label}</span>
              </button>
            );
          })}
        </div>

        {/* Moodboard Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => {
            const isSaved = idea.saved;

            return (
              <div
                key={idea.id}
                className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] space-y-4 hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400">
                      {idea.kind}
                    </span>

                    <button
                      onClick={() => toggleSaveIdea(idea.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved
                          ? 'bg-rose-500/20 text-rose-600'
                          : 'text-[var(--text-muted)] hover:text-rose-500'
                      }`}
                      title={isSaved ? 'Saved to Moodboard' : 'Save to Moodboard'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <h3 className="font-extrabold text-lg text-[var(--text-primary)]">
                    {idea.title}
                  </h3>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {idea.description}
                  </p>

                  {/* Color Swatches if theme */}
                  {idea.colorPalette && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                        Color Inspiration:
                      </span>
                      <div className="flex items-center gap-2">
                        {idea.colorPalette.map((hex, hIdx) => (
                          <div
                            key={hIdx}
                            style={{ backgroundColor: hex }}
                            className="w-6 h-6 rounded-full border border-white/30 shadow-sm"
                            title={hex}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {idea.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border-color)]">
                    {idea.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] bg-black/5 dark:bg-white/5 text-[var(--text-muted)] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
