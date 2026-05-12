// components/ParallaxBanner/index.tsx
"use client";
import Link from "next/link";
import styles from "./ParallaxBgSection.module.scss";

interface ParallaxBannerProps {
    title: string;
    subtitle?: string;
    buttonText?: string;
    buttonHref?: string;
    imageSrc: string;
    position?: 'center' | 'right'
}

const ParallaxBgSection = ({
    title,
    subtitle,
    buttonText,
    buttonHref = "/",
    imageSrc,
    position
}: ParallaxBannerProps) => {
  return (
    <div
        className={`${styles.banner} ${position === `center` ? styles.textCenter : position === `right` ? styles.textRight : ``}`}
        style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {buttonText && (
          <Link href={buttonHref} className={styles.button}>
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ParallaxBgSection;