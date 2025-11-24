// src/components/ProductImageGallery.tsx
"use client";

import { useState } from "react";
import { Box, Stack } from "@mui/material";
import type { WooImage } from "@/lib/wooClient";

interface ProductImageGalleryProps {
  images: WooImage[];
  productName: string;
}

const ProductImageGallery = ({
  images,
  productName,
}: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
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

  const mainImage = images[selectedIndex];

  return (
    <Stack spacing={2}>
      <Box
        component="img"
        src={mainImage.src}
        alt={mainImage.alt || productName}
        sx={{
          width: "100%",
          maxHeight: 400,
          objectFit: "cover",
          borderRadius: 2,
        }}
      />

      {images.length > 1 && (
        <Stack direction="row" spacing={1} sx={{ overflowX: "auto" }}>
          {images.map((img, idx) => (
            <Box
              key={img.id}
              component="img"
              src={img.src}
              alt={img.alt || `${productName} thumbnail ${idx + 1}`}
              onClick={() => setSelectedIndex(idx)}
              sx={{
                width: 72,
                height: 72,
                objectFit: "cover",
                borderRadius: 1,
                cursor: "pointer",
                border:
                  idx === selectedIndex ? "2px solid #e16849" : "1px solid #ddd",
                flexShrink: 0,
              }}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default ProductImageGallery;