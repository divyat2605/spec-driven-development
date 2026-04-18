# Requirements for Core Agent and Ailment Foundation

## Scope
- establish the foundational data model for AgentClinic
- support creating, reading, updating, and deleting agents
- support creating, reading, updating, and deleting agent ailments
- provide a simple UI for agents and ailment management

## Context
- aligns with `specs/mission.md` by focusing on agent-centric well-being and staff productivity
- targets students learning spec-driven development and developers demonstrating AI agent workflows
- uses the recommended TypeScript stack and SQLite for local development as described in `specs/tech-stack.md`

## Decisions
- use Next.js with TypeScript for frontend and backend API routes
- use Prisma for typed data modeling and SQLite for local storage
- keep the first phase small: agent + ailment management before therapy scheduling
- prioritize clean and maintainable code over early feature breadth
