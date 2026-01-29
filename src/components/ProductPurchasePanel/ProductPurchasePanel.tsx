"use client";

import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useCart } from "@/context/CartContext";
import { ProductPurchasePanelProps } from "./types";
import styles from "./ProductPurchasePanel.module.scss";

const ProductPurchasePanel = ({
  locale,
  product,
}: ProductPurchasePanelProps) => {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const labelAdd = locale === "zh" ? "加入購物車" : "Add to cart";

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
        label={locale === "zh" ? "數量" : "Qty"}
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
