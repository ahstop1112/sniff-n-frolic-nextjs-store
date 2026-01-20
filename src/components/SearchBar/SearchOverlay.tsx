"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { SearchOverlayProps, CatOption, PopularCategory } from "./types";

const buildSearchHref = (locale: Locale, q: string, cat?: string, searchPath?: string) => {
  const base = searchPath ?? `/${locale}/search`;
  const url = new URL(base, "http://local");
  if (q.trim()) url.searchParams.set("q", q.trim());
  if (cat && cat !== "all") url.searchParams.set("cat", cat);
  return url.pathname + url.search;
};

const SearchOverlay = ({
  open,
  onClose,
  locale,
  categories,
  trending,
  popularCategories,
  searchPath,
}: SearchOverlayProps) => {
  const router = useRouter();

  const catOptions = useMemo<CatOption[]>(
    () =>
      categories?.length
        ? categories
        : [
            { id: "all", label: "All categories" },
            { id: 1, label: "Pet Treats", slug: "pet-treats" },
            { id: 2, label: "Outdoor Gear", slug: "outdoor-gear" },
          ],
    [categories]
  );

  const trendingList = useMemo(
    () => trending ?? ["Treats", "Slow feeder", "Raincoat", "Travel"],
    [trending]
  );

  const popular = useMemo<PopularCategory[]>(
    () =>
      popularCategories ?? [
        { label: "Backpack & Wagon", href: `/${locale}/c/backpack-wagon`, count: 1 },
        { label: "Bowls & Feeders", href: `/${locale}/c/bowls-feeders`, count: 5 },
        { label: "Cleanup Crew", href: `/${locale}/c/cleanup`, count: 3 },
        { label: "Everyday Care", href: `/${locale}/c/everyday`, count: 12 },
        { label: "Grooming Tools", href: `/${locale}/c/grooming`, count: 5 },
        { label: "Leash & Collar", href: `/${locale}/c/leash-collar`, count: 4 },
      ],
    [popularCategories, locale]
  );

  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");

  const runSearch = () => {
    router.push(buildSearchHref(locale, q, cat, searchPath));
    onClose();
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#fff3e8", // 你張圖嗰種暖底色，可改用 token
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        {/* top bar */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Box />
          <IconButton onClick={onClose} aria-label="Close search">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        {/* title */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontFamily: `"Lilita One", system-ui`,
            color: "#063F53",
            mb: 2,
          }}
        >
          What Are You Looking For?
        </Typography>

        {/* search row */}
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mb: 3 }}
        >
          <Box
            sx={{
              display: "flex",
              width: "min(920px, 100%)",
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "#fff",
            }}
          >
            <Select
              value={cat}
              onChange={(e) => setCat(String(e.target.value))}
              sx={{
                width: 240,
                borderRight: "1px solid rgba(0,0,0,0.12)",
                "& fieldset": { border: "none" },
              }}
            >
              {catOptions.map((c) => (
                <MenuItem key={String(c.id)} value={c.slug ?? String(c.id)}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>

            <TextField
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for products / content"
              variant="outlined"
              fullWidth
              onKeyDown={(e) => {
                if (e.key === "Enter") runSearch();
                if (e.key === "Escape") onClose();
              }}
              sx={{
                "& fieldset": { border: "none" },
              }}
            />

            <Button
              onClick={runSearch}
              startIcon={<SearchRoundedIcon />}
              sx={{
                px: 3,
                borderRadius: 0,
                bgcolor: "#e16849",
                color: "#fff",
                "&:hover": { bgcolor: "#cf5b40" },
              }}
            >
              Search
            </Button>
          </Box>
        </Stack>

        {/* trending */}
        <Stack direction="row" justifyContent="center" sx={{ mb: 6 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: "wrap" }}>
            <Typography sx={{ fontWeight: 800, color: "#063F53", mr: 1 }}>
              TRENDING SEARCHES:
            </Typography>

            {trendingList.map((t) => (
              <Chip
                key={t}
                label={t}
                onClick={() => {
                  setQ(t);
                  router.push(buildSearchHref(locale, t, cat, searchPath));
                  onClose();
                }}
                variant="outlined"
                sx={{ bgcolor: "#fff" }}
              />
            ))}
          </Stack>
        </Stack>

        {/* popular categories */}
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontFamily: `"Lilita One", system-ui`,
            color: "#063F53",
            mb: 3,
          }}
        >
          Popular Categories
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(6, 1fr)" },
            gap: 3,
            width: "min(1100px, 100%)",
            mx: "auto",
          }}
        >
          {popular.map((c) => (
            <Box key={c.href} sx={{ textAlign: "center" }}>
              <Box
                component={Link}
                href={c.href}
                onClick={onClose}
                sx={{
                  display: "block",
                  width: 140,
                  height: 140,
                  mx: "auto",
                  borderRadius: 2,
                  bgcolor: "rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                {/* 你之後可以換成 next/image */}
                {c.imgSrc ? (
                  <Box component="img" src={c.imgSrc} alt={c.label} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : null}
              </Box>

              <Typography sx={{ mt: 1.5, fontWeight: 900, color: "#e16849" }}>
                {c.label}
              </Typography>

              {typeof c.count === "number" ? (
                <Typography sx={{ opacity: 0.7 }}>{c.count} products</Typography>
              ) : null}
            </Box>
          ))}
        </Box>

        <Stack alignItems="center" sx={{ mt: 6 }}>
          <Button
            component={Link}
            href={`/${locale}/categories`}
            onClick={onClose}
            variant="outlined"
            sx={{ px: 4, py: 1.25, borderRadius: 2 }}
          >
            View All Categories
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default SearchOverlay;