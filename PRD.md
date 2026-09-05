# PRD: Aarambh — Clubs Orientation Website

**Version:** 1.0
**Status:** Draft
**Author:** Jitesh Raj
**Last Updated:** September 5, 2026
**Target Build Agent:** Claude Code / Cursor

---

## 1. Problem Statement

Every year, ITER (Siksha 'O' Anusandhan University) runs **Aarambh**, an annual clubs-orientation event where every club on campus — technical, cultural, dance, music, and others — hosts a showcase event so students (mainly freshers) can discover clubs and decide which to join. Today, information about which clubs exist, what each club does, when each club's showcase happens, and how to apply is scattered across posters, Instagram stories, and word of mouth. Students have no single place to browse all clubs, check a day-wise schedule, and apply — so they miss events or apply to the wrong club, and clubs lose potential recruits.

**Primary user persona:** A first/second-year ITER student attending Aarambh week, browsing on their phone between classes, trying to decide which 2–3 clubs to check out and apply to.

**Pain point:** No centralized, mobile-friendly source of truth for "what clubs exist, what do they do, when's their event, and how do I apply."

**Opportunity:** Aarambh already has a strong visual identity (the "Coming Soon" poster — cosmic navy/purple background, gold-blue-purple gradient wordmark, star-trail motif). A themed website can ride that identity, launch alongside the poster's "Coming Soon" hype, and become the single hub for the whole event.

---

## 2. Product Overview

**What it is:** A responsive, animated, single-page-app style website for Aarambh — ITER's annual clubs orientation event.

**Core value proposition:** One link where a student can browse every club, read a short "know your club" profile, see exactly which day/time each club's event runs, and apply with one click — no hunting through Instagram or posters.

**Product type:** [x] Web App (static/JAMstack, frontend-only)

**MVP goal:** A visitor can land on the site, browse the full clubs directory, open any club's profile, check the agenda for their event day/time, and click through to that club's Google Form to apply — all on mobile, without creating an account.

**Success criteria (MVP launch):**
- [ ] A visitor can view all clubs, filtered by category, without any page reload lag
- [ ] A visitor can find a specific club's schedule slot (day + time + venue) in under 3 taps from the homepage
- [ ] A visitor can reach any club's Google Form application link in 2 taps or fewer
- [ ] Site scores 90+ on Lighthouse mobile Performance and Accessibility
- [ ] Site is fully usable at 360px width (small Android phones) with no horizontal scroll or overlapping elements

---

## 3. Users & Auth

**User types:**

| Role | Description | Permissions |
|------|-------------|-------------|
| Visitor | Any student browsing the site | Read-only: view clubs, agenda, gallery, about; click out to Google Forms |
| Club/Admin (content owner) | Person maintaining club data before launch | Edits static data files in the repo and redeploys (no in-browser admin panel in MVP) |

**Auth method:** None. Fully public, no login for visitors.

**Session management:** N/A — no accounts, no sessions.

**[DECISION NEEDED: content updates]** — For MVP, club/agenda/gallery data lives in versioned JSON/TS files edited via git and redeployed. Recommended default: yes, keep it this way for MVP; a CMS/admin panel is Post-MVP (see Section 5).

---

## 4. MVP Feature Set

### Feature 1: Animated Landing / Hero Page

**Description:** First screen a visitor sees. Recreates the poster's mood — deep-space navy/purple background, animated star field, the gold-blue-purple gradient "Aarambh" wordmark with its signature star-trail flourish, "Institute of Technical Education & Research presents," and a "Coming Soon" style reveal that switches to live event info once the event date arrives. Includes a countdown timer to event day and clear CTA buttons to the three core pages (Clubs, Agenda, Apply).

**User flow:**
1. Visitor opens the site URL
2. System renders animated hero (fade/parallax star field, animated gradient wordmark, subtle particle drift)
3. Visitor sees countdown (if pre-event) or "Happening Now / Today's Lineup" banner (if event is live)
4. Visitor taps a CTA ("Explore Clubs," "See Agenda," or "Apply Now") and is routed to that page

