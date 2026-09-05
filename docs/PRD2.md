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
- [ ] On desktop, the hero shows a working custom star cursor, a sparse falling-star field, and periodic shooting stars from the logo, all without dropping Lighthouse Performance below 90
- [ ] The Impact Stats section count-up animates once and displays clubs/students/events figures pulled from a single static data file
- [ ] The Contact Us form successfully delivers a test submission via the configured third-party service

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

### Feature 1: Animated, Cursor-Reactive Hero Section

**Description:** First screen a visitor sees. Recreates the poster's mood — deep-space navy/purple background, the gold-blue-purple gradient "Aarambh" wordmark with its signature star-trail flourish, "Institute of Technical Education & Research presents," and a "Coming Soon"–style reveal that switches to live event info once the event date arrives. Adds three signature interactive/motion effects on top of the base hero:

1. **Custom star cursor (desktop only):** the default OS pointer is hidden and replaced with a small glowing 4-point star (SVG) that follows the mouse with slight trailing easing.
2. **Falling stars field:** a sparse stream of small stars/streaks drifts diagonally from the top-right corner toward the bottom-left of the hero, looping continuously. Deliberately sparse ("not that many") — a light ambient effect, not a dense particle storm.
3. **Shooting stars from the logo:** periodically (e.g., every 4–8 seconds, randomized), a brighter shooting star bursts outward from the tip of the Aarambh wordmark's star-trail flourish (the same position as the gold star flare in the poster) and fades out — echoing the poster's hero art as a living animation.

Includes a countdown timer to event day and clear CTA buttons to the core pages (Clubs, Agenda, Apply).

**User flow:**
1. Visitor opens the site URL
2. System renders the hero: gradient wordmark, sparse falling-star field, and periodic shooting-star bursts from the logo
3. On desktop, the visitor's cursor is replaced by a small trailing star as they move the mouse over the hero (and optionally the whole site)
4. Visitor sees countdown (if pre-event) or "Happening Now / Today's Lineup" banner (if event is live)
5. Visitor taps a CTA ("Explore Clubs," "See Agenda," or "Apply Now") and is routed to that page

**Acceptance criteria:**
- [ ] Given a desktop/non-touch device, when the visitor moves the mouse anywhere the custom cursor is active, then the default cursor is hidden and a star-shaped cursor tracks the pointer with a small easing delay (not an exact 1:1 snap, for a "trailing" feel)
- [ ] Given a touch device (mobile/tablet), when the page loads, then the custom cursor effect is not applied and the native touch interaction is unaffected
- [ ] Given the hero is visible, when idle, then a sparse field of small stars (recommend 10–20 concurrent stars, tunable) continuously drifts from top-right to bottom-left and loops, without ever fully covering or obscuring the wordmark or text
- [ ] Given the hero is visible, when a shooting-star interval fires, then a brighter star streak animates outward from the logo's star-trail tip and fades within ~1 second, repeating on a randomized 4–8 second interval
- [ ] Given the current date is before the event start date, when the page loads, then a live countdown (days:hours:minutes) to the event start is shown
- [ ] Given the current date is during the event window, when the page loads, then the hero shows "Happening Now" plus a link to today's agenda instead of the countdown
- [ ] Given a mobile viewport (≤480px), when the hero renders, then the wordmark, star effects, countdown, and CTAs remain fully visible without horizontal scroll, and the star field is scaled down/thinned to avoid clutter on small screens
- [ ] Given reduced-motion is enabled in the OS/browser, when the page loads, then the falling-star field, shooting stars, and custom cursor trailing are all disabled or reduced to a static/minimal state
- [ ] Given the browser tab is not visible (backgrounded), when animations are running, then the star field and shooting-star loop pause (via `requestAnimationFrame` + visibility check) to avoid wasted CPU/battery
- [ ] Edge case: JS/animation fails to load → hero still shows static poster-styled background and readable text (progressive enhancement, not blocking)

**UI components needed:** Hero section, `StarField` canvas/SVG component (falling stars), `ShootingStarFromLogo` effect component, `CustomCursor` component (pointer tracking + easing, desktop-only), gradient text/logo component, countdown component, primary/secondary CTA buttons, sticky nav bar

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

