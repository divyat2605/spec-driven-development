# Requirements for Therapy Management and Appointments

## Scope
- support creating, reading, updating, and deleting therapy types
- support booking appointments for agents with a chosen therapy type
- support cancelling and completing appointments
- display appointments on agent detail pages
- provide list and detail pages for therapy types and appointments

## Context
- continues Phase 1 foundation of agents and ailments
- aligns with `specs/mission.md` staff productivity goal
- aligns with `specs/roadmap.md` Phase 2 objectives
- uses the same TypeScript + Next.js + Prisma + SQLite stack

## Decisions
- therapy types are managed by staff, not agents
- appointments require an agent, a therapy type, and a date/time
- appointment status values: scheduled, completed, cancelled
- duration defaults to the therapy type duration but can be overridden
- no availability or conflict checking in this phase — kept simple
- UI follows the same styling patterns as Phase 1

## Data model (already in schema)
- TherapyType: id, name, description, duration, createdAt, updatedAt
- Appointment: id, agentId, therapyTypeId, dateTime, duration, notes, status, createdAt, updatedAt