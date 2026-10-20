# Jashn — Deployment & Operations Guide

## 1. Quick Start Locally

```bash
cd jashn
pnpm install
pnpm dev
```
Navigate to `http://localhost:3000`. Demo mode works with zero environment variables or keys required!

## 2. Environment Variables

Create `.env.local` or configure in your deployment provider:

```env
# Required for live AI generation (leave blank for rich demo mode)
GEMINI_API_KEY=""

# Database
DATABASE_URL="file:./dev.db"

# Public Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Demo Mode toggle
DEMO_MODE="true"
```

## 3. Deploying to Vercel

1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Set the build command to `pnpm build` and output directory to `.next`.
4. Add `GEMINI_API_KEY` in environment variables if desired.
5. Deploy!
