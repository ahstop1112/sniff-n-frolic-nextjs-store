"use client";

import useEmblaCarousel from "embla-carousel-react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ProductGrid from "../Product/ProductGrid";
import { CateogryProductSliderProps } from "./types";
import styles from "./CategoryProduct.module.scss";

const CateogryProductSlider = ({ items }: CateogryProductSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  const scrollByOne = (dir: "prev" | "next") => {
    if (!emblaApi) return;

    const current = emblaApi.selectedScrollSnap();

    if (dir === "prev") {
      emblaApi.scrollTo(current - 1);
      return;
    }

    emblaApi.scrollTo(current + 1);
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
          {items.map((p) => {
            return (
              <div className={styles.slide} key={p.id}>
                <ProductGrid
                  categoryName={p?.categories[0]?.name || ``}
                  slug={p.slug}
                  image={p.image?.[0] ?? null}
                  name={p.name}
                  onSale={p?.on_sale}
                  price={p.price}
                  regularPrice={p?.regular_price}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CateogryProductSlider;
