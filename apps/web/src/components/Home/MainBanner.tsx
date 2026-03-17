"use client";

import type { FC } from "react";
import Link from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import { MainBannerProps } from "./types";
import styles from "./MainBanner.module.scss";

const MainBanner: FC<MainBannerProps> = ({
  kicker = "From 🇨🇦 with Love",
  title = "Sniff the world,\nFrolic through life",
  subtitle = "Chew, sniff, chill — Fei Fei’s everyday must-haves.",
  ctaLabel = "Read More",
  ctaHref = "/our-story",
}) => {
  return (
    <Box component="section" className={styles.banner}>
      <Container className={styles.container}>
        <Box className={styles.grid}>
          <Box className={styles.left}>
            <Typography className={styles.kicker}>{kicker}</Typography>
            <Typography component="h1" className={styles.title}>
              {title}
            </Typography>
            <Typography className={styles.subtitle}>{subtitle}</Typography>
            <Button
              LinkComponent={Link}
              href={ctaHref}
              variant="contained"
              className={styles.cta}
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
