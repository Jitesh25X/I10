# Aarambh — Clubs Orientation Website

Official website for **Aarambh**, the university clubs orientation event at Siksha 'O' Anusandhan (SOA) / ITER.

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Typography**: `@fontsource/bricolage-grotesque`, `cinzel`, `playfair-display`, `inter`

## 📁 Project Structure

```
├── docs/                   # Product Requirement Documents & Architecture specs
│   ├── PRD.md
│   └── PRD2.md
├── public/                 # Static assets served directly
│   ├── clubs/              # Official club logos (kebab-case)
│   ├── gallery/            # Past event photo gallery
│   ├── poster-assets/      # Background stars, event posters
│   └── logo.png            # Aarambh event logo & favicon
├── src/
│   ├── assets/             # Bundled static assets
│   ├── components/
│   │   ├── agenda/         # Agenda components (DayTabs, ScheduleEntry)
│   │   ├── clubs/          # Club cards, filters, detail views
│   │   ├── gallery/        # Masonry grid, Lightbox
│   │   ├── hero/           # StarField, ShootingComet, CustomCursor
│   │   ├── layout/         # Navbar, Footer, PageWrapper
│   │   ├── stats/          # StatsSection, StatCard
│   │   └── ui/             # Reusable UI primitives (Button, Badge)
│   ├── data/               # Static data collections (clubs, schedule, stats)
│   ├── hooks/              # Custom React hooks (useCountdown, useCountUp, useCustomCursor)
│   ├── pages/              # Route views (Home, Clubs, ClubDetail, Agenda, Apply, About)
│   ├── types/              # TypeScript interfaces & types
│   ├── App.tsx             # Root router & layout
│   └── main.tsx            # Application entry point
├── index.html              # HTML shell
├── package.json            # Dependencies & scripts
├── tailwind.config.js      # Tailwind design system configuration
├── tsconfig.json           # TypeScript project references
├── tsconfig.app.json       # App TypeScript configuration
├── tsconfig.node.json      # Node/Vite tooling TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

## 🛠️ Development

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Run linter:
```bash
npm run lint
```