### Feature 8: Impact Stats Section

**Description:** A compact metrics band on the homepage (placed just below the hero) that builds credibility and excitement with a few key numbers. Recommended metrics:
- **Number of clubs** participating
- **Number of students engaged** (cumulative/expected footfall)
- **Number of events** running across the event days

Each number animates with a "count-up" effect (0 → final value) the first time it scrolls into view, styled as circular/badge stat cards consistent with the site's gradient theme.

**User flow:**
1. Visitor scrolls past the hero
2. System detects the stats section entering the viewport (intersection observer)
3. Each stat count animates upward from 0 to its configured value over ~1–1.5 seconds
4. Numbers remain static (final value) after the count-up completes; re-entering the viewport does not replay the animation

**Acceptance criteria:**
- [ ] Given the stats section scrolls into view for the first time, when triggered, then each number animates from 0 to its final value within ~1.5 seconds
- [ ] Given the visitor scrolls away and back, when the section re-enters view, then the count-up does not replay (final values are shown immediately)
- [ ] Given reduced-motion is enabled, when the section renders, then final values are shown immediately with no count-up animation
- [ ] Given a mobile viewport, when the section renders, then the stat cards stack/wrap responsively (e.g., 1 column on very small screens, row of 3 on larger phones/tablets) without text truncation
- [ ] Stat values are sourced from a single static data file so they're trivial to update before/after the event

**UI components needed:** `StatsSection` container, `StatCard` component (circular/badge style, gradient accent), count-up hook (`useCountUp`) driven by an intersection observer

---

### Feature 9: Contact Us Section

**Description:** A section (footer area or dedicated block on the About/Home page) giving visitors a way to reach the organizing team — official email, Instagram/social links, and a simple message form (name, email, message) for questions about clubs or the event. Since the site has no custom backend, the form submits via a third-party form-delivery service rather than a self-hosted API.

**User flow:**
1. Visitor scrolls to or navigates to the Contact section
2. System shows contact details (email, social links, campus/venue info) and a short message form
3. Visitor fills in name, email, and message, then submits
4. System sends the submission via the configured form service (e.g., Formspree or EmailJS) and shows a success confirmation, or a clear error state on failure

**Acceptance criteria:**
- [ ] Given the Contact section renders, then it displays an official contact email and at least one social link (e.g., Instagram)
- [ ] Given all required fields (name, email, message) are filled with a valid email format, when submitted, then the form sends via the configured third-party service and shows a success confirmation message
- [ ] Given a required field is empty or the email is invalid, when the visitor attempts to submit, then inline validation errors are shown and the request is not sent
- [ ] Given the third-party form service request fails (network/service error), when submission fails, then a clear error message is shown with a fallback ("or email us directly at …")
- [ ] Form and contact details are fully usable on mobile with no layout overflow

**UI components needed:** `ContactSection` layout, contact-info block (email/socials/venue), `ContactForm` (validated inputs, submit state, success/error states)

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
| Storing/managing Contact Us submissions in-app (admin inbox) | Form relays through a third-party service (Formspree/EmailJS) straight to email; no message database or admin inbox needed for a short-lived event site |

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

type Stat = {
  id: string;
  label: string;            // e.g. "Clubs", "Students Engaged", "Events"
  value: number;            // final count-up target
  suffix?: string;          // e.g. "+"
};

