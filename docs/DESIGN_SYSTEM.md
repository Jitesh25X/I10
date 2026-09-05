# 🌌 Aarambh Design System & Styling Specification

> **Event:** Aarambh — Annual University Clubs Orientation  
> **Institution:** Siksha 'O' Anusandhan (SOA) / ITER  
> **Theme:** Cosmic / Celestial Journey & Apple-inspired Minimalist Glassmorphism  
> **Tech Stack:** React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons  

---

## 1. Visual Theme & Creative Direction

The visual language of **Aarambh** is rooted directly in the celestial atmosphere of the official event key visuals:
- **Atmospheric Void & Deep Space:** Instead of flat, lifeless blacks, the interface is immersed in rich, multilayered cosmic gradients spanning deep indigos, violet nebulae, and stellar purples with subtle warm ember undertones.
- **Glassmorphic Floating Surfaces:** Apple-inspired floating rounded capsules, frosted glass cards, and pill menus with optical backdrop blurring (`backdrop-blur-md`) and subtle gold/purple borders.
- **Starlight Accents & Golden Luminance:** Metallic and celestial gold (`#F2C14E`) serves as the primary action/focus anchor, evoking the radiance of shooting stars, constellations, and guiding beacons.
- **Kinetic Starlight:** Restrained, non-blocking cosmic motion—twinkling starfields, drifting ambient nebula blooms, and periodic shooting star flourishes that respect accessibility (`prefers-reduced-motion`).

---

## 2. Color Palette & Design Tokens

### 2.1 Core Palette Swatches

| Token Name | Hex Code | Tailwind Utility | Visual Role / Usage |
| :--- | :--- | :--- | :--- |
| **Deep Space Navy** | `#0B0B2E` | `bg-background-dark` / `bg-background-navy` | Base background floor, deep space navy canvas |
| **Deep Space Indigo** | `#12103A` | `bg-background-mid` / `bg-background-indigo` | Mid-layer indigo gradient, ambient glow accents |
| **Stellar Purple** | `#1B184F` | `bg-background-light` | Gradient zenith, highlighting sections |
| **Warm Ember Highlight** | `#3D2A1A` | `bg-background-goldHighlight` | Warm nebula undertone bleeding in around gold elements |
| **Celestial Gold** | `#F2C14E` | `text-accent-gold`, `bg-accent-gold` | **Primary brand accent**, CTAs, badges, star flourishes, cursor |
| **Electric Purple** | `#6B46C1` | `text-accent-purple`, `bg-accent-purple` | Secondary brand accent, active state pills, glow rings |
| **Celestial Azure** | `#3B82F6` | `text-accent-blue`, `bg-accent-blue` | Tertiary accent, gradient bridge, informational badges |
| **Starlight Primary** | `#F5F3FF` | `text-text-primary` | High-contrast body, primary headings, titles |
| **Muted Lavender** | `#B8B3D9` | `text-text-muted` | Secondary copy, metadata, timestamps, subtitles |

### 2.2 Functional Surfaces & Gradients

```css
/* Base Canvas Gradient */
background: linear-gradient(
  135deg,
  #0B0B2E 0%,
  #12103A 100%
);

/* Signature Brand Text Gradient */
.text-gradient {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-accent-gold via-accent-blue to-accent-purple;
}

/* Glassmorphic Pill Token */
.glass-pill {
  @apply bg-accent-purple/15 backdrop-blur-md border border-accent-gold/20 shadow-lg rounded-full;
}

/* Cosmic Ambient Glow Blobs */
.ambient-glow-purple {
  background: radial-gradient(circle, rgba(107, 70, 193, 0.20) 0%, transparent 70%);
  filter: blur(140px);
}
.ambient-glow-gold {
  background: radial-gradient(circle, rgba(242, 193, 78, 0.15) 0%, transparent 70%);
  filter: blur(120px);
}
```

---

## 3. Typography System

### 3.1 Font Families

| Role | Font Family | Tailwind Class | Fallback | Sourcing |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Heading** | **Bricolage Grotesque** | `font-display` / `font-sans` | `sans-serif` | Google Fonts / Fontsource |
| **Serif Editorial** | **Playfair Display** / **Cinzel** | `font-serif` | `Georgia, serif` | Google Fonts |
| **Body & UI** | **Inter** / **Bricolage** | `font-sans` | `system-ui, sans-serif` | Web Native / Fontsource |
| **Illustrated Wordmark**| *Custom Vector/Art* | N/A | `/logo.png` asset | Scalable PNG / SVG |

