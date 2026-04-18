# Plan for Core Agent and Ailment Foundation

1. Project scaffolding
   - initialize a Next.js + TypeScript project inside `agenticclinic`
   - configure Prisma with SQLite for local development
   - set up ESLint, Prettier, and basic project conventions

2. Data modeling
   - define `Agent`, `Ailment`, and `TherapyType` models in Prisma schema
   - include relationships and key fields for name, status, severity, and treatment notes
   - generate Prisma client and verify migrations work with SQLite

3. Basic features and UI
   - implement CRUD flows for agents
   - implement CRUD flows for ailments
   - build list and detail pages for agents and their ailments
   - ensure responsive layout and browser-friendly behavior

4. Validation and review
   - add tests for data model integrity and backend API routes
   - add UI smoke tests for agent and ailment management screens
   - review against mission goals and tech stack guidance before merging