**Acceptance criteria:**
- [ ] Given the current date is before the event start date, when the page loads, then a live countdown (days:hours:minutes) to the event start is shown
- [ ] Given the current date is during the event window, when the page loads, then the hero shows "Happening Now" plus a link to today's agenda instead of the countdown
- [ ] Given a mobile viewport (≤480px), when the hero renders, then the wordmark, countdown, and CTAs remain fully visible without horizontal scroll
- [ ] Given reduced-motion is enabled in the OS/browser, when the page loads, then decorative animations (particle drift, gradient shimmer) are disabled or minimized
- [ ] Edge case: JS/animation library fails to load → hero still shows static poster-styled background and readable text (progressive enhancement, not blocking)

**UI components needed:** Hero section, animated background canvas/SVG, gradient text component, countdown component, primary/secondary CTA buttons, sticky nav bar

---

### Feature 2: Clubs Directory

**Description:** A single page listing every club participating in Aarambh, grouped/filterable by category (e.g., Technical, Cultural, Dance, Music, Literary, Other — exact category list TBD, see Open Questions). Each club is a card showing its logo, name, and category tag. Tapping a card opens that club's detail view.

**User flow:**
1. Visitor navigates to "Clubs"
2. System renders a filterable grid of club cards (all clubs by default)
3. Visitor optionally taps a category filter chip to narrow the list
4. Visitor taps a club card
5. System opens the Club Detail view for that club (Feature 3)

**Acceptance criteria:**
- [ ] Given the Clubs page loads, when no filter is applied, then all clubs are shown in a responsive grid (1 column on mobile, 2–3 on tablet, 4+ on desktop)
- [ ] Given a category filter chip is tapped, when the filter is active, then only clubs matching that category are shown and the chip is visually marked active
- [ ] Given a club has no logo image available, when its card renders, then a styled placeholder/initial-based avatar is shown instead of a broken image
- [ ] Given a club card is tapped, when the transition happens, then it navigates (or opens a modal) to that club's detail view in one interaction (one click, as requested)
- [ ] Edge case: zero clubs match the selected filter → an empty-state message is shown, not a blank grid

**UI components needed:** Category filter chip bar, responsive card grid, club card component (logo, name, category tag), club detail modal/route, image fallback avatar

---

### Feature 3: Club Detail ("Know Your Club")

**Description:** The profile for a single club — logo, full name, category, a short "About/Know Your Club" description, notable achievements or highlights (optional field), social/Instagram link (optional), and a prominent "Apply to this Club" button that opens that club's specific Google Form in a new tab.

**User flow:**
1. Visitor opens a club from the Clubs Directory (or via direct link `/clubs/:slug`)
2. System displays the club's full profile
3. Visitor reads the "Know Your Club" description
4. Visitor taps "Apply to this Club"
5. System opens the club's Google Form link in a new browser tab

**Acceptance criteria:**
- [ ] Given a valid club slug in the URL, when the page loads, then that club's logo, name, category, description, and apply link are all displayed
- [ ] Given the "Apply to this Club" button is tapped, when the click registers, then the club's Google Form URL opens in a new tab (`target="_blank"`, with `rel="noopener noreferrer"`)
- [ ] Given a club has no Google Form link configured yet, when the detail page renders, then the Apply button is disabled/hidden and a "Applications opening soon" note is shown instead of a broken link
- [ ] Given an invalid/unknown club slug, when the page loads, then a friendly "Club not found" state with a link back to the Clubs Directory is shown
- [ ] UI supports back navigation to the Clubs Directory without losing the previously applied filter

**UI components needed:** Club profile layout, description block, achievements list (optional), social icon links (optional), primary "Apply" CTA button, 404/not-found state

---

### Feature 4: Agenda / Schedule Page

**Description:** A day-wise timeline showing which club is doing what event, on which day, at what time and venue, so students know when to show up for a specific club's showcase.

**User flow:**
1. Visitor navigates to "Agenda"
2. System shows a day-selector (tabs or dropdown for each event day)
3. Visitor selects a day
4. System lists that day's events in chronological order (time, club name + logo, event title, venue)
5. Visitor optionally taps an event entry to jump to that club's detail page

**Acceptance criteria:**
- [ ] Given the Agenda page loads, when no day is explicitly selected, then it defaults to "today" if the event is live, otherwise the first upcoming event day
- [ ] Given a day tab is selected, when events render, then they are sorted by start time ascending
- [ ] Given two events overlap in time on the same day, when rendered, then both are shown clearly without visually merging (e.g., stacked cards, not overlapping)
- [ ] Given an agenda entry is tapped, when the interaction completes, then the visitor is taken to that club's detail page
- [ ] Edge case: a day has zero scheduled events → an empty-state message for that day is shown

