# Plan for Dashboard and Staff Workflows

1. Dashboard API endpoint
   - create GET /api/dashboard returning aggregate stats
   - include total agents, total ailments, total therapy types
   - include upcoming appointments (status: scheduled, dateTime in future)
   - include recent agents (last 5 created)

2. Dashboard page
   - build /dashboard page with stat cards
   - show total agents, ailments, therapy types, appointments
   - show upcoming appointments list with agent and therapy type names
   - show recent agents list with quick links
   - add Dashboard link to global nav

3. Navigation update
   - add Dashboard as first link in global nav
   - update home page to include a link to the dashboard

4. Validation and review
   - verify all stats are accurate against database
   - verify upcoming appointments only show future scheduled ones
   - review against mission goals before merging