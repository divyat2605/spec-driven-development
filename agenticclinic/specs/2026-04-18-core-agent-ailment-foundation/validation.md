# Validation for Core Agent and Ailment Foundation

## Success criteria
- the repository is on branch `feature/core-agent-ailment-foundation`
- a Next.js + TypeScript project is initialized and runs locally
- Prisma schema includes agents, ailments, and therapy type definitions
- CRUD operations for agents and ailments work end-to-end
- agent list and ailment detail pages render without errors in a modern browser
- a home page is in place and links correctly to agent and ailment management sections

## Tests and verification
- unit tests cover the Prisma models and API routes
- UI tests verify agent creation, editing, and deletion flows
- UI tests verify home page navigation to agent and ailment sections
- manual confirmation that the app is responsive and browser-friendly
- review the implementation for alignment with `specs/mission.md` and `specs/tech-stack.md`

## Merge readiness
- all new files are committed on the feature branch
- no unresolved conflicts or failing tests remain
- the feature meets the scoped requirements without uncontrolled scope creep
