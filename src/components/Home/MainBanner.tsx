"use client";

import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Button, Container, Typography } from "@mui/material";
import WaveDivider from "../WaveDivider";

type MainBannerProps = {
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

const MainBanner: FC<MainBannerProps> = ({
  kicker = "From 🇨🇦 with Love",
  title = "Sniff the world,\nFrolic through life",
  subtitle = "Chew, sniff, chill — Fei Fei’s everyday must-haves.",
  ctaLabel = "Read More",
  ctaHref = "/our-story",
  imageSrc,
  imageAlt = "Sniff & Frolic hero image",
  bgLeft = "#F7E7D7",
  bgTopWave = "#E16849",
  bgBottomWave = "#063F53",
  textPrimary = "#063F53",
  accent = "#E16849",
}) => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        background: bgLeft,
      }}
    >
      <Container
        sx={{
          px: { xs: 2, md: 10 },
          pt: { xs: 8, md: 10 },
          pb: { xs: 7, md: 9 },
          zIndex: 1
        }}
        className="mainBanner"
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 4, md: 6 },
            alignItems: "center",
          }}
        >
          {/* Left content */}
          <Box sx={{ md: 3 }}>
            <Typography
              sx={{
                color: accent,
                fontWeight: 700,
                letterSpacing: 0.2,
                mb: 1.5,
                fontSize: { xs: 18, md: 20 },
              }}
            >
              {kicker}
            </Typography>

            <Typography
              component="h1"
              sx={{
                whiteSpace: "pre-line",
                color: textPrimary,
                fontFamily: `"Lilita One", "Alberta", Arial, sans-serif`,
                lineHeight: 1.05,
                fontSize: { xs: 28, sm: 36, md: 48 },
                mb: 2,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                color: accent,
                fontWeight: 600,
                opacity: 0.95,
                fontSize: { xs: 15, md: 16 },
                mb: 3.5,
              }}
            >
              {subtitle}
            </Typography>

            <Button
              component={Link}
              href={ctaHref}
              variant="contained"
              sx={{
                backgroundColor: accent,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 800,
                px: 3,
                py: 1.2,
                boxShadow: "none",
                "&:hover": { backgroundColor: accent, opacity: 0.92, boxShadow: "none" },
              }}
            >
              {ctaLabel}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MainBanner;
