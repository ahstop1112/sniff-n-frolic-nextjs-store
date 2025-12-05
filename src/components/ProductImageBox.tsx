// src/components/ProductImageBox.tsx
"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import type { WooImage } from "@/lib/wooClient";

interface ProductImageBoxProps {
  image: WooImage;
  productName: string;
}

const ProductImageBox = ({
  image,
  productName,
}: ProductImageBoxProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!image) {
    return (
      <Box
        sx={{
          width: "100%",
          height: 300,
          bgcolor: "grey.100",
          borderRadius: 2,
        }}
      />
    );
  }

  return (
      <Box
        component="img"
        src={image.src}
        alt={image.alt || productName}
        sx={{
          width: "100%",
          maxHeight: 400,
          objectFit: "cover",
          borderRadius: 2,
        }}
      />
  );
};

export default ProductImageBox;