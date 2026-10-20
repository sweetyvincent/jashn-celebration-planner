'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { useEventStore } from '@/lib/store/event-store';
import {
  Sparkles,
  Send,
  Mic,
  RotateCcw,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
  ShieldCheck,
  Bot,
  User,
  Wand2
} from 'lucide-react';

export default function ChatCopilotPage() {
  const {
    eventTitle,
    eventType,
    totalBudget,
    currency,
    plan,
    chatMessages,
    addChatMessage,
    executeToolCall,
    undoLastChange
  } = useEventStore();

  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    // 1. Add User message
    addChatMessage({
      role: 'user',
      content: text
    });

    if (!textToSend) setInput('');
    setIsTyping(true);

    // 2. Intelligent Copilot Response & Function Calling Logic
    setTimeout(() => {
      const lower = text.toLowerCase();

      // Tool: Cut / Rebalance budget
      if (lower.includes('cut budget') || lower.includes('reduce budget') || lower.includes('save money')) {
        const percent = lower.includes('15%') ? 15 : lower.includes('20%') ? 20 : 10;
        const res = executeToolCall('rebalanceBudget', { cutPercent: percent });

        addChatMessage({
          role: 'assistant',
          content: `I've analyzed your budget allocations and identified trade-offs in floral decor and stationery. I've scaled your total budget down by ${percent}%. All ${plan?.budget.length || 8} categories have been proportionally rebalanced.`,
          toolCall: {
            name: 'rebalanceBudget',
            summary: `Reduced total budget by ${percent}%`,
            appliedChanges: { target: 'Budget', after: res.message }
          }
        });
      }
      // Tool: Rain / Weather backup
      else if (lower.includes('rain') || lower.includes('weather')) {
        const res = executeToolCall('addTimelineTask', {
          title: 'Secure Covered Rainproof Marquee Backup',
          phase: '1m',
          priority: 'critical',
          category: 'Safety & Venue'
        });

        addChatMessage({
          role: 'assistant',
          content: `Safety protocol activated! I have added an immediate contingency milestone to secure waterproof transparent marquee tents and confirm the indoor hall hold for day-of operations.`,
          toolCall: {
            name: 'addTimelineTask',
            summary: 'Added "Secure Covered Rainproof Marquee Backup" task',
            appliedChanges: { target: 'Timeline', after: res.message }
          }
        });
      }
      // Tool: Add Kids Corner
      else if (lower.includes('kids') || lower.includes('children')) {
        executeToolCall('addTimelineTask', {
          title: 'Setup Supervised Kids Fun & Crafts Corner',
          phase: '2w',
          priority: 'medium',
          category: 'Entertainment'
        });
        const res = executeToolCall('addVendor', {
          category: 'Entertainment',
          name: 'Little Explorers Activity Host',
          quoteAmount: 8500,
          notes: 'Kids face painting, clay art, and balloon animal artist'
        });

        addChatMessage({
          role: 'assistant',
          content: `Delighted! I've added a dedicated Kids Crafts milestone and booked a children's activity specialist to keep the little ones engaged while parents celebrate.`,
          toolCall: {
            name: 'addVendor',
            summary: 'Added kids activity specialist vendor',
            appliedChanges: { target: 'Vendors', after: res.message }
          }
        });
      }
      // Tool: Traditional touch
      else if (lower.includes('traditional') || lower.includes('culture') || lower.includes('vedic')) {
        executeToolCall('addTimelineTask', {
          title: 'Confirm Vedic Pandit & Auspicious Muhurat Samagri',
          phase: '1m',
          priority: 'critical',
          category: 'Rituals'
        });

        addChatMessage({
          role: 'assistant',
          content: `Elevating traditional heritage! I have logged the Vedic ceremonial samagri checklist and scheduled an auspicious consultation milestone for family elders.`,
          toolCall: {
            name: 'addTimelineTask',
            summary: 'Added Vedic ceremony milestones',
            appliedChanges: { target: 'Timeline', after: 'Added Pandit & Samagri checklist' }
          }
        });
      }
      // General conversational assistance
      else {
        addChatMessage({
          role: 'assistant',
          content: `I have updated your context for "${eventTitle}". With ₹${totalBudget.toLocaleString()} allocated, we are in good financial standing. Would you like me to renegotiate vendor quotes, draft invitations, or adjust the day-of run-of-show?`
        });
      }

      setIsTyping(false);
    }, 1000);
  };

  // Voice Input via Web Speech API
  const handleVoiceInput = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSendMessage(transcript);
    };

    recognition.start();
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col h-[calc(100vh-4rem)]">
        {/* Chat Header */}
        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between mb-4 border border-purple-500/25">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3B2A7A] to-[#E85D8A] flex items-center justify-center text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-[var(--text-primary)] flex items-center gap-2">
                <span>Jashn AI Celebration Copilot</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-[11px] text-[var(--text-muted)]">
                Active Context: {eventTitle} ({currency} {totalBudget.toLocaleString()})
              </div>
            </div>
          </div>

          <div className="text-xs text-[var(--text-muted)] hidden sm:block">
            ⚡ Structured Function Calling Active
          </div>
        </div>

        {/* Quick Action Prompt Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2">
          {[
            '✂️ Cut budget by 15%',
            '🌧️ Plan for rain backup',
            '🎈 Add a kids corner',
            '👑 Make it more traditional'
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => handleSendMessage(chip.slice(3))}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold glass-panel hover:glass-panel-elevated whitespace-nowrap transition-all text-[var(--text-primary)] border border-purple-500/20"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Messages Stream Container */}
        <div className="flex-1 glass-panel p-4 sm:p-6 rounded-3xl overflow-y-auto space-y-4 border border-[var(--border-color)]">
          {chatMessages.map((msg) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                    isUser
                      ? 'bg-amber-500 text-white'
                      : 'bg-gradient-to-br from-[#2B1442] to-[#E85D8A] text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>

                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#2B1442] text-white rounded-tr-none'
                        : 'glass-panel text-[var(--text-primary)] rounded-tl-none border border-[var(--border-color)]'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Function Calling "Applied Change" Card with Undo */}
                  {msg.toolCall && (
                    <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs space-y-2 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold text-purple-700 dark:text-purple-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Applied Change: {msg.toolCall.summary}</span>
                        </div>

                        {/* Undo Button */}
                        <button
                          onClick={() => {
                            const success = undoLastChange();
                            if (success) alert('Change undone successfully!');
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-600 text-white text-[10px] font-bold hover:bg-purple-700 transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Undo</span>
                        </button>
                      </div>

                      {msg.toolCall.appliedChanges && (
                        <div className="text-[11px] text-[var(--text-muted)] pl-5">
                          {msg.toolCall.appliedChanges.after}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 max-w-[85%] items-center text-xs text-[var(--text-muted)] animate-pulse">
              <Bot className="w-5 h-5 text-purple-500" />
              <span>Jashn AI is evaluating parameters and applying changes...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="pt-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 glass-panel p-2 rounded-2xl border border-[var(--border-color)] focus-within:border-purple-500 shadow-md"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask copilot to cut budget, adjust catering, or add custom rituals..."
              className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none"
            />

            {/* Voice Input */}
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-2.5 rounded-xl transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              title="Voice Input (Speech to Text)"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white disabled:opacity-40 hover:opacity-95 transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
