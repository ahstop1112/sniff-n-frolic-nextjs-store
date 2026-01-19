export type SectionTone = "teal" | "white" | "cream" | "yellow" | "orange";

export type SectionProps = {
  children: React.ReactNode;
  tone?: SectionTone;
  topWave?: SectionTone;
  bottomWave?: SectionTone;
  className?: string;
};