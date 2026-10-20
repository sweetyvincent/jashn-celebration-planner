'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { CelebrationCanvas } from '@/components/3d/CelebrationCanvas';
import { useEventStore } from '@/lib/store/event-store';
import {
  Sparkles,
  Heart,
  CheckCircle2,
  Calendar,
  MapPin,
  Utensils,
  UserCheck,
  Send
} from 'lucide-react';

export default function PublicRSVPPage() {
  const params = useParams();
  const { eventTitle, eventType, eventDate, city, addGuest } = useEventStore();

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [dietary, setDietary] = useState('Vegetarian');
  const [plusOnes, setPlusOnes] = useState(0);
  const [status, setStatus] = useState<'accepted' | 'declined'>('accepted');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    addGuest({
      name: guestName.trim(),
      email: guestEmail,
      group: 'RSVP Guest',
      dietary: [dietary],
      plusOnes: Number(plusOnes),
      rsvpStatus: status
    });

    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--bg-primary)] overflow-hidden">
      {/* 3D Festive Atmosphere Backdrop */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <CelebrationCanvas eventType={eventType} intensity="celebration" />
      </div>

      <div className="relative z-10 max-w-lg w-full space-y-6">
        {/* Animated Celebration Invitation Card */}
        <div className="glass-panel-elevated p-8 rounded-3xl border border-amber-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
          {/* Subtle top gold foil accent */}
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 mx-auto" />

          <div className="space-y-2">
            <span className="text-4xl block animate-bounce">
              {eventType === 'wedding' ? '💍' : eventType === 'birthday' ? '🎂' : '🎪'}
            </span>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Cordially Invited
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
              {eventTitle}
            </h1>
            <p className="text-xs text-[var(--text-muted)]">
              We look forward to celebrating this joyful milestone together with you.
            </p>
          </div>

          {/* Date & Location Pill */}
          <div className="flex items-center justify-center gap-4 py-3 border-y border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-500" />
              <span>{eventDate || 'Auspicious Date'}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{city || 'Celebration Venue'}</span>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-left text-xs">
              <div>
                <label className="font-bold block mb-1 text-[var(--text-primary)]">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Anand & Sunita Sharma"
                  className="w-full p-3 rounded-xl glass-panel border border-[var(--border-color)] text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-[var(--text-primary)]">
                  Email / Contact
                </label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="anand@example.com"
                  className="w-full p-3 rounded-xl glass-panel border border-[var(--border-color)] text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-[var(--text-primary)]">
                    Will you attend?
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl glass-panel border border-[var(--border-color)] text-xs font-semibold"
                  >
                    <option value="accepted">Joyfully Accept ✓</option>
                    <option value="declined">Regretfully Decline</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-[var(--text-primary)]">
                    Accompanying Guests
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="6"
                    value={plusOnes}
                    onChange={(e) => setPlusOnes(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl glass-panel border border-[var(--border-color)] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1 text-[var(--text-primary)]">
                  Dietary Accommodations
                </label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-panel border border-[var(--border-color)] text-xs"
                >
                  <option value="Vegetarian">Pure Vegetarian</option>
                  <option value="Jain">Jain (No Root Veggies)</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Halal">Halal</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                  <option value="Nut Allergy">Nut Allergy Safe</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-sm font-bold shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Confirm My RSVP</span>
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <div className="font-bold text-base text-[var(--text-primary)]">
                Thank you, {guestName}!
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                {status === 'accepted'
                  ? 'Your attendance has been confirmed. The hosts have been notified with your dietary preferences.'
                  : 'We will miss you, but thank you for letting us know.'}
              </p>
            </div>
          )}
        </div>

        <div className="text-center text-[11px] text-[var(--text-muted)]">
          Powered by Jashn — AI Celebration & Event Planner
        </div>
      </div>
    </div>
  );
}
