# AgentClinic

A full-stack clinic management system for AI agents, built with spec-driven development.

## What it does
AgentClinic gives AI agents a safe place to get relief, recovery, and dependable care workflows. Staff can manage agents, track ailments, book therapy appointments, and monitor clinic activity from a central dashboard.

## Features
- **Agents** — create and manage AI agents with status tracking
- **Ailments** — log and track agent ailments with severity levels
- **Therapy Types** — define available therapy sessions with duration
- **Appointments** — book agents into therapy sessions with date and time
- **Dashboard** — staff overview with stats and upcoming appointments

## Tech Stack
- **Next.js 15** — App Router, API routes, server and client components
- **TypeScript** — end-to-end type safety
- **Prisma ORM** — typed database schema and queries
- **SQLite** — lightweight local database
- **Tailwind CSS v4** — responsive modern styling

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation
```bash
git clone https://github.com/yourname/agenticclinic
cd agenticclinic
npm install
```

### Database setup
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure
```
agenticclinic/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/                # REST API endpoints
│   ├── agents/             # Agent management pages
│   ├── ailments/           # Ailment management pages
│   ├── therapy-types/      # Therapy type pages
│   ├── appointments/       # Appointment booking pages
│   └── dashboard/          # Staff dashboard
├── lib/
│   └── prisma.ts           # Prisma client singleton
├── prisma/
│   └── schema.prisma       # Database schema
└── specs/                  # Spec-driven development documents
```

## Development Methodology
This project was built using **spec-driven development** — requirements, plans, and validation criteria were written before any code. See the `specs/` folder for full documentation.

## Roadmap
- [x] Phase 1 — Agents and ailments foundation
- [x] Phase 2 — Therapy types and appointments
- [x] Phase 3 — Dashboard and staff workflows
- [x] Phase 4 — Polish, tests, and deployment