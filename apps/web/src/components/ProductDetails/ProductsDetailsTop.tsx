"use client";

import { Typography, Box } from "@mui/material";
import { formatPrice } from "@/lib/currency";
import { useLocale } from "@/i18n/LocaleProvider";
import { ProductDetailsProps } from "./types";
import styles from "./ProductDetails.module.scss";

const ProductsDetailsTop = ({
  title,
  shortDesc,
  price,
  onSale,
  variantOptions,
}: ProductDetailsProps) => {
  const locale = useLocale();
  const displayPrice = formatPrice(price);

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <h5 className={styles.price}>{displayPrice}</h5>
      {onSale && <p>On Sale</p>}
      {variantOptions && variantOptions.length > 0 ? (
        <Box mt={3}>
          {variantOptions.map((group) => (
            <Box key={group.slug} mb={2}>
              <Typography variant="subtitle2" gutterBottom>
                {group.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {group.values.map((value) => (
                  <Box
                    key={value}
                    sx={{
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "divider",
                      px: 1.2,
                      py: 0.4,
                      fontSize: 14,
                    }}
                  >
                    {value}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      ) : null}
      {shortDesc && (
        <Box mt={2} className={styles.shortDesc}>
          <div dangerouslySetInnerHTML={{ __html: shortDesc }} />
        </Box>
      )}
    </>
  );
};

export default ProductsDetailsTop;