**UI components needed:** Day-tab selector, timeline/schedule list component, schedule-entry card (time, club logo, event name, venue), link-through to club detail

---

### Feature 5: Apply Page

**Description:** A dedicated page listing all clubs with a direct link to each club's Google Form, for visitors who already know which club(s) they want to apply to and just want the fastest path to the form (complements the per-club Apply button on Feature 3).

**User flow:**
1. Visitor navigates to "Apply"
2. System lists all clubs (searchable/filterable, same categories as Clubs Directory) each with an "Apply" button
3. Visitor taps a club's Apply button
4. System opens that club's Google Form in a new tab

**Acceptance criteria:**
- [ ] Given the Apply page loads, when rendered, then every club with a configured Google Form link shows a working Apply button
- [ ] Given a search term is typed, when results update, then only clubs whose name matches the term remain visible
- [ ] Given a club has no form link yet, when listed, then its button is disabled with a "Coming soon" label instead of being clickable
- [ ] All Apply links use `target="_blank"` with `rel="noopener noreferrer"`
- [ ] Page remains usable and clubs remain tappable with one thumb on a standard mobile screen

**UI components needed:** Search/filter input, club list/grid with inline Apply buttons, disabled-state button styling

---

### Feature 6: About Aarambh Page

**Description:** Explains what Aarambh is (ITER's annual clubs orientation event), who organizes it (Institute of Technical Education & Research, SOA), and why it matters for new students. Reuses poster branding/imagery.

**User flow:**
1. Visitor navigates to "About"
2. System shows event description, organizing institute info, and the official poster/branding artwork

**Acceptance criteria:**
- [ ] Given the About page loads, then it displays a written description of Aarambh, the organizing institute name, and the poster artwork/logo
- [ ] Page is static content (no dynamic data dependency) and renders correctly with no JS if needed (progressive enhancement)
- [ ] Page includes a CTA linking to Clubs and Agenda pages

**UI components needed:** Static content section, image display, CTA links

---

### Feature 7: Gallery Page (Previous Year)

**Description:** A photo grid showcasing highlights from the previous year's Aarambh, to build excitement.

**User flow:**
1. Visitor navigates to "Gallery"
2. System shows a responsive photo grid
3. Visitor taps a photo
4. System opens a full-screen lightbox with next/prev navigation

**Acceptance criteria:**
- [ ] Given the Gallery page loads, then all configured images render in a responsive masonry/grid layout
- [ ] Given a photo is tapped, when the lightbox opens, then the visitor can swipe/click through remaining photos and close back to the grid
- [ ] Images are lazy-loaded so the initial page load isn't blocked by fetching every photo
- [ ] Edge case: an image fails to load → a placeholder is shown instead of a broken-image icon

**UI components needed:** Responsive image grid, lightbox/modal viewer, lazy-loading image component

---

## 5. Out of Scope (Post-MVP)

| Feature | Rationale for deferral |
|---------|------------------------|
| Login/accounts for students | Not needed — no personalization required for MVP |
| In-browser CMS/admin dashboard to edit clubs/agenda/gallery | MVP uses static data files edited via git; admin panel adds real backend + auth complexity |
| In-site application forms (replacing Google Forms) | Google Forms already exists and works; rebuilding forms is unnecessary MVP effort |
| Push notifications / reminders for agenda items | Requires backend + notification infra; not needed for a short-lived event site |
| Multi-language support | No stated requirement; adds translation overhead |
| Club leaderboard / vote / like system | Not requested; adds moderation and abuse-prevention concerns |
| Native mobile app | Web is sufficient and faster to ship |

---

## 6. Data Models

> No backend/database for MVP — these are static TypeScript/JSON data files bundled with the frontend.

```typescript
type Category =
  | "Technical"
  | "Cultural"
  | "Dance"
  | "Music"
  | "Literary"
  | "Other";

type Club = {
  id: string;              // unique slug, e.g. "coding-ninjas-10x"
  name: string;
  category: Category;
  logoUrl: string;          // path under /public/clubs/
  tagline?: string;         // short one-liner for the card
  about: string;            // "Know your club" description
  achievements?: string[];  // optional highlight bullets
  instagramUrl?: string;
  applyFormUrl?: string;    // Google Form link; undefined = "coming soon"
};

type ScheduleEvent = {
  id: string;
  clubId: string;           // references Club.id
  eventTitle: string;
  day: string;              // ISO date, e.g. "2026-10-12"
  startTime: string;        // 24h "HH:mm"
  endTime?: string;
  venue: string;
};

type GalleryImage = {
  id: string;
  imageUrl: string;         // path under /public/gallery/
  caption?: string;
  year: number;             // e.g. 2025
};
```

**Relationships:**
- `ScheduleEvent.clubId` references `Club.id` (many schedule events can belong to one club)
- `GalleryImage` is standalone, grouped by `year` for future multi-year galleries

---

## 7. API / Backend Contract

**N/A for MVP.** This is a frontend-only static site — all `Club`, `ScheduleEvent`, and `GalleryImage` data ships as bundled JSON/TS files at build time (e.g., `src/data/clubs.ts`, `src/data/schedule.ts`, `src/data/gallery.ts`). No server, no database, no REST/GraphQL endpoints are required.

**[DECISION NEEDED: future backend]** If club data needs to be updated live without a redeploy (e.g., by non-technical club coordinators), a lightweight headless CMS (e.g., a simple Google Sheet read at build time, or a service like Supabase/Sanity) can be added Post-MVP. Recommended default: skip this for MVP; static files are sufficient for a short annual event.

---

## 8. Tech Stack

| Layer | Technology | Version / Notes |
|-------|-----------|-----------------|
| Frontend framework | React 18 + Vite | As requested — fast dev server, simple static build |
| Language | TypeScript | Catches data-shape errors in club/schedule data early |
| Routing | React Router v6 | Client-side routes: `/`, `/clubs`, `/clubs/:slug`, `/agenda`, `/apply`, `/about`, `/gallery` |
| Styling | Tailwind CSS v3 | Utility-first, fast to theme with the poster's cosmic palette |
| Animation | Framer Motion | Hero animations, page transitions, card hover/entry animations, respects `prefers-reduced-motion` |
| Icons | lucide-react | Lightweight icon set |
| State management | React state / Context only | No global state library needed — data is static and read-only |
| Data source | Static TS/JSON files in-repo | No backend for MVP (see Section 6/7) |
| Deployment | Vercel or Netlify | Free tier sufficient for a static React site; instant redeploy on git push |
| Testing | Vitest + React Testing Library | Component-level tests for filtering, routing, link generation |

**Environment variables required:**
```
# None required for MVP — fully static site, no API keys needed.
# If analytics is added later:
VITE_ANALYTICS_ID=
```

---

## 9. Project Structure

```
aarambh-website/
├── src/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Clubs.tsx
│   │   ├── ClubDetail.tsx
│   │   ├── Agenda.tsx
│   │   ├── Apply.tsx
│   │   ├── About.tsx
│   │   └── Gallery.tsx
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, PageWrapper
│   │   ├── hero/            # AnimatedBackground, GradientWordmark, Countdown
│   │   ├── clubs/           # ClubCard, CategoryFilter, ApplyButton
│   │   ├── agenda/          # DayTabs, ScheduleEntry
│   │   ├── gallery/         # ImageGrid, Lightbox
│   │   └── ui/               # Shared Button, Badge, EmptyState, etc.
│   ├── data/
│   │   ├── clubs.ts
│   │   ├── schedule.ts
│   │   └── gallery.ts
│   ├── types/
│   │   └── index.ts          # Club, ScheduleEvent, GalleryImage types
│   ├── hooks/
│   │   └── useCountdown.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── clubs/                 # club logo images
│   ├── gallery/                # past-year photos
│   └── poster-assets/          # hero background, wordmark artwork
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

---

## 10. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Page load (LCP) | < 2500ms on 4G mobile |
| Mobile responsive | Yes — tested at 360px, 390px, 768px, 1024px, 1440px |
| Accessibility | WCAG AA where feasible (color contrast on gradient text checked manually) |
| Browser support | Latest 2 versions of Chrome, Safari, Firefox, Edge |
| Animation performance | 60fps target; all decorative animation respects `prefers-reduced-motion` |
| Lighthouse (mobile) | Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90 |
| Bundle size | Route-based code splitting so Home doesn't load Gallery/Agenda code upfront |

---

## 11. Design & UX Guidelines

**Visual style:** Cosmic/celestial, premium event-poster feel — directly derived from the official Aarambh "Coming Soon" poster (dark navy-purple space background with nebula swirls, star field, and a gold-blue-purple gradient wordmark with a shooting-star flourish).

**Color palette:**
- Background (deep space): `#0A0A2E` → `#150638` gradient
- Accent purple: `#6B46C1`
- Accent blue: `#3B82F6`
- Accent gold: `#F2C14E`
- Text (primary, light): `#F5F3FF`
- Text (muted): `#B8B3D9`

**Typography:**
- Display/heading font: an elegant serif (matching "Institute of Technical Education & Research" on the poster) for section titles — e.g., "Playfair Display" or "Cormorant Garamond"
- Body font: a clean sans-serif for readability — e.g., "Inter" or "Manrope"
- Wordmark ("Aarambh"): treated as a custom graphic/SVG or styled gradient text, not plain body font

**Key UX principles for this product:**
- **One-click access to clubs is non-negotiable** — the Clubs Directory must never require more than one tap from the homepage nav to reach the full list, and one more tap to reach any club's profile
- **Agenda clarity over decoration** — the schedule page should read like a clean timetable first; animation is secondary here so students can find their day/time fast
- **Every "Apply" path is obvious** — apply buttons use the gold accent color consistently across Club Detail and the Apply page so they're instantly recognizable
- **Motion enhances, never blocks** — all animation (star field, gradient shimmer, page transitions) must degrade gracefully; content must be readable even if animation fails or is disabled

**[DECISION NEEDED: exact hero visual asset]** — Whether the hero recreates the poster's swirl/star-trail as a custom SVG/Framer Motion animation, or uses the poster image itself as a background with animated overlays on top. Recommended default: use the poster artwork as a static base layer, add a lightweight animated star-field/particle overlay on top for performance and flexibility (avoids needing to recreate the intricate wordmark artwork in code).

---

## 12. Third-Party Integrations

| Service | Purpose | Auth method | SDK/API used |
|---------|---------|-------------|--------------|
| Google Forms | Club application forms — one link per club | None (public form links) | Plain `<a>` links, `target="_blank"` |
| Google Fonts | Display + body typography | None | `<link>` tag or self-hosted via `@fontsource` |
| Vercel/Netlify Analytics (optional) | Basic traffic insight during event week | None | Platform-native, no extra key needed |

---

## 13. Open Questions & Decisions

| # | Question | Recommended default | Owner | Due |
|---|----------|---------------------|-------|-----|
| 1 | Exact final list of clubs, categories, logos, and descriptions | Use placeholder/dummy data for 3–4 clubs per category during build; swap in real data before launch | Jitesh / Club coordinators | Before build |
| 2 | Does every club have its own Google Form, or is there one shared form with a club-selection dropdown? | Assume one form per club (matches "add a link for it" per-club framing); if a shared form exists instead, all Apply buttons point to the same URL | Jitesh | Before build |
| 3 | Exact Aarambh event dates and daily schedule | Use placeholder dates during build; wire in real dates before launch so the countdown and agenda are accurate | Jitesh | Before build |
| 4 | Source of last year's gallery photos | Collect a curated set (10–20 photos) from club/event coordinators before launch | Jitesh | Before build |
| 5 | Domain/hosting — is there an existing ITER subdomain, or a fresh Vercel/Netlify URL? | Default to a free Vercel deployment URL for MVP; can map to a custom domain later if provided | Jitesh | Before build |

---

## 14. Hand-off Checklist

- [x] Problem statement is understood
- [x] All MVP features are enumerated with acceptance criteria (7 features)
- [x] Data models are defined and complete (Club, ScheduleEvent, GalleryImage)
- [x] API contracts are specified (N/A — static site, explicitly noted)
- [x] Tech stack is fully prescribed — React 18 + Vite + TypeScript + Tailwind + Framer Motion + React Router
- [x] Environment variables are listed (none required for MVP)
- [x] Project structure is defined
- [x] Out-of-scope items are clearly separated (Section 5)
- [ ] All `[DECISION NEEDED]` items are resolved or assigned — 2 design/content decisions still open (Sections 3, 11) plus 5 items in Section 13; all have recommended defaults so the agent can proceed without blocking
- [x] Non-functional requirements are set
- [x] No in-scope features are underspecified

**Build confidence score:** High — every MVP feature has acceptance criteria and a recommended default is given for every open question, so a coding agent can build the full MVP with placeholder data and swap in real club/schedule/gallery content before launch.