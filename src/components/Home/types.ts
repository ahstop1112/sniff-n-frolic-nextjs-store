export type MainBannerProps = {
  kicker?: string; // e.g. "From 🇨🇦 with Love"
  title?: string; // e.g. "Sniff the world,\nFrolic through life"
  subtitle?: string; // e.g. "Chew, sniff, chill — Fei Fei’s everyday must-haves."
  ctaLabel?: string; // e.g. "Read More"
  ctaHref?: string; // e.g. "/our-story"
  imageSrc?: string; // e.g. "/images/feifei-hero.jpg"
  imageAlt?: string;

  // theme colors (override per page/section)
  bgLeft?: string; // cream
  bgTopWave?: string; // orange wave
  bgBottomWave?: string; // teal wave
  textPrimary?: string; // teal
  accent?: string; // orange
};
