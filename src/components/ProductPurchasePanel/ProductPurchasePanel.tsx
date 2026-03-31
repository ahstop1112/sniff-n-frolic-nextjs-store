"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, TextField } from "@mui/material";
import { useCart } from "@/context/CartContext";
import { ProductPurchasePanelProps } from "./types";
import styles from "./ProductPurchasePanel.module.scss";

const ProductPurchasePanel = ({
  product,
}: ProductPurchasePanelProps) => {
  const { t } = useTranslation("cart");
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const labelAdd = t('addToCart');

  const handleQtyChange = (value: number) => {
    if (Number.isNaN(value)) return;
    setQty(Math.max(1, value));
  };

  const handleAdd = () => {
    addItem(product, qty);
  };

  return (
    <Box className={styles.productPurchasePanel}>
      {/* Quantity */}
      <TextField
        type="number"
        size="small"
        label={t('qty')}
        value={qty}
        inputProps={{ min: 1, style: { textAlign: "center", width: 60 } }}
        onChange={(e) => handleQtyChange(Number(e.target.value))}
      />
      {/* Add to cart button */}
      <Button variant="contained" color="primary" onClick={handleAdd}>
        {labelAdd}
      </Button>
    </Box>
  );
};

export default ProductPurchasePanel;
