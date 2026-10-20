'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { useEventStore } from '@/lib/store/event-store';
import { GuestItem } from '@/types/event';
import {
  Users,
  UserPlus,
  Share2,
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Download,
  Upload,
  Copy,
  Utensils
} from 'lucide-react';

export default function GuestsPage() {
  const { eventTitle, eventType, guestCount, guests, addGuest, updateGuest, deleteGuest, bulkAddGuests } = useEventStore();

  const [filterGroup, setFilterGroup] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteTone, setInviteTone] = useState<'Royal & Formal' | 'Warm & Celebratory' | 'Modern & Casual'>('Royal & Formal');
  const [copiedLink, setCopiedLink] = useState(false);

  // Form states
  const [gName, setGName] = useState('');
  const [gEmail, setGEmail] = useState('');
  const [gPhone, setGPhone] = useState('');
  const [gGroup, setGGroup] = useState('Family');
  const [gDietary, setGDietary] = useState('Vegetarian');
  const [gPlusOnes, setGPlusOnes] = useState(0);

  const groups = ['All', 'Family', 'Friends', 'VIP', 'Colleagues'];

  const filteredGuests = guests.filter((g) => {
    const matchesGroup = filterGroup === 'All' || g.group === filterGroup;
    const matchesStatus = filterStatus === 'All' || g.rsvpStatus === filterStatus;
    return matchesGroup && matchesStatus;
  });

  const acceptedCount = guests.filter((g) => g.rsvpStatus === 'accepted').length;
  const declinedCount = guests.filter((g) => g.rsvpStatus === 'declined').length;
  const pendingCount = guests.filter((g) => g.rsvpStatus === 'pending').length;

  const handleCreateGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gName.trim()) return;

    addGuest({
      name: gName.trim(),
      email: gEmail,
      phone: gPhone,
      group: gGroup,
      dietary: [gDietary],
      plusOnes: Number(gPlusOnes),
      rsvpStatus: 'pending'
    });

    setGName('');
    setGEmail('');
    setGPhone('');
    setShowAddModal(false);
  };

  const handleCopyRSVPLink = () => {
    const url = `${window.location.origin}/rsvp/demo-token`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Sample AI Generated invitation wording
  const getInviteWording = () => {
    if (inviteTone === 'Royal & Formal') {
      return `With divine blessings and joy in our hearts, we cordially invite you and your family to celebrate the auspicious union of ${eventTitle}.\n\nPlease grace the occasion with your presence and blessings.\nRSVP: ${typeof window !== 'undefined' ? window.location.origin : ''}/rsvp/demo-token`;
    }
    if (inviteTone === 'Warm & Celebratory') {
      return `Good times, laughter, and endless memories! Join us as we celebrate ${eventTitle}. Your presence will make our celebration complete!\n\nKindly confirm your RSVP here: ${typeof window !== 'undefined' ? window.location.origin : ''}/rsvp/demo-token`;
    }
    return `Hey friends! We are throwing a celebration for ${eventTitle}! Great food, music, and good vibes guaranteed.\n\nLet us know you're coming: ${typeof window !== 'undefined' ? window.location.origin : ''}/rsvp/demo-token`;
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <Users className="w-4 h-4" />
              <span>Guest Manager & RSVP Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1">
              Guest List & Seating
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
              Live RSVP tracking, dietary badges, table allocations, and automated invitation generator.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-panel text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>AI Invite Text</span>
            </button>

            <button
              onClick={handleCopyRSVPLink}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied! ✓' : 'Share Public RSVP Link'}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold shadow-md hover:opacity-95 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Guest</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-xs text-[var(--text-muted)] font-medium">Invited Total</span>
            <div className="text-xl font-extrabold text-[var(--text-primary)] mt-1">
              {guests.length} ({guestCount} planned)
            </div>
          </div>
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Accepted (Attending)</span>
            <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              {acceptedCount}
            </div>
          </div>
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Awaiting / Pending</span>
            <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
              {pendingCount}
            </div>
          </div>
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">Declined</span>
            <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">
              {declinedCount}
            </div>
          </div>
        </div>

        {/* Group Filter Chips */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-2">
            {groups.map((grp) => (
              <button
                key={grp}
                onClick={() => setFilterGroup(grp)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterGroup === grp
                    ? 'bg-[#2B1442] text-white dark:bg-white dark:text-[#2B1442] shadow-sm'
                    : 'glass-panel text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {grp}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[var(--text-muted)] font-medium">RSVP Filter:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg glass-panel border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
            >
              <option value="All">All Statuses</option>
              <option value="accepted">Accepted</option>
              <option value="pending">Pending</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </div>

        {/* Guest Table */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-[var(--border-color)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/5 dark:bg-white/5 uppercase font-bold text-[var(--text-muted)] border-b border-[var(--border-color)]">
                <tr>
                  <th className="p-4">Guest Name</th>
                  <th className="p-4">Group</th>
                  <th className="p-4">Dietary Tags</th>
                  <th className="p-4">Plus-Ones</th>
                  <th className="p-4">Seating Table</th>
                  <th className="p-4">RSVP Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {filteredGuests.map((g) => (
                  <tr key={g.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-[var(--text-primary)]">
                      <div>{g.name}</div>
                      {g.email && <div className="text-[10px] text-[var(--text-muted)]">{g.email}</div>}
                    </td>
                    <td className="p-4 font-semibold text-[var(--text-muted)]">{g.group || 'General'}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {g.dietary?.map((d, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-semibold">{g.plusOnes > 0 ? `+${g.plusOnes}` : 'Solo'}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded bg-black/5 dark:bg-white/10 text-[10px] font-semibold">
                        {g.tableId || 'Unassigned'}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={g.rsvpStatus}
                        onChange={(e) => updateGuest(g.id, { rsvpStatus: e.target.value as GuestItem['rsvpStatus'] })}
                        className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md border-0 cursor-pointer ${
                          g.rsvpStatus === 'accepted'
                            ? 'bg-emerald-500/15 text-emerald-600'
                            : g.rsvpStatus === 'declined'
                            ? 'bg-rose-500/15 text-rose-600'
                            : 'bg-amber-500/15 text-amber-600'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="declined">Declined</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteGuest(g.id)}
                        className="text-rose-500 hover:text-rose-700 text-[11px] font-semibold"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Guest Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-md w-full space-y-4 shadow-2xl border border-blue-500/30">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Add Guest</h2>
              <form onSubmit={handleCreateGuest} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={gName}
                    onChange={(e) => setGName(e.target.value)}
                    placeholder="e.g. Meera & Rajesh Kapoor"
                    className="w-full p-2.5 rounded-xl glass-panel border border-[var(--border-color)]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Email</label>
                    <input
                      type="email"
                      value={gEmail}
                      onChange={(e) => setGEmail(e.target.value)}
                      placeholder="meera@example.com"
                      className="w-full p-2.5 rounded-xl glass-panel border border-[var(--border-color)]"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Phone</label>
                    <input
                      type="text"
                      value={gPhone}
                      onChange={(e) => setGPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full p-2.5 rounded-xl glass-panel border border-[var(--border-color)]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Group</label>
                    <select
                      value={gGroup}
                      onChange={(e) => setGGroup(e.target.value)}
                      className="w-full p-2.5 rounded-xl glass-panel border border-[var(--border-color)]"
                    >
                      <option value="Family">Family</option>
                      <option value="Friends">Friends</option>
                      <option value="VIP">VIP</option>
                      <option value="Colleagues">Colleagues</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Dietary Tag</label>
                    <select
                      value={gDietary}
                      onChange={(e) => setGDietary(e.target.value)}
                      className="w-full p-2.5 rounded-xl glass-panel border border-[var(--border-color)]"
                    >
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Jain">Jain</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Halal">Halal</option>
                      <option value="Gluten-Free">Gluten-Free</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-bold block mb-1">Plus-Ones</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={gPlusOnes}
                    onChange={(e) => setGPlusOnes(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl glass-panel border border-[var(--border-color)]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl glass-panel"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold"
                  >
                    Add Guest
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* AI Invitation Generator Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl border border-purple-500/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  AI Invitation Message Generator
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1.5">Selected Tone</label>
                  <div className="flex gap-2">
                    {['Royal & Formal', 'Warm & Celebratory', 'Modern & Casual'].map((tone) => (
                      <button
                        key={tone}
                        type="button"
                        onClick={() => setInviteTone(tone as any)}
                        className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                          inviteTone === tone
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'glass-panel text-[var(--text-muted)]'
                        }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1.5">Generated Invitation Text:</label>
                  <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border-color)] whitespace-pre-wrap leading-relaxed">
                    {getInviteWording()}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 rounded-xl glass-panel"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(getInviteWording());
                      alert('Invitation text copied to clipboard!');
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