### 3.2 Type Scale Hierarchy

| Level | Size (Desktop / Mobile) | Weight | Letter Spacing | Case | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `text-4xl` to `text-6xl` | Bold (700/800) | `tracking-tight` | Mixed | Countdown values, primary impact metrics |
| **H1 Page Title** | `text-3xl` to `text-4xl` | Bold (700) | `tracking-normal` | Title Case | Page titles (e.g., "Explore Clubs", "Agenda") |
| **H2 Section Title** | `text-2xl` to `text-3xl` | SemiBold (600) | `tracking-wide` | Title Case | Section headings, modal titles |
| **H3 Card Header** | `text-xl` | Bold (700) | `tracking-normal` | Title Case | Club card names, timeline event names |
| **Eyebrow / Subhead**| `text-xs` to `text-sm` | Medium (500) | `tracking-[0.25em]` | **UPPERCASE**| University presenter banner, nav items, day tags |
| **Body Large** | `text-lg` to `text-xl` | Light / Normal (300/400) | `normal` | Normal | Hero intro paragraphs, club mission statements |
| **Body Default** | `text-base` | Regular (400) | `normal` | Normal | Standard UI descriptions, schedule summaries |
| **Small / Microcopy**| `text-xs` to `text-sm` | Normal (400) | `normal` | Normal | Footer credits, tooltips, helper text |

---

## 4. Spacing, Layout & Grid Standards

### 4.1 Breakpoints (Mobile First)

- **Mobile:** `360px` – `639px` (single-column cards, full-width drawers, bottom/hamburger nav)
- **Tablet:** `640px` – `1023px` (`sm:` / `md:` two-column club grids, stacked stats)
- **Desktop:** `1024px` – `1439px` (`lg:` 3-column club grids, split floating pill nav)
- **Wide Display:** `1440px+` (`max-w-7xl` container locks)

### 4.2 Layout Grid & Containers

```html
<!-- Master Viewport Wrap -->
<main className="min-h-screen bg-background-dark text-text-primary relative overflow-x-hidden">
  
  <!-- Outer Content Padding Container -->
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Grid System for Cards -->
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Grid Items -->
    </div>
  </div>
</main>
```

---

## 5. UI Components & Pattern Specifications

### 5.1 Navigation Bar (Apple-style Centered Island)
- **Structure:** Floating, detached top island with pointer-events pass-through.
- **Left Pill (Desktop):** `Clubs`, `Agenda` (Glassmorphic capsule: `px-4 py-2`).
- **Center Element:** Scaled Aarambh emblem (`/logo.png`) with luminous drop shadow (`drop-shadow-[0_0_12px_rgba(242,193,78,0.35)]`), smoothly transitioning upon scroll.
- **Right Pill (Desktop):** `About`, `Join / Apply`.
- **Mobile Mode:** Top glass pill with centered logo and accessible hamburger drawer toggle with smooth Framer Motion `AnimatePresence`.

### 5.2 Buttons & Action Triggers

```tsx
// 1. Primary Action (Celestial Gold CTA)
<button className="bg-accent-gold text-background-dark font-medium px-6 py-3 rounded-md hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(242,193,78,0.4)] transition-all duration-300 focus:ring-2 focus:ring-accent-gold">
  Explore Clubs
</button>

// 2. Secondary Ghost Action
<button className="bg-white/10 text-white border border-white/15 px-6 py-3 rounded-md hover:bg-white/20 transition-all duration-300">
  View Schedule
</button>

// 3. Outline Starlight Action
<button className="border border-accent-gold text-accent-gold px-6 py-3 rounded-md hover:bg-accent-gold/10 transition-all duration-300">
  Learn More
</button>
```

### 5.3 Badges & Category Tags
- **Default Inactive:** `bg-white/10 text-text-muted hover:bg-white/20 hover:text-white px-3 py-1 rounded-full text-xs font-medium`
- **Active / Selected:** `bg-accent-purple text-white shadow-[0_0_10px_rgba(107,70,193,0.5)] px-3 py-1 rounded-full text-xs font-medium`
- **Special Status (Live / Featured):** `bg-accent-gold/20 text-accent-gold border border-accent-gold/40 px-3 py-1 rounded-full text-xs font-semibold`

