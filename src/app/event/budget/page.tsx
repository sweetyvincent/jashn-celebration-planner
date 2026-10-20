'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { useEventStore } from '@/lib/store/event-store';
import {
  PieChart,
  IndianRupee,
  SlidersHorizontal,
  Sparkles,
  Download,
  Plus,
  AlertCircle,
  Table,
  CheckCircle2,
  TrendingDown,
  RotateCcw
} from 'lucide-react';

export default function BudgetStudioPage() {
  const {
    eventTitle,
    totalBudget,
    guestCount,
    currency,
    plan,
    updateBudgetCategory,
    rebalanceBudget,
    undoLastChange
  } = useEventStore();

  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // What-if sliders
  const [simGuestCount, setSimGuestCount] = useState<number>(guestCount);
  const [simBudget, setSimBudget] = useState<number>(totalBudget);
  const [rebalanceMessage, setRebalanceMessage] = useState<string | null>(null);

  const budgetItems = plan?.budget || [];
  const totalPlanned = budgetItems.reduce((acc, b) => acc + (b.plannedAmount || 0), 0);
  const totalActual = budgetItems.reduce((acc, b) => acc + (b.actualAmount || 0), 0);
  const totalPaid = budgetItems.reduce((acc, b) => acc + (b.paidAmount || 0), 0);

  const handleApplyRebalance = () => {
    rebalanceBudget(simBudget);
    setRebalanceMessage(`AI Rebalanced all ${budgetItems.length} categories to new total ₹${simBudget.toLocaleString()}.`);
    setTimeout(() => setRebalanceMessage(null), 4000);
  };

  const handleExportCSV = () => {
    const rows = [
      ['Category Name', 'Percentage', 'Planned Amount', 'Actual Amount', 'Paid Amount', 'Notes'],
      ...budgetItems.map((b) => [
        `"${b.name}"`,
        `${b.percentage}%`,
        b.plannedAmount,
        b.actualAmount,
        b.paidAmount,
        `"${b.notes || ''}"`
      ])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `Budget_${eventTitle.replace(/\s+/g, '_')}.csv`;
    link.click();
  };

  // Color map for donut segments
  const colors = [
    '#F4B33D',
    '#E85D8A',
    '#FF8A3D',
    '#3B2A7A',
    '#1F9D7A',
    '#2B1442',
    '#6B5B7B',
    '#0284C7'
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Studio Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <PieChart className="w-4 h-4" />
              <span>Financial Blueprint</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1">
              Budget Studio
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
              Live multi-tier allocations, what-if modeling, and AI contingency balancing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl glass-panel text-xs">
              <button
                onClick={() => setViewMode('chart')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'chart'
                    ? 'bg-[#2B1442] text-white dark:bg-white dark:text-[#2B1442] font-bold shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <PieChart className="w-3.5 h-3.5" />
                <span>3D Donut</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'table'
                    ? 'bg-[#2B1442] text-white dark:bg-white dark:text-[#2B1442] font-bold shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>2D Table</span>
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-panel text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Top Financial Health Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-panel p-5 rounded-2xl">
            <span className="text-xs text-[var(--text-muted)] font-medium">Target Budget</span>
            <div className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">
              ₹{totalBudget.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              Per Guest: ~₹{Math.round(totalBudget / Math.max(guestCount, 1)).toLocaleString()}
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl">
            <span className="text-xs text-[var(--text-muted)] font-medium">Committed / Actual</span>
            <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
              ₹{totalActual.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              {Math.round((totalActual / totalBudget) * 100)}% of target allocated
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl">
            <span className="text-xs text-[var(--text-muted)] font-medium">Paid Disbursements</span>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              ₹{totalPaid.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              Remaining to disburse: ₹{(totalBudget - totalPaid).toLocaleString()}
            </div>
          </div>
        </div>

        {/* "What-If" AI Simulation Sandbox */}
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/25 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-amber-500" />
              <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                "What-If" Live Simulation & AI Rebalancer
              </h2>
            </div>
            <button
              onClick={handleApplyRebalance}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold shadow-md hover:opacity-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apply AI Rebalance</span>
            </button>
          </div>

          <p className="text-xs text-[var(--text-muted)]">
            Adjust budget or guest size below to preview impact across catering, venue, and decor before locking changes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[var(--text-muted)]">Simulated Budget:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  ₹{simBudget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="10000000"
                step="50000"
                value={simBudget}
                onChange={(e) => setSimBudget(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[var(--text-muted)]">Simulated Guest Count:</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {simGuestCount} Guests
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="800"
                step="10"
                value={simGuestCount}
                onChange={(e) => setSimGuestCount(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {rebalanceMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-pulse">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{rebalanceMessage}</span>
            </div>
          )}
        </div>

        {/* Interactive Visualization or Table */}
        {viewMode === 'chart' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Donut Chart Visualizer */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-3xl flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* SVG Radial Donut with explode hover */}
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {(() => {
                    let cumulativeAngle = 0;
                    return budgetItems.map((item, idx) => {
                      const strokeDash = (item.percentage / 100) * 283; // 2 * pi * 45
                      const strokeOffset = 283 - (cumulativeAngle / 100) * 283;
                      cumulativeAngle += item.percentage;
                      const isSelected = selectedCategoryId === item.id;
                      const color = colors[idx % colors.length];

                      return (
                        <circle
                          key={item.id}
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke={color}
                          strokeWidth={isSelected ? '14' : '10'}
                          strokeDasharray={`${strokeDash} 283`}
                          strokeDashoffset={-((cumulativeAngle - item.percentage) / 100) * 283}
                          className="transition-all duration-300 cursor-pointer hover:stroke-[14]"
                          onClick={() => setSelectedCategoryId(item.id === selectedCategoryId ? null : item.id)}
                        />
                      );
                    });
                  })()}
                </svg>

                {/* Center Badge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-[var(--text-primary)]">
                    ₹{(totalBudget / 100000).toFixed(1)}L
                  </span>
                  <span className="text-[10px] text-amber-500 font-semibold">100% Allocated</span>
                </div>
              </div>

              <div className="text-xs text-[var(--text-muted)] mt-4 text-center">
                Click any slice to inspect category allocations & sub-items.
              </div>
            </div>

            {/* Category Breakdown Cards */}
            <div className="lg:col-span-7 space-y-3">
              {budgetItems.map((item, idx) => {
                const color = colors[idx % colors.length];
                const isSelected = selectedCategoryId === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCategoryId(item.id === selectedCategoryId ? null : item.id)}
                    className={`p-4 rounded-2xl glass-panel transition-all cursor-pointer border ${
                      isSelected
                        ? 'border-amber-500 shadow-md ring-1 ring-amber-500/50'
                        : 'border-[var(--border-color)] hover:border-black/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                        <div>
                          <span className="font-bold text-sm text-[var(--text-primary)] block">
                            {item.name}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">
                            {item.percentage}% of total
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-extrabold text-[var(--text-primary)] block">
                          ₹{item.plannedAmount.toLocaleString()}
                        </span>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          Paid: ₹{item.paidAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 mt-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min((item.paidAmount / Math.max(item.plannedAmount, 1)) * 100, 100)}%`,
                          backgroundColor: color
                        }}
                      />
                    </div>

                    {/* Subcategories on expanded */}
                    {isSelected && (
                      <div className="mt-4 pt-3 border-t border-[var(--border-color)] space-y-2 text-xs">
                        <div className="font-semibold text-[var(--text-primary)]">
                          Sub-allocations & Notes:
                        </div>
                        {item.notes && (
                          <p className="text-[var(--text-muted)] italic mb-2">{item.notes}</p>
                        )}
                        {item.subCategories?.map((sub, sIdx) => (
                          <div key={sIdx} className="flex justify-between py-1 border-b border-[var(--border-color)]/50">
                            <span className="text-[var(--text-muted)]">{sub.name}</span>
                            <span className="font-semibold text-[var(--text-primary)]">
                              ₹{sub.amount.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* 2D Accessible Data Table View */
          <div className="glass-panel rounded-3xl overflow-hidden border border-[var(--border-color)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/5 dark:bg-white/5 uppercase font-bold text-[var(--text-muted)] border-b border-[var(--border-color)]">
                  <tr>
                    <th className="p-4">Category</th>
                    <th className="p-4">Weight</th>
                    <th className="p-4">Planned</th>
                    <th className="p-4">Actual Spend</th>
                    <th className="p-4">Disbursed / Paid</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {budgetItems.map((item) => {
                    const diff = item.actualAmount - item.plannedAmount;
                    const isOver = diff > 0;

                    return (
                      <tr key={item.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-[var(--text-primary)]">{item.name}</td>
                        <td className="p-4 font-semibold text-[var(--text-muted)]">{item.percentage}%</td>
                        <td className="p-4 font-semibold">₹{item.plannedAmount.toLocaleString()}</td>
                        <td className="p-4 font-semibold">
                          ₹{item.actualAmount.toLocaleString()}
                          {isOver && (
                            <span className="ml-1.5 text-[10px] text-rose-500 font-bold">
                              (+₹{diff.toLocaleString()})
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                          ₹{item.paidAmount.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.paidAmount >= item.plannedAmount
                                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                            }`}
                          >
                            {item.paidAmount >= item.plannedAmount ? 'Settled' : 'In Progress'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
