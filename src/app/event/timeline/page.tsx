'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { useEventStore } from '@/lib/store/event-store';
import { TimelineTaskItem } from '@/types/event';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Download,
  Printer,
  ChevronRight,
  Filter,
  Flame,
  Sparkles
} from 'lucide-react';

export default function TimelinePage() {
  const { eventTitle, eventDate, plan, addTask, updateTask, deleteTask } = useEventStore();
  const [activeTab, setActiveTab] = useState<'kanban' | 'runOfShow' | 'milestones'>('kanban');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('General');
  const [newTaskPhase, setNewTaskPhase] = useState<TimelineTaskItem['phase']>('1m');

  const tasks = plan?.timeline || [];

  // Countdown computation
  const calculateDaysRemaining = () => {
    if (!eventDate) return 60;
    const diff = new Date(eventDate).getTime() - new Date().getTime();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  const daysRemaining = calculateDaysRemaining();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle.trim(),
      description: 'Custom planned milestone',
      phase: newTaskPhase,
      status: 'pending',
      priority: 'high',
      category: newTaskCategory
    });

    setNewTaskTitle('');
  };

  const handleExportICS = () => {
    const calendarEvents = tasks.map((t) => {
      const dt = t.dueDate ? t.dueDate.replace(/-/g, '') : '20270115';
      return `BEGIN:VEVENT\nSUMMARY:${t.title}\nDESCRIPTION:${t.description || ''}\nDTSTART:${dt}\nSTATUS:CONFIRMED\nEND:VEVENT`;
    });

    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Jashn AI//Celebration Planner//EN\n${calendarEvents.join(
      '\n'
    )}\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${eventTitle.replace(/\s+/g, '_')}_Schedule.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Run-of-show day-of tasks sorted by time
  const runOfShowTasks = tasks.filter((t) => t.phase === 'dayOf' || t.phase === 'dayBefore' || t.minuteSchedule);

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header & 3D Countdown Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/25 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <Clock className="w-4 h-4" />
              <span>Timeline & Run-of-Show</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1">
              Celebration Countdown
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
              Target Event Date: <strong className="text-[var(--text-primary)]">{eventDate || 'Flexible 2027'}</strong>
            </p>
          </div>

          {/* Animated 3D Numeral Countdown Widget */}
          <div className="flex items-center gap-3">
            <div className="glass-panel-elevated p-4 rounded-2xl text-center min-w-[90px] border border-amber-500/30">
              <span className="text-3xl sm:text-4xl font-extrabold text-gold-gradient block">
                {daysRemaining}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Days To Go
              </span>
            </div>
            <div className="hidden sm:flex flex-col gap-2">
              <button
                onClick={handleExportICS}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-panel text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-purple-500" />
                <span>Export .ICS Calendar</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-panel text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                <Printer className="w-3.5 h-3.5 text-amber-500" />
                <span>Print Schedule</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'kanban'
                  ? 'bg-[#2B1442] text-white dark:bg-white dark:text-[#2B1442] shadow-sm'
                  : 'glass-panel text-[var(--text-muted)]'
              }`}
            >
              📋 Kanban Pipeline
            </button>
            <button
              onClick={() => setActiveTab('runOfShow')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'runOfShow'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'glass-panel text-[var(--text-muted)]'
              }`}
            >
              ⏱️ Day-Of Run-of-Show ({runOfShowTasks.length})
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'milestones'
                  ? 'bg-[#2B1442] text-white dark:bg-white dark:text-[#2B1442] shadow-sm'
                  : 'glass-panel text-[var(--text-muted)]'
              }`}
            >
              🗓️ 12-Month Phases
            </button>
          </div>

          {/* Quick Add Task Form */}
          <form onSubmit={handleAddTask} className="flex items-center gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add new milestone..."
              className="px-3.5 py-2 rounded-xl glass-panel border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-amber-500 w-48 sm:w-64"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-sm"
              title="Add Task"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* TAB 1: Kanban Columns */}
        {activeTab === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Pending */}
            <div className="glass-panel p-5 rounded-3xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Pending ({tasks.filter((t) => t.status === 'pending').length})</span>
                </span>
              </div>
              <div className="space-y-3">
                {tasks
                  .filter((t) => t.status === 'pending')
                  .map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] space-y-2 hover:border-amber-500/50 transition-all"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold uppercase">
                          {task.phase}
                        </span>
                        <span className="text-[var(--text-muted)] font-medium">{task.category || 'General'}</span>
                      </div>
                      <div className="font-bold text-xs text-[var(--text-primary)]">{task.title}</div>
                      {task.description && (
                        <p className="text-[11px] text-[var(--text-muted)] line-clamp-2">{task.description}</p>
                      )}
                      <div className="pt-2 flex items-center justify-between border-t border-[var(--border-color)] text-[10px]">
                        <button
                          onClick={() => updateTask(task.id, { status: 'in_progress' })}
                          className="text-amber-600 hover:underline font-semibold"
                        >
                          Start →
                        </button>
                        <button
                          onClick={() => updateTask(task.id, { status: 'done' })}
                          className="text-emerald-600 hover:underline font-semibold"
                        >
                          Mark Done ✓
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Column 2: In Progress */}
            <div className="glass-panel p-5 rounded-3xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  <span>In Progress ({tasks.filter((t) => t.status === 'in_progress').length})</span>
                </span>
              </div>
              <div className="space-y-3">
                {tasks
                  .filter((t) => t.status === 'in_progress')
                  .map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-blue-500/30 space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold uppercase">
                          {task.phase}
                        </span>
                        <span className="text-[var(--text-muted)] font-medium">{task.category || 'General'}</span>
                      </div>
                      <div className="font-bold text-xs text-[var(--text-primary)]">{task.title}</div>
                      <div className="pt-2 flex items-center justify-between border-t border-[var(--border-color)] text-[10px]">
                        <button
                          onClick={() => updateTask(task.id, { status: 'pending' })}
                          className="text-[var(--text-muted)] hover:underline"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={() => updateTask(task.id, { status: 'done' })}
                          className="text-emerald-600 hover:underline font-bold"
                        >
                          Complete ✓
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Column 3: Completed */}
            <div className="glass-panel p-5 rounded-3xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Done & Locked ({tasks.filter((t) => t.status === 'done').length})</span>
                </span>
              </div>
              <div className="space-y-3">
                {tasks
                  .filter((t) => t.status === 'done')
                  .map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                          Done
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <div className="font-bold text-xs text-[var(--text-primary)] line-through opacity-85">
                        {task.title}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Minute-by-Minute Run-of-Show */}
        {activeTab === 'runOfShow' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Minute-by-Minute Day-of Run-of-Show
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Precision event execution schedule for coordinators, caterers, and MCs.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded-xl glass-panel text-xs font-semibold flex items-center gap-1.5 hover:bg-black/5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Cue Sheet</span>
              </button>
            </div>

            <div className="space-y-4">
              {runOfShowTasks.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)]"
                >
                  <div className="w-24 shrink-0 text-center glass-panel p-2 rounded-xl border border-rose-500/30">
                    <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400 block">
                      {item.minuteSchedule || `0${idx + 4}:00 PM`}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold">
                      {item.phase}
                    </span>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="font-bold text-sm text-[var(--text-primary)]">{item.title}</div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.description}</p>
                    <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold pt-1">
                      Coordinator Protocol: Ensure sound cues and photographer are positioned 10 mins prior.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Milestones by Phase */}
        {activeTab === 'milestones' && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-bold text-[var(--text-primary)] pb-3 border-b border-[var(--border-color)]">
              Backward Phase Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {['12m', '6m', '3m', '1m', '4w', '2w', '1w', 'dayOf'].map((phaseKey) => {
                const phaseTasks = tasks.filter((t) => t.phase === phaseKey);
                return (
                  <div key={phaseKey} className="glass-panel p-4 rounded-2xl border border-[var(--border-color)]">
                    <span className="text-xs font-extrabold uppercase text-amber-600 dark:text-amber-400 block mb-2">
                      Phase: {phaseKey} ({phaseTasks.length})
                    </span>
                    <div className="space-y-2">
                      {phaseTasks.map((pt) => (
                        <div key={pt.id} className="text-xs p-2 rounded-lg bg-black/5 dark:bg-white/5 font-medium truncate">
                          {pt.title}
                        </div>
                      ))}
                      {phaseTasks.length === 0 && (
                        <span className="text-[11px] text-[var(--text-muted)] italic">No tasks assigned</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
