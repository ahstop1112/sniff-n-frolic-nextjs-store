// components/ParallaxBanner/index.tsx
"use client";
import Section from "@/components/Section";
import Image from "next/image";
import styles from "./MeetFeiFeiSection.module.scss";

const MeetFeiFeiSection = () => {
  return (
    <Section tone="teal" topWave="orange" bottomWave="cream" style={{ padding: 30 }}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/feifei.jpg"
            alt="Fei Fei"
            fill
            className={styles.image}
          />
          <div className={styles.woofBubble}>WOOF</div>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Meet Fei Fei 🐾</h2>
          <p className={styles.description}>
            Fei Fei is our Chief Sniffing Officer — a Canada-born corgi with a
            nose for fun and quality. Every toy, treat, and travel gear here has
            been paw-picked and pup-tested by her (with great enthusiasm).
          </p>
        </div>
      </div>
    </Section>
  );
};

export default MeetFeiFeiSection;