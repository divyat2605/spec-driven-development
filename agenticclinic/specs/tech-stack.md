# AgentClinic Tech Stack

## Frontend
- **React + TypeScript** for a familiar, widely adopted UI layer
- **Next.js** for server-side rendering, routing, API routes, and good developer ergonomics
- **Tailwind CSS** for fast, modern styling and responsive layouts

## Backend / Data
- **Node.js + TypeScript** for the application backend
- **Prisma** as the ORM for a typed database schema
- **SQLite** for local development and lightweight storage
- **PostgreSQL** as an optional production relational database

## APIs and Integration
- **Next.js API routes** or **tRPC** for typed backend communication
- **NextAuth.js** (or similar) for authentication and session management

## Quality and Productivity
- **Vitest** for unit and integration tests
- **Playwright** for browser and end-to-end UI tests
- **ESLint + Prettier** for consistent code quality

## Deployment
- **Vercel** or another modern cloud platform that supports TypeScript/Next.js deployments
- optionally **Railway** or **Fly.io** for backend/database hosting

## Rationale
This stack matches stakeholder requests: a reliable, popular TypeScript architecture with a modern frontend, strong developer experience, and a clean path to a dashboard-driven agent clinic product.