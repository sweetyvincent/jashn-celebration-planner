'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { CelebrationCanvas } from '@/components/3d/CelebrationCanvas';
import { useWizardStore } from '@/lib/store/wizard-store';
import { useEventStore } from '@/lib/store/event-store';
import { generateEventPlan } from '@/lib/ai/gemini';
import { EventType } from '@/types/event';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  Check,
  CheckCircle2,
  Clock,
  Layers,
  Heart,
  Loader2,
  SlidersHorizontal,
  ShieldAlert,
  Zap
} from 'lucide-react';

const VIBE_OPTIONS = [
  'Traditional',
  'Royal & Majestic',
  'Modern & Chic',
  'Rustic & Natural',
  'Minimalist & Elegant',
  'High Energy & Fun',
  'Eco-Friendly & Sustainable',
  'Grand Bollywood'
];

const DIETARY_OPTIONS = [
  'Pure Vegetarian',
  'Vegan',
  'Jain (No Root Veggies)',
  'Halal',
  'Gluten-Free',
  'Nut Allergies Safe',
  'No Onion & Garlic'
];

const CULTURAL_OPTIONS = [
  'Vedic Hindu Vivah',
  'Sangeet & Punjabi Dhol',
  'South Indian Traditional',
  'Rajasthani Heritage',
  'Contemporary Western',
  'Interfaith Harmony',
  'Bengali Traditional',
  'Gujarati Garba / Dandiya'
];

