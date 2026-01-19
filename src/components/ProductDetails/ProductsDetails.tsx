"user client";

import { Typography, Box } from "@mui/material";
import { formatPrice } from "@/lib/currency";
import { ProductDetailsProps } from "./types";
import styles from "./ProductDetails.module.scss"


const ProductDetails = ({ title, shortDesc, price, onSale, variantOptions, locale }: ProductDetailsProps) => {
  // Currency
  const displayPrice = formatPrice(price);

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <h5 className={styles.price}>{displayPrice}</h5>
      {onSale && (
        <p>On Sale</p>
      )}
      {variantOptions.length > 0 ? (
        <Box mt={3}>
          {variantOptions.length > 0 && (
            <Box mt={3}>
              {variantOptions.map((group) => (
                <Box key={group.slug} mb={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    {locale === "zh" ? group.name : group.name}
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
          )}
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

export default ProductDetails;
