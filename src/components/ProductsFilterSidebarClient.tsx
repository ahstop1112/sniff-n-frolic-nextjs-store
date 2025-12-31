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
import type { getDictionary } from "@/i18n/dictionaries";

type Dict = Awaited<ReturnType<typeof getDictionary>>;
type CommonDict = Dict["common"];

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
  common: CommonDict
}

const ProductsFilterSidebarClient = ({
  locale,
  categories,
  colors = [],
  common
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
        {common.filters}
      </Typography>

      <Stack spacing={2}>
        {/* Category */}
        <TextField
          select
          size="small"
          label={common.category}
          value={selectedCategorySlug}
          onChange={(e) => handleCategoryChange(e.target.value)}
          sx={{ width: "100%" }}
        >
          <MenuItem value="">
            {common.all}
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.slug}>
              {cat.name.replace("&amp;", "&")}
            </MenuItem>
          ))}
        </TextField>

         {/* Price */}
         <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            label={common.min}
            value={minPriceInput}
            onChange={(e) => handleMinPriceChange(e.target.value)}
            onBlur={applyPriceFilter}
            onKeyDown={(e) => e.key === "Enter" && applyPriceFilter()}
            inputMode="numeric"
            sx={{ flex: 1 }}
          />
          <TextField
            size="small"
            label={common.max}
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
          label={common.sort}
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          sx={{ width: "100%" }}
        >
          <MenuItem value="new">{common.newest}</MenuItem>
          <MenuItem value="popularity">{common.popularity}</MenuItem>
          <MenuItem value="rating">{common.rating}</MenuItem>
          <MenuItem value="price_asc">{common.priceLowHigh}</MenuItem>
          <MenuItem value="price_desc">{common.priceHighLow}</MenuItem>
        </TextField>

        {/* Color (optional) */}
        {hasColors && (
          <TextField
            select
            size="small"
            label={common.color}
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            sx={{ width: "100%" }}
          >
            <MenuItem value="">{common.all}</MenuItem>
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
              {common.inStockOnly}
            </Typography>
          }
        />
        {/* On sale only */}
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={onSale}
              onChange={(e) => handleOnSaleChange(e.target.checked)}
            />
          }
          label={<Typography variant="body2">{common.onSaleOnly}</Typography>}
        />
        <Button
          size="small"
          variant="text"
          onClick={handleClear}
          sx={{ alignSelf: "flex-start" }}
        >
          {common.clearFilter}
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductsFilterSidebarClient;