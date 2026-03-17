// src/components/AddToCartButton.tsx
"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useCart } from "@/context/CartContext";
import type { AddToCartInput } from "@/lib/cartTypes";

interface AddToCartButtonProps {
  product: AddToCartInput;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { t } = useTranslation("cart");
  const { addItem } = useCart();

  const handleClick = () => addItem(product, 1);

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      {t("addToCart")}
    </Button>
  );
};