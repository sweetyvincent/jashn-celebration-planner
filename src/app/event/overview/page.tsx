'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { useEventStore } from '@/lib/store/event-store';
import {
  Sparkles,
  Calendar,
  PieChart,
  ShieldAlert,
  ArrowRight,
  Download,
  Share2,
  CheckCircle2,
  Clock,
  Layers,
  Heart,
  FileText
} from 'lucide-react';

export default function EventOverviewPage() {
  const { eventTitle, eventType, eventDate, city, guestCount, totalBudget, plan } = useEventStore();
  const [copied, setCopied] = useState(false);

  const summary = plan?.summary;
  const risks = plan?.risks || [];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '/rsvp/sample-token');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportCSV = () => {
    if (!plan) return;
    const rows = [
      ['Category', 'Percentage', 'Planned Amount', 'Actual Amount', 'Paid Amount'],
      ...plan.budget.map((b) => [b.name, `${b.percentage}%`, b.plannedAmount, b.actualAmount, b.paidAmount])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${eventTitle.replace(/\s+/g, '_')}_Budget.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Celebration Blueprint Hero */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-amber-500/25 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Master Blueprint Ready</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
                {eventTitle}
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
                {summary?.description || 'Your complete logistical and creative celebration roadmap.'}
              </p>
            </div>

            {/* Export & Share Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl glass-panel text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                <Download className="w-4 h-4 text-emerald-500" />
                <span>Export Budget CSV</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold shadow-md hover:opacity-95 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Link Copied! ✓' : 'Share RSVP Page'}</span>
              </button>
            </div>
          </div>

          {/* Theme & Palette Banner */}
          <div className="mt-8 pt-6 border-t border-[var(--border-color)] grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-xs text-[var(--text-muted)] block uppercase font-bold tracking-wider">
                Theme Concept
              </span>
              <strong className="text-base text-[var(--text-primary)] font-bold mt-0.5 block">
                {summary?.theme || 'Celebration Radiance'}
              </strong>
            </div>

            <div>
              <span className="text-xs text-[var(--text-muted)] block uppercase font-bold tracking-wider mb-1.5">
                Curated Color Swatches
              </span>
              <div className="flex items-center gap-2">
                {(summary?.colorPalette || ['#2B1442', '#F4B33D', '#E85D8A', '#FF8A3D', '#FFF8EE']).map((c, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: c }}
                    className="w-7 h-7 rounded-full shadow-md border border-white/30"
                    title={c}
                  />
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-[var(--text-muted)] block uppercase font-bold tracking-wider">
                Safety Contingency Cushion ({summary?.contingencyPercent || 8}%)
              </span>
              <strong className="text-base text-emerald-600 dark:text-emerald-400 font-bold mt-0.5 block">
                ₹{(summary?.contingencyAmount || 0).toLocaleString()} Reserved
              </strong>
            </div>
          </div>
        </div>

        {/* Quick Suite Jump Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/event/budget"
            className="p-5 rounded-2xl glass-panel hover:glass-panel-elevated transition-all group border border-amber-500/20"
          >
            <PieChart className="w-6 h-6 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-sm text-[var(--text-primary)]">Budget Studio</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">3D donut & what-if sliders</div>
          </Link>

          <Link
            href="/event/timeline"
            className="p-5 rounded-2xl glass-panel hover:glass-panel-elevated transition-all group border border-rose-500/20"
          >
            <Calendar className="w-6 h-6 text-rose-500 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-sm text-[var(--text-primary)]">Timeline & Day-Of</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">Run-of-show & .ics export</div>
          </Link>

          <Link
            href="/event/vendors"
            className="p-5 rounded-2xl glass-panel hover:glass-panel-elevated transition-all group border border-emerald-500/20"
          >
            <Layers className="w-6 h-6 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-sm text-[var(--text-primary)]">Vendor Tracker</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">Quotes & contract advice</div>
          </Link>

          <Link
            href="/event/chat"
            className="p-5 rounded-2xl glass-panel hover:glass-panel-elevated transition-all group border border-purple-500/20"
          >
            <Sparkles className="w-6 h-6 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-sm text-[var(--text-primary)]">AI Copilot</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">Chat & modify blueprint</div>
          </Link>
        </div>

        {/* Risk Registry with Mitigations */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              AI Risk Mitigation & Contingency Protocols
            </h2>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Proactively identified logistical, weather, and curfew vulnerabilities with actionable safeguards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {risks.map((r) => (
              <div key={r.id} className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">
                    Impact: {r.impact}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-medium">
                    Likelihood: {r.likelihood}
                  </span>
                </div>
                <div className="font-semibold text-xs text-[var(--text-primary)]">
                  ⚠️ {r.risk}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] leading-relaxed pt-1 border-t border-[var(--border-color)]">
                  <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Safeguard: </strong>
                  {r.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
