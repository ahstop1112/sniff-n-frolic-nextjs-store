"use client";

import useEmblaCarousel from "embla-carousel-react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ProductGrid from "../Product/ProductGrid";
import styles from "./CategoryProduct.module.scss";
import { CateogryProductSliderProps } from "./types";

const CateogryProductSlider = ({
  items,
  locale
}: CateogryProductSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  const scrollByOne = (dir: "prev" | "next") => {
    if (!emblaApi) return;
  
    const current = emblaApi.selectedScrollSnap();
    const total = emblaApi.scrollSnapList().length;
  
    if (dir === "prev") {
      emblaApi.scrollTo(current - 1); // loop=true 時可照用
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
            {items.map((item) => (
                <div className={styles.slide} key={item.id}>
                  <ProductGrid locale={locale} categoryName={item?.categories[0].name || ``}slug={item.slug} image={item?.images[0]} name={item.name} onSale={item?.on_sale} price={item.price} regularPrice={item?.regular_price} />
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default CateogryProductSlider;