// Contact form submissions are NOT persisted anywhere in this app —
// they are handled entirely client-side and relayed by a third-party
// form service (Formspree/EmailJS). No ContactMessage entity/table exists.
```

**Relationships:**
- `ScheduleEvent.clubId` references `Club.id` (many schedule events can belong to one club)
- `GalleryImage` is standalone, grouped by `year` for future multi-year galleries
- `Stat` is standalone, one row per homepage metric

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
| Fonts | Playfair Display (headings), Cinzel (spaced small-caps labels/nav), Inter (body/UI text) | Loaded via `@fontsource` packages for self-hosting (no runtime Google Fonts call); see Section 11 for rationale |
| Star field / falling stars | Custom canvas or SVG + Framer Motion (no heavy particle library) | Requested effect is deliberately sparse (10–20 stars); a full particle engine (e.g. tsparticles) is unnecessary weight for this scale |
| Custom cursor | Custom `CustomCursor` component using `pointermove` + CSS `cursor: none` (desktop only) | Disabled automatically on touch devices via a pointer-type media query/feature check |
| Contact form delivery | Formspree (or EmailJS) | Free tier; no custom backend needed — form POSTs directly to the service, which emails the submission |
| State management | React state / Context only | No global state library needed — data is static and read-only |
| Data source | Static TS/JSON files in-repo | No backend for MVP (see Section 6/7) |
| Deployment | Vercel or Netlify | Free tier sufficient for a static React site; instant redeploy on git push |
| Testing | Vitest + React Testing Library | Component-level tests for filtering, routing, link generation |

**Environment variables required:**
```
# Formspree/EmailJS endpoint or public key for the Contact form:
VITE_CONTACT_FORM_ENDPOINT=

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
│   │   ├── layout/          # Navbar (centered logo + circular pills), Footer, PageWrapper
│   │   ├── hero/             # StarField, ShootingStarFromLogo, CustomCursor, GradientWordmark, Countdown
│   │   ├── stats/            # StatsSection, StatCard
│   │   ├── contact/          # ContactSection, ContactForm
│   │   ├── clubs/            # ClubCard, CategoryFilter, ApplyButton
│   │   ├── agenda/           # DayTabs, ScheduleEntry
│   │   ├── gallery/          # ImageGrid, Lightbox
│   │   └── ui/                # Shared Button, Badge, EmptyState, etc.
│   ├── data/
│   │   ├── clubs.ts
│   │   ├── schedule.ts
│   │   ├── gallery.ts
│   │   └── stats.ts
│   ├── types/
│   │   └── index.ts           # Club, ScheduleEvent, GalleryImage, Stat types
│   ├── hooks/
│   │   ├── useCountdown.ts
│   │   ├── useCountUp.ts       # drives the Impact Stats count-up
│   │   └── useCustomCursor.ts  # pointer tracking + easing, disabled on touch
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

**Visual style:** Cosmic/celestial, premium event-poster feel — directly derived from the official Aarambh "Coming Soon" poster (space background with nebula swirls, star field, and a gold-blue-purple gradient wordmark with a shooting-star flourish). The full site (not just the hero) should carry the poster's palette and star texture for visual consistency.

