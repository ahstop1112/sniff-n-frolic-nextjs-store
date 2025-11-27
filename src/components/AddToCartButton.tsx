// src/components/AddToCartButton.tsx
"use client";

import { Button } from "@mui/material";
import { useCart } from "@/context/CartContext";
import type { AddToCartInput } from "@/lib/cartTypes";

interface AddToCartButtonProps {
  product: AddToCartInput;
  locale: "en" | "zh";
}

export const AddToCartButton = ({
  product,
  locale,
}: AddToCartButtonProps) => {
  const { addItem } = useCart();

  const label = locale === "zh" ? "加入購物車" : "Add to cart";

  const handleClick = () => {
    addItem(product, 1);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      {label}
    </Button>
  );
};