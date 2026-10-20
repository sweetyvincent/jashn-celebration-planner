# Jashn — Technical Architecture & System Design

## 1. System Topology

```
+-------------------------------------------------------------+
|                      Client (Browser)                       |
|   Next.js 15 App Router | React 19 | Tailwind CSS v4        |
|   Zustand Event Store | Canvas 3D Atmosphere | Web Speech   |
+------------------------------+------------------------------+
                               |
                   Fetch & Server Actions
                               |
+------------------------------v------------------------------+
|                    Next.js Backend Server                   |
|   Route Handlers (/api/ai/*) | Zod Schemas | Seed Fixtures  |
+--------------+------------------------------+---------------+
               |                              |
         REST / SSE                     SQLite / Prisma ORM
               |                              |
+--------------v---------------+      +-------v---------------+
|    Google Gemini API         |      |  Prisma Local SQLite  |
|  gemini-2.5-pro / flash      |      |  (PostgreSQL in Prod) |
+------------------------------+      +-----------------------+
```

## 2. Key Architecture Pillars

### 2.1 State Management & Offline-First Resilience
- **Zustand + Local Storage**: Every change in the plan, whether initiated by user clicks, sliders, or the AI Copilot via function calling, is persisted synchronously in local storage.
- **Undo Stack**: Tool executions take a snapshot before applying modifications. Users can hit "Undo" on any AI-driven mutation.

### 2.2 Dual-Mode AI Engine (Zero-Key Demo vs Live Gemini)
- `DEMO_MODE=true` or absence of `GEMINI_API_KEY`: The application gracefully serves rich, culturally authentic blueprints scaled dynamically to the user's specific guest count and total budget.
- `GEMINI_API_KEY` present: The system queries `gemini-2.5-flash` with structured output schemas (`responseMimeType: 'application/json'`).

### 2.3 Procedural 60 FPS 3D & Accessibility
- The 3D celebration canvas uses procedural geometry, particle kinematics, and radial aura bloom shaders.
- It detects `prefers-reduced-motion` and provides an explicit "Lite Mode" toggle for low-power devices.
