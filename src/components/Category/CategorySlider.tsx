"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useLocale } from "@/i18n/LocaleProvider";
import styles from "./Category.module.scss";
import type { CategorySliderProps } from "./types";
import { Box } from "@mui/material";

const CategorySlider = ({ items }: CategorySliderProps) => {
  const locale = useLocale();
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  const scrollByOne = (dir: "prev" | "next") => {
    if (!emblaApi) return;
    const current = emblaApi.selectedScrollSnap();
    emblaApi.scrollTo(dir === "prev" ? current - 1 : current + 1);
  };

  return (
    <div className={styles.wrap}>
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        type="button"
        onClick={() => scrollByOne("prev")}
        aria-label="Previous"
      >
        <ChevronLeftRoundedIcon />
      </button>

      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        type="button"
        onClick={() => scrollByOne("next")}
        aria-label="Next"
      >
        <ChevronRightRoundedIcon />
      </button>

      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.track}>
          {items.map((item) => (
            <div className={styles.slide} key={item.slug}>
              <Link
                href={`/${locale}/category/${item.slug}`}
                className={styles.link}
              >
                <div className={styles.circle}>
                  {item.imageSrc ? (
                    <Box
                      component="img"
                      src={item.imageSrc}
                      alt={item.name}
                      style={{ maxWidth: "100%" }}
                    />
                  ) : (
                    <div className={styles.fallback}>
                      <div className={styles.fallbackText}>{item.name}</div>
                    </div>
                  )}
                </div>
                <p className={styles.name}>{item.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
