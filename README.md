# Carmesim Studio

Website for a tattoo studio: presents the studio, its artists and work, explains how booking works, and sends visitors to WhatsApp to schedule.

🔗 **Live:** [carmesim-ecru.vercel.app](https://carmesim-ecru.vercel.app/)

<!-- Add a screenshot: ![Home](docs/home.png) -->

## Features

- **Landing page** with the studio's pitch, a 4-step "how it works" flow, what to expect and tips to prepare for a session
- **Gallery** with image carousels
- **Artists**, **Events** and **Contact/booking** pages
- **Contact form** with schema validation and hCaptcha bot protection
- **WhatsApp call-to-action** with a pre-filled message
- **Privacy and cookie policy** pages
- Installable web manifest, optimized `.webp` images, light/dark theme support

## Stack

| Area | Tools |
|---|---|
| Framework | Next.js 15 (App Router, Server Actions, middleware), React 19 |
| Language | TypeScript |
| UI | Tailwind CSS v4, Radix UI primitives (shadcn/ui-style components), Lucide icons, Sonner toasts |
| Data & forms | TanStack Query, React Hook Form + Zod |
| Other | hCaptcha, date-fns + react-day-picker, next-themes |
| Deploy | Vercel |

## Project structure

```
src/
├── actions/      # server actions
├── app/          # routes (App Router)
├── components/   # UI components
├── hooks/        # custom hooks
├── lib/          # shared helpers and config
├── providers/    # React context providers
├── services/     # API/service layer
├── types/        # TypeScript types
├── utils/        # utilities
└── middleware.ts
public/           # icons, images, web manifest
```

## Getting started

```bash
git clone <repo-url>
cd carmesim
npm install
cp .env.example .env.local
npm run dev
```

Scripts: `dev` (Turbopack), `build`, `start`, `lint`.

<!-- Create .env.example and list the required variables (hCaptcha keys, API URL, contact info...) -->

## License

All rights reserved.
