"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
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

interface SimpleTerm{
  id: number;
  name: string;
  slug: string;
}

interface ProductsFilterSidebarClientProps {
  locale: "en" | "zh";
  categories: SimpleCategory[];
  colors?: SimpleTerm[];
}

const ProductsFilterSidebarClient = ({
  locale,
  categories,
  colors = [],
}: ProductsFilterSidebarClientProps) => {
  // Local State
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isZh = locale === "zh";

  const selectedCategorySlug = searchParams.get("category") ?? "";
  const inStock = searchParams.get("in_stock") === "1";
  const onSale = searchParams.get("on_sale") === "1";

  const minPrice = searchParams.get("min_price") ?? "";
  const maxPrice = searchParams.get("max_price") ?? "";

  const sort = searchParams.get("sort") ?? "new"; // new | popularity | rating | price_asc | price_desc
  const color = searchParams.get("color") ?? ""; // color term slug (optional)
  const hasColors = useMemo(() => (colors || []).length > 0, [colors]);

  useEffect(() => {
    setMinPriceInput(minPrice);
    setMaxPriceInput(maxPrice);
  }, [minPrice, maxPrice]);

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
      router.refresh();
    },
    [pathname, router, searchParams]
  );

  const handleCategoryChange = (slug: string) => {
    updateParams({ category: slug || null });
  };

  const handleInStockChange = (checked: boolean) => {
    updateParams({ in_stock: checked ? "1" : null });
  };

  const handleOnSaleChange = (checked: boolean) => {
    updateParams({ on_sale: checked ? "1" : null });
  };

  const handleMinPriceChange = (value: string) => setMinPriceInput(value.replace(/[^\d]/g, ""));
  const handleMaxPriceChange = (value: string) => setMaxPriceInput(value.replace(/[^\d]/g, ""));

  const applyPriceFilter = () => {
    updateParams({
      min_price: minPriceInput || null,
      max_price: maxPriceInput || null,
    });
  };

  const handleSortChange = (value: string) => {
    updateParams({ sort: value || null });
  };

  const handleColorChange = (value: string) => {
    updateParams({ color: value || null });
  };

  const handleClear = () => {
    updateParams({ 
      category: null,
      in_stock: null,
      on_sale: null,
      min_price: null,
      max_price: null,
      sort: null,
      color: null 
    });
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

         {/* Price */}
         <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            label={isZh ? "最低價" : "Min"}
            value={minPriceInput}
            onChange={(e) => handleMinPriceChange(e.target.value)}
            onBlur={applyPriceFilter}
            onKeyDown={(e) => e.key === "Enter" && applyPriceFilter()}
            inputMode="numeric"
            sx={{ flex: 1 }}
          />
          <TextField
            size="small"
            label={isZh ? "最高價" : "Max"}
            value={maxPriceInput}
            onChange={(e) => handleMaxPriceChange(e.target.value)}
            onBlur={applyPriceFilter}
            onKeyDown={(e) => e.key === "Enter" && applyPriceFilter()}
            inputMode="numeric"
            sx={{ flex: 1 }}
          />
        </Stack>

        {/* Sort */}
        <TextField
          select
          size="small"
          label={isZh ? "排序" : "Sort"}
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          sx={{ width: "100%" }}
        >
          <MenuItem value="new">{isZh ? "最新" : "Newest"}</MenuItem>
          <MenuItem value="popularity">{isZh ? "受歡迎" : "Popularity"}</MenuItem>
          <MenuItem value="rating">{isZh ? "評分" : "Rating"}</MenuItem>
          <MenuItem value="price_asc">{isZh ? "價錢：低至高" : "Price: Low → High"}</MenuItem>
          <MenuItem value="price_desc">{isZh ? "價錢：高至低" : "Price: High → Low"}</MenuItem>
        </TextField>

        {/* Color (optional) */}
        {hasColors && (
          <TextField
            select
            size="small"
            label={isZh ? "顏色" : "Color"}
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            sx={{ width: "100%" }}
          >
            <MenuItem value="">{isZh ? "全部" : "All"}</MenuItem>
            {colors.map((t) => (
              <MenuItem key={t.id} value={t.slug}>
                {t.name}
              </MenuItem>
            ))}
          </TextField>
        )}

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