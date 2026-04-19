# Requirements for Dashboard and Staff Workflows

## Scope
- build a staff dashboard showing clinic stats at a glance
- show counts for agents, ailments, therapy types, appointments
- show upcoming scheduled appointments
- show recently added agents
- add dashboard link to global navigation

## Context
- aligns with mission.md staff productivity goal
- aligns with roadmap.md Phase 3 objectives
- targets staff who need a quick overview of clinic activity
- uses the same TypeScript + Next.js + Prisma + SQLite stack

## Decisions
- dashboard is a single page at /dashboard
- stats are fetched from a dedicated /api/dashboard endpoint
- upcoming appointments are filtered by dateTime > now and status = scheduled
- recent agents are the last 5 created ordered by createdAt desc
- no authentication required in this phase
- UI follows same styling patterns as existing pages
- stat cards use a clean grid layout with counts prominently displayed

## Data required
- count of all agents
- count of all ailments
- count of all therapy types
- count of all appointments by status (scheduled, completed, cancelled)
- next 5 upcoming appointments with agent and therapy type names
- last 5 agents created