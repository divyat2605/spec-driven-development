# Validation for Therapy Management and Appointments

## Success criteria
- the repository is on branch `feature/therapy-appointments`
- CRUD operations for therapy types work end to end
- appointments can be created, listed, and cancelled
- appointment booking form accepts agent, therapy type, date, and time
- agent detail page shows that agent's appointments
- all new pages are responsive and render without errors in a modern browser

## API endpoints required
- GET /api/therapy-types
- POST /api/therapy-types
- GET /api/therapy-types/[id]
- PUT /api/therapy-types/[id]
- DELETE /api/therapy-types/[id]
- GET /api/appointments
- POST /api/appointments
- GET /api/appointments/[id]
- PUT /api/appointments/[id]
- DELETE /api/appointments/[id]

## Pages required
- /therapy-types — list all therapy types, create new
- /therapy-types/[id] — view and delete a therapy type
- /appointments — list all appointments
- /appointments/new — booking form
- /appointments/[id] — view, complete, or cancel an appointment

## Tests and verification
- API routes return correct status codes for valid and invalid requests
- booking form validates that agent, therapy type, and date are all provided
- cancelling an appointment updates status to cancelled
- completing an appointment updates status to completed
- agent detail page shows correct appointments for that agent
- manual browser test confirms responsive layout and navigation

## Merge readiness
- all new files committed on feature branch
- no unresolved conflicts or failing tests
- feature meets scoped requirements without scope creep
- reviewed against mission.md and roadmap.md before merging