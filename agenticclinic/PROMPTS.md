# AgentClinic — Prompts Used in Development

This project was built using spec-driven development with AI coding assistants (Claude + Cursor). Below are the key prompts used at each phase.

---

## Phase 1 — Core Agent and Ailment Foundation

### Prisma singleton
```
Create lib/prisma.ts as a singleton Prisma client to prevent 
multiple PrismaClient instances in Next.js dev mode.
```

### API routes fix
```
Fix all API routes in app/api/:
- Import prisma from @/lib/prisma instead of new PrismaClient()
- Remove all prisma.$disconnect() calls
- Type params as Promise<{ id: string }> in dynamic routes
- Use const { id } = await params before any Prisma call
```

### Navigation fix
```
Replace all <a href> tags with Next.js <Link href> in app/page.tsx
```

### Hydration fix
```
Add suppressHydrationWarning to <body> in app/layout.tsx to 
prevent Grammarly extension hydration mismatch errors
```

---

## Phase 2 — Therapy Types and Appointments

### Implementation
```
Read the spec files in specs/2026-04-18-therapy-appointments/ 
and implement everything described. Follow the exact same 
patterns used in the existing API routes and pages for agents 
and ailments. Use @/lib/prisma for database access. Type params 
as Promise<{ id: string }> in all dynamic routes. Add Therapy 
Types and Appointments links to the nav in app/layout.tsx.
```

### Duplicate appointment prevention
```
In app/api/appointments/route.ts POST handler add a check 
before creating the appointment:

const existing = await prisma.appointment.findFirst({
  where: { agentId, therapyTypeId, dateTime: new Date(dateTime) }
});
if (existing) {
  return NextResponse.json(
    { error: 'An appointment already exists for this agent, therapy type, and time' },
    { status: 409 }
  );
}

Also show the error message in the booking form UI.
```

---

## Phase 3 — Dashboard

### Implementation
```
Read the spec files in specs/2026-04-19-dashboard/ and implement 
everything described. Follow the exact same patterns used in 
existing API routes and pages. Use @/lib/prisma for database 
access. Add a Dashboard link as the first item in the global nav 
in app/layout.tsx. The dashboard page should have stat cards in 
a grid layout showing counts, an upcoming appointments section, 
and a recent agents section.
```

---

## Phase 4 — UI Beautification

### Beautify
```
Beautify the UI across the entire AgentClinic app. Keep all 
existing functionality unchanged:
- Add colorful stat cards with emoji icons on dashboard
- Add colored left border accents to all cards
- Add hover scale transitions to clickable cards
- Add colored status badges for appointment and agent status
- Add gradient text to home page hero heading
- Add Dashboard button to home page CTAs
- Make nav more polished with hover animations
```

---

## Key Lessons Learned

1. Always create a Prisma singleton in Next.js — never call 
   new PrismaClient() in API routes directly
2. Next.js 15 requires params to be awaited in dynamic routes
3. Never call prisma.$disconnect() in API routes
4. Use router.push() instead of window.location.href
5. Spec first, code second — writing requirements before coding 
   prevents scope creep and keeps the team aligned