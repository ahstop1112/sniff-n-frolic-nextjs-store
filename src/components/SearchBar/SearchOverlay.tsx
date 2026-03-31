"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Select,
  Stack,
  TextField,
  Typography,
  Chip,
  MenuItem,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useCategories } from "@/context/CategoriesContext";
import { useLocale } from "@/i18n/LocaleProvider";
import { useRunSearch } from "@/domains/search/useRunSearch";
import { SearchOverlayProps, CatOption } from "./types";
import styles from "./SearchBar.module.scss";

const SearchOverlay = ({
  open,
  trending,
  searchPath,
  onClose,
}: SearchOverlayProps) => {
  const { t } = useTranslation("search");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { runSearch } = useRunSearch({
    searchPath,
    onClose,
  });

  useEffect(() => {
    if (!open) return;
    onClose();
  }, [pathname, searchParams]);

  const trendingList = useMemo(
    () => trending ?? ["Treats", "Slow feeder", "Raincoat", "Travel"],
    [trending],
  );

  const categories = useCategories();
  const catOptions = useMemo(() => {
    if (!categories?.length) return [];

    const options: CatOption[] = [
      { id: 0, label: t("allCategories"), slug: "all" },
    ];

    categories.map((item) => {
      const newItem = {
        id: item.id,
        label: item.name.replaceAll(" &amp; ", " & "),
        slug: item.slug,
      };
      options.push(newItem);
    });
    return options;
  }, [categories]);

  const popular = useMemo(() => {
    if (!categories?.length) return [];
    const topLevel = categories.filter((c) => c.parent === 0);

    //  shuffle copy
    const shuffled = [...topLevel].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [categories]);

  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      PaperProps={{ className: styles.drawerPaper }}
    >
      <Box className={styles.root}>
        {/* top bar  */}
        <Stack className={styles.topBar}>
          {/* title */}
          <h4 className={styles.title}>{t("whatAreYouLookingFor")}</h4>
          <IconButton onClick={onClose} aria-label="Close search">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        {/* search row */}
        <Stack className={styles.searchRow}>
          <Select
            value={cat}
            onChange={(e) => setCat(String(e.target.value))}
            className={styles.select}
          >
            {catOptions.map((c) => (
              <MenuItem key={String(c.id)} value={c.slug ?? String(c.id)}>
                {c.label || ``}
              </MenuItem>
            ))}
          </Select>
          <TextField
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for products / content"
            className={styles.searchInput}
            fullWidth
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch(q, cat);
              if (e.key === "Escape") onClose();
            }}
          />
          <Button
            onClick={() => runSearch(q, cat)}
            startIcon={<SearchRoundedIcon />}
            className={styles.searchBtn}
          >
            {t("title")}
          </Button>
        </Stack>
        {/* trending */}
        <Stack className={styles.trending}>
          <Typography sx={{ fontWeight: 800, color: "#063F53", mr: 1 }}>
            {" "}
            TRENDING SEARCHES:{" "}
          </Typography>
          {trendingList.map((t) => (
            <Chip
              key={t}
              label={t}
              onClick={() => runSearch(t, cat)}
              variant="outlined"
              className={styles.chip}
            />
          ))}
        </Stack>
        {/* popular categories */}
        <h5 className={styles.sectionTitle}>{t("popularCategories")}</h5>
        <Box className={styles.grid}>
          {popular.map((c) => (
            <Box key={c.slug}>
              <Box
                component={Link}
                href={`/${locale}/category/${c.slug}`}
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
                {c.image ? (
                  <Box
                    component="img"
                    src={c.image?.src}
                    alt={c.image?.alt || c.name}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : null}
              </Box>
              <Typography className={styles.cardTitle}>{c.name}</Typography>
            </Box>
          ))}
        </Box>
        <Stack className={styles.footer}>
          <Button
            component={Link}
            href={`/${locale}/products`}
            onClick={onClose}
            variant="outlined"
            className={styles.viewAll}
          >
            {t("viewAllProducts")}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default SearchOverlay;