**Color palette (purple-gold direction, per poster):**
- Background base: a purple-dominant gradient rather than flat navy-black — e.g., `#1A0A3D` → `#3B1A6B` → `#5A2D8C`, with warm gold undertones bleeding in at edges/accents (`#3D2A1A`–`#4A2D1F` tones) to match the poster's warm nebula highlights
- Accent purple: `#6B46C1`
- Accent blue: `#3B82F6` (secondary accent, from the wordmark's blue side)
- Accent gold: `#F2C14E` (primary accent — CTAs, stat highlights, Apply buttons, cursor star)
- Text (primary, light): `#F5F3FF`
- Text (muted): `#B8B3D9`
- Nav/card surfaces: semi-transparent purple glass (`rgba(107, 70, 193, 0.15)`) with a subtle gold-to-purple gradient border

**Typography (matched from the uploaded poster):**
- **Heading font:** the poster's "Institute of Technical Education & Research" line is a high-contrast, old-style serif with a flourished ampersand. **Playfair Display** is the closest widely-available web font match (Cormorant Garamond as a lighter-weight alternative). Use for page titles and section headers.
- **Spaced small-caps label font:** "PRESENTS" and "COMING SOON" on the poster use wide letter-spacing on a thin serif caps style. **Cinzel** is the closest match — use it (with `letter-spacing: 0.15em`–`0.25em`) for nav labels, section eyebrows, and any "PRESENTS"/"COMING SOON"-style micro-labels across the site.
- **Body/UI font:** the poster has no body text, so for readable UI copy (descriptions, agenda entries, form labels) pair the above with a clean sans-serif — **Inter** — which won't clash with the two serif display fonts.
- **"Aarambh" wordmark:** this is hand-illustrated brush/vector artwork with gradient fill and a star-trail flourish — it is **not a reproducible font** and should stay as an image/SVG asset (`public/poster-assets/aarambh-wordmark.svg` or `.png`) wherever the exact poster logo is needed (hero, favicon source, nav center-mark). Where a plain-text fallback is unavoidable (e.g., page `<title>`, share previews), use Cinzel or Playfair Display italic as the closest stylistic stand-in — never attempt to recreate the illustrated flourish in CSS text.

**Navigation — centered logo, circular "pill" menu (Apple-style):**
- The Aarambh wordmark/logo sits centered in the nav bar, not left-aligned.
- Menu items are grouped into two floating pill/capsule clusters flanking the logo (left and right), each rendered as a rounded, glassmorphic container with a subtle gold-to-purple gradient border/glow — similar in feel to Apple's rounded dock/nav treatment.
- Recommended default grouping (7 destinations across 2 groups of ~2–3 each):
  - **Left pill:** Clubs, Agenda
  - **Right pill:** Apply, Contact
  - **Home** is reached via the centered logo itself (click logo → home)
  - **About** and **Gallery** fold into a small overflow/"More" pill next to the right group on desktop, and into the mobile hamburger menu on small screens
- On mobile, the two pills and center logo collapse into a single centered logo + hamburger icon that expands to a full-screen or slide-down menu using the same gradient/glass styling.
- **[DECISION NEEDED: exact left/right split]** — the above is a recommended default; confirm which 2 items you want on the left specifically before finalizing (the request only specified "two menus on the left").

**Cursor:**
- Desktop only: replace the native cursor with a small glowing gold 4-point star (SVG, ~16–20px), trailing the pointer with light easing (not a rigid 1:1 snap) for a soft "sparkle following you" feel.
- Automatically falls back to the native cursor on touch/coarse-pointer devices (detected via `(pointer: coarse)` media query) and when reduced-motion is enabled.

**Key UX principles for this product:**
- **One-click access to clubs is non-negotiable** — the Clubs Directory must never require more than one tap from the nav to reach the full list, and one more tap to reach any club's profile
- **Agenda clarity over decoration** — the schedule page should read like a clean timetable first; animation is secondary here so students can find their day/time fast
- **Every "Apply" path is obvious** — apply buttons use the gold accent color consistently across Club Detail and the Apply page so they're instantly recognizable
- **Stats reinforce credibility, don't distract** — the count-up numbers should feel like a quick, confident flex, not a heavy animation sequence
- **Motion enhances, never blocks** — all animation (falling stars, shooting stars, cursor trail, gradient shimmer, page transitions) must degrade gracefully; content must be readable even if animation fails or is disabled

**[DECISION NEEDED: exact hero visual asset]** — Whether the hero recreates the poster's swirl/star-trail as a custom SVG/Framer Motion animation, or uses the poster image itself as a background with animated overlays on top. Recommended default: use the poster artwork as a static base layer for the wordmark, add the lightweight animated star-field/shooting-star overlay on top for performance and flexibility (avoids needing to recreate the intricate wordmark artwork in code).

---

## 12. Third-Party Integrations

| Service | Purpose | Auth method | SDK/API used |
|---------|---------|-------------|--------------|
| Google Forms | Club application forms — one link per club | None (public form links) | Plain `<a>` links, `target="_blank"` |
| Playfair Display / Cinzel / Inter fonts | Display + body typography matched from the poster | None | Self-hosted via `@fontsource/playfair-display`, `@fontsource/cinzel`, `@fontsource/inter` (avoids a runtime Google Fonts request, better performance) |
| Formspree (or EmailJS) | Contact Us form delivery (no custom backend) | Public form endpoint / public API key | REST POST from `ContactForm` component |
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
| 6 | Real values for the Impact Stats section (clubs count, students engaged, events count) | Use realistic placeholder numbers during build; swap in real figures before launch | Jitesh | Before launch |
| 7 | Exact nav split — which 2 items go in the left pill vs. right pill, and where Gallery/About land | Use recommended default: Left = Clubs, Agenda; Right = Apply, Contact; About + Gallery in an overflow/"More" pill | Jitesh | Before build |
| 8 | Contact form destination — which email should Formspree/EmailJS deliver submissions to, and does an account already exist? | Set up a free Formspree account pointed at the official Aarambh/club-coordinator email before launch | Jitesh | Before launch |

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