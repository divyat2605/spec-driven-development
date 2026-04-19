# Validation for Dashboard and Staff Workflows

## Success criteria
- repository is on branch feature/dashboard
- GET /api/dashboard returns correct stats
- /dashboard page loads without errors
- stat cards show correct counts matching database
- upcoming appointments only show future scheduled ones
- recent agents list shows last 5 agents
- dashboard link appears in global nav
- all links on dashboard navigate correctly

## API endpoint required
- GET /api/dashboard returning:
  {
    totalAgents: number,
    totalAilments: number,
    totalTherapyTypes: number,
    appointments: {
      scheduled: number,
      completed: number,
      cancelled: number
    },
    upcomingAppointments: Appointment[],
    recentAgents: Agent[]
  }

## Pages required
- /dashboard — main staff dashboard with stats and quick links

## Tests and verification
- API returns 200 with correct shape
- counts match actual database records
- upcoming appointments list is empty when none are scheduled
- page is responsive on mobile and desktop
- nav link to dashboard works from every page

## Merge readiness
- all new files committed on feature branch
- no unresolved conflicts or failing tests
- feature meets scoped requirements without scope creep
- reviewed against mission.md and roadmap.md before merging