export default function StartWizardPage() {
  const router = useRouter();
  const { step, data, setStep, nextStep, prevStep, updateData, resetWizard } = useWizardStore();
  const { initializeEvent } = useEventStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');

  const handleTypeSelect = (type: EventType) => {
    resetWizard(type);
    updateData({ type });
  };

  const toggleArrayItem = (key: 'vibeTags' | 'dietaryPreferences' | 'culturalPreferences', item: string) => {
    const list = data[key] || [];
    if (list.includes(item)) {
      updateData({ [key]: list.filter((i) => i !== item) });
    } else {
      updateData({ [key]: [...list, item] });
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress('Architecting category budget allocations...');

    try {
      setTimeout(() => setGenerationProgress('Backward-planning timeline & milestones...'), 800);
      setTimeout(() => setGenerationProgress('Selecting vendor profiles & contract safety checklists...'), 1600);
      setTimeout(() => setGenerationProgress('Personalizing decor, menu themes, and contingency risks...'), 2400);

      const plan = await generateEventPlan(data);
      initializeEvent(data, plan);

      setTimeout(() => {
        setIsGenerating(false);
        router.push('/event/overview');
      }, 3000);
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      <div className="relative flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: 3D Scene Viewport that morphs with Event Type */}
        <div className="lg:w-5/12 relative min-h-[260px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-[var(--border-color)] overflow-hidden bg-black/5 dark:bg-white/5">
          <CelebrationCanvas eventType={data.type} intensity="hero" />

          {/* Overlay Event Context Pill */}
          <div className="absolute top-6 left-6 z-10 glass-panel p-4 rounded-2xl max-w-xs shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Event Prototype</span>
            </div>
            <div className="font-extrabold text-lg text-[var(--text-primary)] mt-1 truncate">
              {data.title || 'Untitled Celebration'}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1 flex items-center gap-3">
              <span>👥 {data.guestCount} Guests</span>
              <span>💰 ₹{data.totalBudget.toLocaleString()}</span>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10 hidden lg:block glass-panel p-3.5 rounded-xl text-xs text-[var(--text-muted)]">
            💡 The 3D atmosphere dynamically adapts to your theme, colors, and celebration style in real-time.
          </div>
        </div>

        {/* Right Side: Step-by-Step Interactive Form */}
        <div className="lg:w-7/12 flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto max-w-3xl">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)] mb-2">
              <span>Step {step} of 6</span>
              <button
                onClick={() => router.push('/event/chat')}
                className="text-amber-600 dark:text-amber-400 hover:underline"
              >
                Skip to AI Copilot →
              </button>
            </div>
            <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F4B33D] to-[#E85D8A] transition-all duration-300 rounded-full"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1: Event Type & Title */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                  What celebration are we crafting?
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Select your celebration category to configure specialized sub-events and cultural traditions.
                </p>
              </div>

              {/* Event Type Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'wedding',
                    title: 'Wedding',
                    emoji: '💍',
                    desc: 'Haldi, Mehendi, Sangeet, Vedic Vivah & Reception',
                    color: 'border-rose-500/40 hover:border-rose-500'
                  },
                  {
                    id: 'birthday',
                    title: 'Birthday',
                    emoji: '🎂',
                    desc: 'Kids quests, milestone parties, surprise bashes',
                    color: 'border-amber-500/40 hover:border-amber-500'
                  },
                  {
                    id: 'community',
                    title: 'Community Mela',
                    emoji: '🎪',
                    desc: 'Society festivals, Diwali, cultural nights & drives',
                    color: 'border-emerald-500/40 hover:border-emerald-500'
                  }
                ].map((typeOption) => (
                  <button
                    key={typeOption.id}
                    onClick={() => handleTypeSelect(typeOption.id as EventType)}
                    className={`p-5 rounded-2xl text-left glass-panel transition-all border-2 ${typeOption.color} ${
                      data.type === typeOption.id
                        ? 'ring-2 ring-amber-500 glass-panel-elevated scale-[1.02]'
                        : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <span className="text-3xl block mb-2">{typeOption.emoji}</span>
                    <div className="font-bold text-base text-[var(--text-primary)]">{typeOption.title}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1 leading-snug">{typeOption.desc}</div>
                  </button>
                ))}
              </div>

              {/* Event Title Input */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Celebration Name / Headline
                </label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => updateData({ title: e.target.value })}
                  placeholder="e.g. Arjun & Priya's Royal Wedding"
                  className="w-full px-4 py-3 rounded-xl glass-panel border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Date & Destination */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                  When and where will it take place?
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Timeline milestones will backward-plan automatically from this date.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>Target Event Date</span>
                  </label>
                  <input
                    type="date"
                    value={data.eventDate || ''}
                    onChange={(e) => updateData({ eventDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-panel border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>City or Destination</span>
                  </label>
                  <input
                    type="text"
                    value={data.city}
                    onChange={(e) => updateData({ city: e.target.value })}
                    placeholder="e.g. Udaipur, Jaipur, Mumbai, Delhi, Bengaluru"
                    className="w-full px-4 py-3 rounded-xl glass-panel border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl glass-panel border border-amber-500/20 text-xs text-[var(--text-muted)] flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Smart Seasonal Tip:</strong> Selected cities factor in weather contingencies (e.g. Jaipur summer heat, Mumbai monsoons, Delhi winter fog).
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Guests & Budget */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                  Scale: Guests & Total Budget
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Jashn divides this budget across catering, venue, decor, and reserves a 5-10% contingency safety net.
                </p>
              </div>

              {/* Guest Count Slider & Input */}
              <div className="space-y-3 glass-panel p-5 rounded-2xl">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>Estimated Guest Count</span>
                  </label>
                  <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
                    {data.guestCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={data.guestCount}
                  onChange={(e) => updateData({ guestCount: Number(e.target.value) })}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              {/* Total Budget Slider & Input */}
              <div className="space-y-3 glass-panel p-5 rounded-2xl">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-emerald-500" />
                    <span>Total Target Budget</span>
                  </label>
                  <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                    ₹{data.totalBudget.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="10000000"
                  step="25000"
                  value={data.totalBudget}
                  onChange={(e) => updateData({ totalBudget: Number(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="text-xs text-[var(--text-muted)] text-right">
                  Est. per-guest allocation: ~₹{Math.round(data.totalBudget / Math.max(data.guestCount, 1)).toLocaleString()} / guest
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Style & Vibe Tags */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                  What is the ambiance and mood?
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Select vibe keywords to inspire the 3D aesthetic, music curation, and decor themes.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {VIBE_OPTIONS.map((tag) => {
                  const isSelected = data.vibeTags?.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleArrayItem('vibeTags', tag)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md'
                          : 'glass-panel text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Cultural & Dietary Preferences */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                  Traditions & Dining Nuances
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  We guarantee custom menu sections and ritual schedules respecting every community tradition.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Dietary Accommodations
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_OPTIONS.map((diet) => {
                    const isSelected = data.dietaryPreferences?.includes(diet);
                    return (
                      <button
                        key={diet}
                        onClick={() => toggleArrayItem('dietaryPreferences', diet)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'glass-panel text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {diet}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Cultural Contexts
                </label>
                <div className="flex flex-wrap gap-2">
                  {CULTURAL_OPTIONS.map((tradition) => {
                    const isSelected = data.culturalPreferences?.includes(tradition);
                    return (
                      <button
                        key={tradition}
                        onClick={() => toggleArrayItem('culturalPreferences', tradition)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'glass-panel text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {tradition}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Review & Finalize AI Blueprint */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                  Ready to architect your master plan
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Review your celebration blueprint inputs before Jashn AI synthesizes your customized master plan.
                </p>
              </div>

              {/* Summary Card */}
              <div className="glass-panel p-6 rounded-2xl space-y-4 border border-amber-500/20">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                  <div>
                    <span className="text-2xl mr-2">
                      {data.type === 'wedding' ? '💍' : data.type === 'birthday' ? '🎂' : '🎪'}
                    </span>
                    <span className="font-extrabold text-lg text-[var(--text-primary)]">{data.title}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    {data.type.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[var(--text-muted)] block">Date & Destination:</span>
                    <strong className="text-[var(--text-primary)] text-sm">{data.city || 'Undecided'} ({data.eventDate || 'Flexible'})</strong>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block">Guest Count:</span>
                    <strong className="text-[var(--text-primary)] text-sm">{data.guestCount} Guests</strong>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block">Total Budget:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 text-sm">₹{data.totalBudget.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[var(--text-muted)] text-xs block mb-1">Vibes & Preferences:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {data.vibeTags?.map((v) => (
                      <span key={v} className="px-2 py-0.5 rounded-md text-[11px] bg-black/5 dark:bg-white/10 font-medium">
                        {v}
                      </span>
                    ))}
                    {data.dietaryPreferences?.map((d) => (
                      <span key={d} className="px-2 py-0.5 rounded-md text-[11px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {isGenerating && (
                <div className="glass-panel p-6 rounded-2xl text-center space-y-3 border border-amber-500/40 animate-pulse">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500" />
                  <div className="font-bold text-sm text-[var(--text-primary)]">{generationProgress}</div>
                  <div className="text-xs text-[var(--text-muted)]">
                    Applying Zod schemas, 5-10% contingency allocation & culturally accurate milestones...
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-[var(--border-color)] mt-8">
            {step > 1 ? (
              <button
                disabled={isGenerating}
                onClick={prevStep}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl glass-panel text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold shadow-md shadow-amber-500/20 hover:opacity-95 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled={isGenerating}
                onClick={handleGenerate}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-sm font-bold shadow-xl shadow-rose-500/30 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Plan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Master Plan</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
