# Project Context

> Auto-maintained by /sync workflow. Do not edit manually — run /sync after every task.
> Seeded 2026-08-09 from prior project discussions, NOT from a live repo read.
> Every TBD below must be confirmed against the actual codebase before this file is trusted.

## Project Identity
- Name: Flux
- Stack: Next.js (React) + Supabase (Postgres, Auth, RLS) + Vercel
- Type: Fullstack, deployed as a PWA
- Package manager: TBD — confirm via lockfile (package-lock.json / pnpm-lock.yaml / yarn.lock)
- Router convention (App Router vs Pages Router): TBD

## Architecture
- Entry point: TBD
- Route layer: TBD (likely `app/**/page.tsx` if App Router, or `app/api/**` for route handlers)
- Service layer: TBD (likely `lib/` or `services/` wrapping Supabase client calls)
- Data layer: Supabase — schema + RLS policies location TBD (likely `supabase/migrations/`)
- UI layer: TBD (likely `components/`)
- Tests: TBD — no test framework has been confirmed for this project

## Layer Map (What Files Belong to What Layer)
Paths below are Next.js/Supabase conventions — confirm against actual folder names before first use.

### Logic Layer (never touch during UI tasks)
- app/api/ (route handlers)
- lib/supabase/ (client, server, service functions)
- lib/services/
- middleware.ts
- supabase/migrations/, supabase/policies (RLS)

### UI Layer (never touch during logic tasks)
- app/**/page.tsx, app/**/layout.tsx (markup/composition only, not data-fetching logic)
- components/
- styles/
- public/ (static assets)

## Active Decisions
| Decision | Reason | Date |
|---|---|---|
| Auth: Google OAuth as primary login, with a secret-code + password fallback | NSUT students don't receive official college email for weeks after enrollment — email-only OAuth would lock out new students at the exact moment they need the app | Established prior to 2026-08 |
| Stack: Next.js + Supabase + Vercel, shipped as a PWA | Chosen for fast iteration and built-in auth/RLS/hosting — exact tradeoff discussion not recorded, confirm if this needs re-justifying later | Established prior to 2026-08 |
| Memory Vault (post-event content) locked to RSVP status | Ties feature access to verified attendance, prevents non-attendees from viewing/posting event memories | Established prior to 2026-08 |
| Memory Vault extension path: GBrain-style architecture (zero-LLM-call-per-write) for a future "institutional memory for societies" feature | Lowest cost/complexity technical starting point for that wedge, identified during second-brain research | 2026 (exact date TBD) |
| Highest-risk pre-launch audit targets: Supabase RLS policies + custom dual-auth flow | Flagged as needing focused manual audit rather than broad engineering rigor, given launch timeline | Most recent product review before 2026-08-09 |
| Cosmic HUD hero interaction: cursor-local mask reveal, full hero, Earth/nebula visual | Replaces an unrelated flower-HUD stock-footage reference; full spec in DESIGN_GUIDE.md | 2026-08-09 |

## Current Functionality (Stable — Do Not Break)
> Status below reflects DESIGNED/architected features from product decisions, not confirmed shipped code.
> Do not treat this list as "verified working" until checked against the real repo.
- [ ] Google OAuth login
- [ ] Secret-code + password fallback login
- [ ] Society event feeds
- [ ] FOMO mechanics on event feed
- [ ] Post-event Memory Vault (RSVP-gated)
- [ ] CR hub with roll-number-based notifications
- [ ] Ephemeral "Voice of NSUT" posts
- [ ] Universal profile system

## In Progress
- Freshers week launch prep — status TBD, deadline was described as approaching as of last product review
- Pre-launch security audit: Supabase RLS policies + dual auth flow — not yet confirmed complete
- Cosmic HUD hero section — spec complete, Antigravity build prompt written, implementation not yet verified

## Known Issues
- Supabase RLS policies and the custom dual-auth flow are the two highest-blast-radius, least-audited parts of the system as of the last review. Treat any change touching either as high-risk by default.
- No other bugs/tech debt items have been recorded — this section is likely incomplete; populate from real issue tracker if one exists.

## Installed Packages
TBD — populate from package.json. Not tracked in any prior discussion.

## Last Updated
2026-08-09 — Initial bootstrap, seeded from conversation history (not a live repo read). Run /sync after the first real Antigravity task to replace TBDs with actual values.
