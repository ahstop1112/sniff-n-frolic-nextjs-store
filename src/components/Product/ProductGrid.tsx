// src/components/ProductGrid.tsx
"use client";
import Link from "next/link";
import { ProductGridProps } from "./types";
import styles from "./Product.module.scss";

const formatMoney = (n: number, currency = "CAD") =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency }).format(n);

const toNum = (v?: string) => {
  const x = Number(v);
  return Number.isFinite(x) ? x : null;
};

const ProductGrid = ({
  locale,
  slug,
  image,
  name,
  categoryName,
  onSale,
  price,
  regularPrice,
  currency = "CAD",
}: ProductGridProps) => {
  const sale = toNum(price);
  const regular = toNum(regularPrice);

  return (
    <Link href={`/${locale}/products/${slug}`} className={styles.productGrid}>
      <div className={styles.media}>
        {image?.thumbnail ? (
          <img
            src={image?.thumbnail}
            alt={image?.alt || name}
            sizes="(max-width: 600px) 80vw, (max-width: 1200px) 33vw, 20vw"
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
  );
};

export default ProductGrid;
