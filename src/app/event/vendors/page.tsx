'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { useEventStore } from '@/lib/store/event-store';
import { VendorItem } from '@/types/event';
import { MarketplaceVendor } from '@/app/api/vendors/search/route';
import {
  Store,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  HelpCircle,
  Plus,
  CheckCircle2,
  Filter,
  DollarSign,
  ShieldAlert,
  ArrowRight,
  MessageCircle,
  Search,
  Sparkles,
  Lock,
  Download,
  CreditCard,
  Camera
} from 'lucide-react';

export default function VendorsPage() {
  const { eventTitle, eventType, city, eventDate, guestCount, plan, addVendor, updateVendor, deleteVendor } = useEventStore();

  const [activeTab, setActiveTab] = useState<'myVendors' | 'marketplace'>('myVendors');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Marketplace states
  const [marketVendors, setMarketVendors] = useState<MarketplaceVendor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [marketCity, setMarketCity] = useState(city || 'Jaipur');
  const [isLoadingMarket, setIsLoadingMarket] = useState(false);

  // Escrow Payment Modal State
  const [escrowModalVendor, setEscrowModalVendor] = useState<VendorItem | null>(null);
  const [escrowMilestone, setEscrowMilestone] = useState<'deposit' | 'midway' | 'final'>('deposit');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [escrowReceipt, setEscrowReceipt] = useState<any | null>(null);

  // New manual vendor form state
  const [vName, setVName] = useState('');
  const [vCategory, setVCategory] = useState('Venue');
  const [vQuote, setVQuote] = useState('');
  const [vNotes, setVNotes] = useState('');

  const myVendors = plan?.vendors || [];
  const categories = ['All', 'Venue', 'Catering', 'Decor', 'Photography', 'Music / DJ', 'Styling / Makeup', 'Entertainment'];

  // Fetch Marketplace Vendors from API
  const fetchMarketplace = async (cat = selectedCategory, c = marketCity, q = searchQuery) => {
    setIsLoadingMarket(true);
    try {
      const url = `/api/vendors/search?category=${encodeURIComponent(cat)}&city=${encodeURIComponent(c)}&query=${encodeURIComponent(q)}`;
      const res = await fetch(url);
      const data = await res.json();
      setMarketVendors(data.vendors || []);
    } catch (err) {
      console.error('Failed to fetch marketplace:', err);
    } finally {
      setIsLoadingMarket(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'marketplace') {
      fetchMarketplace();
    }
  }, [activeTab, selectedCategory, marketCity]);

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vName.trim()) return;

    addVendor({
      name: vName.trim(),
      category: vCategory,
      status: 'researching',
      quoteAmount: vQuote ? Number(vQuote) : undefined,
      notes: vNotes,
      questionsToAsk: [
        'What are the cancellation & refund terms?',
        'Do you provide written contracts with milestone delivery dates?'
      ]
    });

    setVName('');
    setVQuote('');
    setVNotes('');
    setShowAddModal(false);
  };

  // One-click Add from Marketplace to My Event
  const handleAddFromMarketplace = (mv: MarketplaceVendor) => {
    addVendor({
      name: mv.name,
      category: mv.category,
      status: 'contacted',
      quoteAmount: mv.priceLevel === '₹₹₹₹' ? 600000 : mv.priceLevel === '₹₹₹' ? 250000 : 75000,
      contact: {
        person: 'Lead Coordinator',
        phone: mv.phone,
        website: mv.address
      },
      notes: `${mv.description} Verified Badges: ${mv.badges.join(', ')}`,
      questionsToAsk: [
        'What are your peak-season dates holding policies?',
        'Do you include backup power and logistics personnel in your package?'
      ]
    });

    alert(`Added "${mv.name}" to your active event blueprint!`);
    setActiveTab('myVendors');
  };

  // WhatsApp Business Direct Connect URL
  const generateWhatsAppUrl = (phone: string, vendorName: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = `Namaste ${vendorName}! I am planning a ${eventType} for ${guestCount} guests in ${city || 'our city'}${
      eventDate ? ` on ${eventDate}` : ''
    }. I found your verified profile on Jashn AI Celebration Studio and would love to check your availability and package options.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  // Escrow Payment Handler
  const handleInitiateEscrowPayment = async (gateway: 'razorpay' | 'stripe') => {
    if (!escrowModalVendor) return;
    setIsProcessingPayment(true);

    const total = escrowModalVendor.quoteAmount || 100000;
    const amount =
      escrowMilestone === 'deposit'
        ? Math.round(total * 0.25)
        : escrowMilestone === 'midway'
        ? Math.round(total * 0.5)
        : Math.round(total * 0.25);

    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId: escrowModalVendor.id,
          vendorName: escrowModalVendor.name,
          milestoneTitle:
            escrowMilestone === 'deposit'
              ? 'Advance Booking Deposit (25%)'
              : escrowMilestone === 'midway'
              ? 'Midway Milestone Progress (50%)'
              : 'Day-Of Final Settlement (25%)',
          amount,
          currency: 'INR',
          gateway
        })
      });

      const data = await res.json();
      setEscrowReceipt(data);

      // Update vendor status to booked / paid
      updateVendor(escrowModalVendor.id, {
        status: escrowMilestone === 'final' ? 'paid' : 'booked',
        notes: `Escrow Protected (${data.escrowId}). Milestone: ${data.milestoneTitle}`
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const statusColors: Record<VendorItem['status'], string> = {
    researching: 'bg-zinc-500/15 text-zinc-600 dark:text-zinc-400',
    contacted: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
    quoted: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    booked: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    paid: 'bg-purple-500/15 text-purple-600 dark:text-purple-400'
  };

  const filteredMyVendors =
    selectedCategory === 'All' ? myVendors : myVendors.filter((v) => v.category === selectedCategory);

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Store className="w-4 h-4" />
              <span>Vendor Marketplace & Escrow Protected Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1">
              Vendors & Partnerships
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
              Live Google Places directory, WhatsApp instant inquiries, and secure milestone escrow payments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/event/ar-walkthrough"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md hover:bg-purple-700 transition-all"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>AR Venue Walkthrough</span>
            </Link>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-700 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation: Active Event Vendors vs Live Marketplace */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('myVendors')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'myVendors'
                  ? 'bg-[#2B1442] text-white dark:bg-white dark:text-[#2B1442] shadow-sm'
                  : 'glass-panel text-[var(--text-muted)]'
              }`}
            >
              📋 My Event Vendors ({myVendors.length})
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'marketplace'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'glass-panel text-[var(--text-muted)]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Explore Marketplace (Google Places & WhatsApp)</span>
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-white font-bold'
                    : 'glass-panel text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: MY ACTIVE EVENT VENDORS */}
        {activeTab === 'myVendors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMyVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] space-y-4 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                        {vendor.category}
                      </span>
                      <h3 className="font-extrabold text-base text-[var(--text-primary)] mt-0.5">
                        {vendor.name}
                      </h3>
                    </div>

                    <select
                      value={vendor.status}
                      onChange={(e) => updateVendor(vendor.id, { status: e.target.value as VendorItem['status'] })}
                      className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg border-0 cursor-pointer ${
                        statusColors[vendor.status]
                      }`}
                    >
                      <option value="researching">Researching</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="booked">Booked (Escrow)</option>
                      <option value="paid">Paid (Disbursed)</option>
                    </select>
                  </div>

                  <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-muted)]">Agreed / Quoted:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                        {vendor.quoteAmount ? `₹${vendor.quoteAmount.toLocaleString()}` : 'Pending Quote'}
                      </strong>
                    </div>
                    {vendor.notes && (
                      <p className="text-[11px] text-[var(--text-muted)] pt-1 border-t border-[var(--border-color)]">
                        {vendor.notes}
                      </p>
                    )}
                  </div>

                  {/* AI Questions to Ask */}
                  {vendor.questionsToAsk && vendor.questionsToAsk.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        <span>AI Negotiation Questions:</span>
                      </span>
                      <ul className="space-y-1 text-[11px] text-[var(--text-muted)] list-disc pl-4">
                        {vendor.questionsToAsk.slice(0, 2).map((q, qIdx) => (
                          <li key={qIdx}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Bottom Actions: Escrow Payment & WhatsApp Direct */}
                <div className="pt-3 border-t border-[var(--border-color)] space-y-2">
                  <div className="flex items-center gap-2">
                    {/* Pay via Escrow */}
                    <button
                      onClick={() => {
                        setEscrowModalVendor(vendor);
                        setEscrowReceipt(null);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all"
                    >
                      <Lock className="w-3.5 h-3.5 text-emerald-200" />
                      <span>{vendor.status === 'booked' ? 'Pay Milestone' : 'Escrow Deposit'}</span>
                    </button>

                    {/* WhatsApp Inquiry */}
                    <a
                      href={generateWhatsAppUrl(vendor.contact?.phone || '+91 98290 12345', vendor.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-sm"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-[var(--text-muted)]">
                    <span>🛡️ Escrow Dispute Protected</span>
                    <button
                      onClick={() => deleteVendor(vendor.id)}
                      className="text-rose-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: LIVE MARKETPLACE EXPLORER (Google Places & WhatsApp) */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            {/* Search & Location Bar */}
            <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-3 border border-emerald-500/20">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchMarketplace()}
                  placeholder="Search venues, decorators, royal caterers..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-panel border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={marketCity}
                  onChange={(e) => setMarketCity(e.target.value)}
                  placeholder="City (e.g. Jaipur, Udaipur)"
                  className="px-3 py-2.5 rounded-xl glass-panel border border-[var(--border-color)] text-xs text-[var(--text-primary)] w-36"
                />
                <button
                  onClick={() => fetchMarketplace()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-sm"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Marketplace Vendor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketVendors.map((mv) => (
                <div
                  key={mv.id}
                  className="glass-panel rounded-3xl overflow-hidden border border-[var(--border-color)] hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  {/* Photo & Rating Header */}
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-black/20">
                      <img
                        src={mv.image}
                        alt={mv.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-400 font-extrabold text-xs flex items-center gap-1 shadow-md">
                        <span>★</span>
                        <span>{mv.rating}</span>
                        <span className="text-[10px] text-zinc-300 font-normal">({mv.reviewCount})</span>
                      </div>
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-wider">
                        {mv.category}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-extrabold text-base text-[var(--text-primary)] leading-snug">
                          {mv.name}
                        </h3>
                        <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                          📍 {mv.address}
                        </p>
                      </div>

                      <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                        {mv.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {mv.badges.map((b, bIdx) => (
                          <span
                            key={bIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400"
                          >
                            ✓ {b}
                          </span>
                        ))}
                      </div>

                      <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between text-xs">
                        <span className="text-[var(--text-muted)]">Price Range:</span>
                        <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                          {mv.estimatedRange}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 border-t border-[var(--border-color)] space-y-2 mt-2">
                    <div className="flex items-center gap-2 pt-3">
                      {/* WhatsApp Business Action */}
                      <a
                        href={generateWhatsAppUrl(mv.phone, mv.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Inquiry</span>
                      </a>

                      {/* Add to Plan */}
                      <button
                        onClick={() => handleAddFromMarketplace(mv)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-white text-xs font-bold transition-all shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Plan</span>
                      </button>
                    </div>

                    <div className="text-[10px] text-center text-[var(--text-muted)]">
                      Instant WhatsApp response • Google Places Verified
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ESCROW & MILESTONE PAYMENT MODAL */}
        {escrowModalVendor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-5 shadow-2xl border border-emerald-500/40 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-500" />
                  <div>
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">
                      Escrow Milestone Deposit
                    </h2>
                    <span className="text-xs text-[var(--text-muted)]">
                      Vendor: <strong>{escrowModalVendor.name}</strong>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setEscrowModalVendor(null)}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  ✕ Close
                </button>
              </div>

              {!escrowReceipt ? (
                <div className="space-y-4 text-xs">
                  {/* Milestone Selection */}
                  <div className="space-y-2">
                    <label className="font-bold uppercase tracking-wider text-[var(--text-primary)] block">
                      Select Milestone Stage
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setEscrowMilestone('deposit')}
                        className={`p-3 rounded-xl text-center transition-all ${
                          escrowMilestone === 'deposit'
                            ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400'
                            : 'glass-panel text-[var(--text-muted)]'
                        }`}
                      >
                        <div className="text-sm font-extrabold">25%</div>
                        <div className="text-[10px] mt-0.5">Booking Advance</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEscrowMilestone('midway')}
                        className={`p-3 rounded-xl text-center transition-all ${
                          escrowMilestone === 'midway'
                            ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400'
                            : 'glass-panel text-[var(--text-muted)]'
                        }`}
                      >
                        <div className="text-sm font-extrabold">50%</div>
                        <div className="text-[10px] mt-0.5">Midway Progress</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setEscrowMilestone('final')}
                        className={`p-3 rounded-xl text-center transition-all ${
                          escrowMilestone === 'final'
                            ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400'
                            : 'glass-panel text-[var(--text-muted)]'
                        }`}
                      >
                        <div className="text-sm font-extrabold">25%</div>
                        <div className="text-[10px] mt-0.5">Final Day-Of</div>
                      </button>
                    </div>
                  </div>

                  {/* Escrow Guarantee Banner */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5">
                    <div className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-emerald-500" />
                      <span>How Jashn Escrow Safeguards Your Money</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                      Your payment is locked into a neutral escrow account. It is only disbursed to{' '}
                      <strong>{escrowModalVendor.name}</strong> when you inspect and approve the setup on-site. If the vendor defaults, 100% of your deposit is refunded.
                    </p>
                  </div>

                  {/* Calculated Amount */}
                  <div className="p-3.5 rounded-xl glass-panel border border-[var(--border-color)] flex justify-between items-center text-sm font-bold">
                    <span>Deposit Due Now:</span>
                    <span className="text-xl text-emerald-600 dark:text-emerald-400 font-extrabold">
                      ₹
                      {Math.round(
                        (escrowModalVendor.quoteAmount || 100000) *
                          (escrowMilestone === 'deposit' ? 0.25 : escrowMilestone === 'midway' ? 0.5 : 0.25)
                      ).toLocaleString()}
                    </span>
                  </div>

                  {/* Gateway Payment Buttons */}
                  <div className="space-y-2 pt-2">
                    <button
                      disabled={isProcessingPayment}
                      onClick={() => handleInitiateEscrowPayment('razorpay')}
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pay via Razorpay (UPI, Netbanking, Cards)</span>
                    </button>

                    <button
                      disabled={isProcessingPayment}
                      onClick={() => handleInitiateEscrowPayment('stripe')}
                      className="w-full py-2.5 rounded-xl glass-panel hover:bg-black/5 dark:hover:bg-white/5 font-semibold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      <span>Pay via Stripe (International Cards)</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Escrow Success Receipt */
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-extrabold text-base text-[var(--text-primary)]">
                      Funds Secured in Escrow
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      Milestone payment for <strong>{escrowReceipt.vendorName}</strong> has been successfully authorized and held.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 text-left text-xs space-y-2 border border-[var(--border-color)]">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Escrow Reference ID:</span>
                      <strong className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {escrowReceipt.escrowId}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Amount Held:</span>
                      <strong>₹{escrowReceipt.amount?.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Milestone:</span>
                      <span>{escrowReceipt.milestoneTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Status:</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-600">
                        Locked & Protected
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEscrowModalVendor(null)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => alert(`Receipt downloaded for ${escrowReceipt.escrowId}`)}
                      className="px-4 py-2.5 rounded-xl glass-panel text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Receipt</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add Vendor Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-md w-full space-y-4 shadow-2xl border border-amber-500/30">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Add Custom Vendor</h2>
              <form onSubmit={handleCreateVendor} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Vendor / Firm Name</label>
                  <input
                    type="text"
                    required
                    value={vName}
                    onChange={(e) => setVName(e.target.value)}
                    placeholder="e.g. Royal Rajwada Sound & Light"
                    className="w-full p-2.5 rounded-xl glass-panel border border-[var(--border-color)] focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Category</label>
                  <select
                    value={vCategory}
                    onChange={(e) => setVCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl glass-panel border border-[var(--border-color)] focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Venue">Venue</option>
                    <option value="Catering">Catering</option>
                    <option value="Decor">Decor</option>
                    <option value="Photography">Photography</option>
                    <option value="Music / DJ">Music / DJ</option>
                    <option value="Styling / Makeup">Styling / Makeup</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Estimated / Quoted Amount (₹)</label>
                  <input
                    type="number"
                    value={vQuote}
                    onChange={(e) => setVQuote(e.target.value)}
                    placeholder="e.g. 50000"
                    className="w-full p-2.5 rounded-xl glass-panel border border-[var(--border-color)] focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Notes</label>
                  <textarea
                    value={vNotes}
                    onChange={(e) => setVNotes(e.target.value)}
                    placeholder="Special requirements, contact details..."
                    className="w-full p-2.5 rounded-xl glass-panel border border-[var(--border-color)] focus:ring-1 focus:ring-amber-500 h-20"
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
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                  >
                    Save Vendor
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