### 5.4 Club Cards (Cosmic Monoliths)
- **Surface:** Glass backdrop `bg-white/5` with subtle hairline border `border-white/10`.
- **Hover State:** Border flares to `border-accent-gold/40`, background raises to `bg-white/10`, elevation casts a warm gold halo `box-shadow: 0 0 25px rgba(242,193,78,0.12)`.
- **Emblem Portal:** Circular avatar `w-24 h-24 rounded-full bg-white/10 border border-white/15` with inner ambient shadow.
- **Footer Action Strip:** Integrated bottom action band `bg-white/[0.03]` with "Know your club" micro-copy and diagonal arrow icon (`ArrowUpRight`).

### 5.5 Modal Dialogs (Glassmorphic Overlay)
- **Backdrop:** `bg-background-dark/80 backdrop-blur-md`
- **Dialog Surface:** `bg-[#1E0E3D]/95 border border-accent-gold/30 rounded-2xl shadow-[0_0_50px_rgba(107,70,193,0.3)]`
- **Motion Entrance:** Scale from `0.95` to `1.0`, opacity from `0` to `1`, spring damping `25`.

---

## 6. Motion & Animation Tokens

### 6.1 Keyframes & Timing

| Animation | Keyframe / Timing | Utility Class | Purpose |
| :--- | :--- | :--- | :--- |
| **Comet Traverse** | `falling-star 4s - 8s linear infinite` | `.animate-falling-star` | High-altitude meteorites cutting across the sky |
| **Logo Star Flare**| `0s - 1.1s` ease-out cubic-bezier | `ShootingStarFromLogo` | 4-point SVG star bursting from Aarambh wordmark |
| **Nebula Shimmer** | `shimmer 3s linear infinite` | `.animate-shimmer` | Iridescent highlight along metallic text / borders |
| **Levitation Drift**| `drift 20s linear infinite` | `.animate-drift` | Gentle organic float for floating elements |
| **Hover Transitions**| `200ms - 300ms` `ease-out` | `transition-all duration-300` | Smooth hover responsiveness on cards & links |

### 6.2 Ambient Canvas Elements
- **StarField:** Dual-layer canvas generating 80–120 randomized starlight particles with fluctuating alpha (`0.2` to `0.9`) to prevent visual fatigue.
- **ShootingComet:** Canvas-based diagonal meteors with 60px linear velocity tails and golden/blue gradient falloff.

### 6.3 Accessibility & Reduced Motion
Every motion element unconditionally obeys `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 7. Iconography & Media Guidelines

- **Icon Set:** `lucide-react`
- **Standard Stroke Width:** `1.75px` to `2px` (harmonizes with modern grotesque typography)
- **Standard Sizing:**
  - Nav / Inline icons: `16px` (`size={16}`)
  - Card & Action icons: `18px` – `20px` (`size={18}` / `size={20}`)
  - Feature & Empty state icons: `24px` – `32px` (`size={28}`)
- **Club Logos:**
  - Standard format: transparent PNG or SVG
  - Bounding box: centered object-contain inside 96px x 96px circular frame
  - Error state: Automatic fallback rendering club's first letter styled in `text-accent-gold font-bold text-3xl`.

---

## 8. Accessibility & Quality Checklist

- [x] **WCAG AA Color Contrast:** All primary copy (`#F5F3FF`) maintains a contrast ratio exceeding **15:1** on `#0B0B2E` and `#12103A`.
- [x] **Focus Indicators:** Interactive elements display explicit high-contrast focus rings (`focus:ring-2 focus:ring-accent-gold/50 focus:outline-none`).
- [x] **Touch Ergonomics:** Minimum interactive hit targets of `44px x 44px` on mobile displays.
- [x] **Semantic Landmarks:** Correct implementation of `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, and ARIA roles (`role="button"`, `tabIndex={0}`, `aria-label`).
- [x] **Graceful Fallbacks:** Full functional readability even when WebGL, canvas, or JavaScript animations are throttled or disabled.
