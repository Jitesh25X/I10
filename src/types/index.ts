export type Category =
  | "Technical"
  | "Cultural"
  | "Dance"
  | "Music"
  | "Literary"
  | "Other";

export type Club = {
  id: string;              // unique slug, e.g. "coding-ninjas-10x"
  name: string;
  shortName?: string;      // clean showcase display name, e.g. "Codex", "GDGoC"
  category: Category;
  logoUrl: string;         // path under /public/clubs/
  tagline?: string;        // short one-liner for the card
  about: string;           // "Know your club" description
  achievements?: string[]; // optional highlight bullets
  instagramUrl?: string;
  applyFormUrl?: string;   // Google Form link; undefined = "coming soon"
};

export type ScheduleEvent = {
  id: string;
  clubId: string;          // references Club.id
  eventTitle: string;
  day: string;             // ISO date, e.g. "2026-10-12"
  startTime: string;       // 24h "HH:mm"
  endTime?: string;
  venue: string;
};

export type GalleryImage = {
  id: string;
  imageUrl: string;        // path under /public/gallery/
  caption?: string;
  year: number;            // e.g. 2025
};
export type Stat = { id: string; label: string; value: number; suffix?: string; };
