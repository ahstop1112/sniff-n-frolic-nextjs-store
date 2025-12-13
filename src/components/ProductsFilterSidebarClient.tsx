"use client";

import { useCallback } from "react";
import {
  Box,
  Stack,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SimpleCategory {
  id: number;
  name: string;
  slug: string;
}

interface ProductsFilterSidebarClientProps {
  locale: "en" | "zh";
  categories: SimpleCategory[];
}

const ProductsFilterSidebarClient = ({
  locale,
  categories,
}: ProductsFilterSidebarClientProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isZh = locale === "zh";

  const selectedCategorySlug = searchParams.get("category") ?? "";
  const inStock = searchParams.get("in_stock") === "1";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const qs = params.toString();
      const nextUrl = qs ? `${pathname}?${qs}` : pathname;
      router.push(nextUrl);
    },
    [pathname, router, searchParams]
  );

  const handleCategoryChange = (slug: string) => {
    updateParams({ category: slug || null });
  };

  const handleInStockChange = (checked: boolean) => {
    updateParams({ in_stock: checked ? "1" : null });
  };

  const handleClear = () => {
    updateParams({ category: null, in_stock: null });
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          mb: 2,
          fontWeight: 600,
          textTransform: "uppercase",
          fontSize: 12,
        }}
      >
        {isZh ? "篩選" : "Filters"}
      </Typography>

      <Stack spacing={2}>
        {/* Category */}
        <TextField
          select
          size="small"
          label={isZh ? "分類" : "Category"}
          value={selectedCategorySlug}
          onChange={(e) => handleCategoryChange(e.target.value)}
          sx={{ width: "100%" }}
        >
          <MenuItem value="">
            {isZh ? "全部" : "All"}
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.slug}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        {/* In stock only */}
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={inStock}
              onChange={(e) => handleInStockChange(e.target.checked)}
            />
          }
          label={
            <Typography variant="body2">
              {isZh ? "只顯示有貨" : "In stock only"}
            </Typography>
          }
        />

        <Button
          size="small"
          variant="text"
          onClick={handleClear}
          sx={{ alignSelf: "flex-start" }}
        >
          {isZh ? "清除篩選" : "Clear filters"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductsFilterSidebarClient;