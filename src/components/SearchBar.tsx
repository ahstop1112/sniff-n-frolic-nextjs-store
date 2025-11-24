// src/components/SearchBar.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  locale: "en" | "zh";
}

export const SearchBar = ({ locale }: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get("search") ?? "";
  const [value, setValue] = useState(initial);

  const placeholder =
    locale === "zh" ? "搜尋產品關鍵字…" : "Search products…";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();

    if (!trimmed) {
      router.push(`/${locale}/products`);
      return;
    }

    const params = new URLSearchParams();
    params.set("search", trimmed);
    router.push(`/${locale}/search?${params.toString()}`);
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 220 }}
    >
      <TextField
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};