# 🎉 Jashn — AI Celebration & Event Planner (GenAI + 3D)

> **Jashn** (Celebration in Urdu/Hindi) is a production-quality, GenAI-powered planning web app for weddings, milestone birthdays, and community festivals. It generates comprehensive budgets, timelines, vendor checklists, guest management, and personalized ideas, wrapped in a polished, cinematic, **3D-animated** interface.

---

## ✨ Signature Features

- **🪄 Onboarding Wizard**: Step-by-step celebration architect with a 3D scene that morphs dynamically with the selected event type (Wedding, Birthday, Community).
- **📊 3D Budget Studio**: Interactive donut chart with explode-on-select, 2D accessible table toggle, planned vs actual vs paid tracking, and instant **"What-If" live simulation sliders**.
- **⏱️ Timeline & Minute-by-Minute Run-of-Show**: Kanban task board, backward planning from 12 months down to minute-level day-of cue sheets with `.ics` export and printable format.
- **🏬 Vendor Marketplace & Google Places Directory**: Live directory connected to Google Places API with ratings, verified badges, and **direct WhatsApp Business inquiry links**.
- **🔒 Escrow & Milestone Payments (Razorpay / Stripe)**: Advance deposits held safely in neutral escrow (25% booking, 50% midway, 25% final settlement) with 100% dispute protection and downloadable tax receipts.
- **📱 WebXR / Augmented Reality Venue Walkthrough**: On-site AR camera simulator allowing couples and organizers to project life-size 3D Royal Mandap arches, birthday stages, and diya pavilions over their real venue camera.
- **👥 Guest Manager & Public RSVP**: Full guest list, dietary badges, plus-ones, table seating assignments, and a public shareable RSVP portal (`/rsvp/[token]`) with animated invitation.
- **💡 Creative Ideas Studio & Moodboard**: Curated decor concepts, live food counters, and budget-saving hacks with AI "Regenerate with Twist" controls.
- **🤖 Actionable AI Copilot**: Conversational assistant with structured function-calling tools (`updateBudget`, `addTimelineTask`, `addVendor`, `rebalanceBudget`, etc.), visible "Applied change" cards, and **instant Undo**.
- **🎨 Living Design System**: Storybook-lite `/design` page showcasing cultural palette tokens (Deep Plum, Royal Indigo, Saffron Gold, Rose, Marigold, Ivory, Emerald).

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript (Strict)
- **Styling**: Tailwind CSS v4 + Radix UI Primitives + Custom Glassmorphism
- **3D & WebXR**: Three.js & procedural HTML5 canvas with adaptive DPR, mouse parallax, WebXR session detection, and Lite / reduced-motion mode
- **State Management**: Zustand (Client state with local persistence and undo stack)
- **AI Engine**: Google Gemini API (`gemini-2.5-flash` / `gemini-2.5-pro`) with strict Zod structured output schemas and zero-key demo mode fallback
- **Marketplace & Gateways**: Google Places API, WhatsApp Business API link generator, Razorpay & Stripe escrow endpoints
- **Exports**: `.ics` Calendar export & CSV spreadsheet downloads

---

## 🛠️ Quick Start

```bash
# Clone the repository
cd jashn

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Demo mode is enabled by default—zero API keys or configuration needed!

---

## 📖 Documentation

- [Architecture & Topology](./docs/ARCHITECTURE.md)
- [AI Prompts & Guardrails](./docs/AI_PROMPTS.md)
- [3D Procedural Graphics & WebXR Guide](./docs/3D_GUIDE.md)
- [Deployment Guide](./docs/DEPLOY.md)
