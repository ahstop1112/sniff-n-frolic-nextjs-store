"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import { useLocale } from "@/i18n/LocaleProvider";
import { formatMoney, toNum } from "@/utils/helpers";
import { ProductGridProps } from "./types";
import styles from "./Product.module.scss";

const ProductGrid = ({
  slug,
  image,
  name,
  categoryName,
  onSale,
  price,
  regularPrice,
  currency = "CAD",
}: ProductGridProps) => {
  const locale = useLocale();
  const sale = toNum(price);
  const regular = toNum(regularPrice);
  const img = image as any;
  const imgSrc: string =
    img?.thumbnail ?? img?.src ?? img?.url ?? img?.imageSrc ?? "";
  const imgAlt: string = (img?.alt ?? img?.name ?? name ?? "").toString();
  const imgSizes: string | undefined =
    typeof img?.sizes === "string" ? img.sizes : undefined;

  return (
    <Box className={styles.productGrid}>
      <Link href={`/${locale}/products/${slug}`}>
        <div className={styles.media}>
          {image ? (
            <img
              src={imgSrc}
              alt={imgAlt}
              sizes={imgSizes}
              className={styles.img}
            />
          ) : (
            <div className={styles.imgFallback} />
          )}
        </div>

        <div className={styles.productInfo}>
          {categoryName ? (
            <div className={styles.category}>{categoryName}</div>
          ) : null}

          <div className={styles.title}>{name}</div>

          <div className={styles.priceBlock}>
            {onSale ? (
              <>
                <span className={styles.saleOnRegular}>
                  {formatMoney(regular!, currency)}
                </span>
                <span className={styles.sale}>
                  {formatMoney(sale!, currency)}
                </span>
              </>
            ) : (
              <div className={styles.sale}>
                {sale !== null ? formatMoney(sale, currency) : ""}
              </div>
            )}
          </div>
        </div>
      </Link>
    </Box>
  );
};

export default ProductGrid;
