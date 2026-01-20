"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, IconButton, InputBase } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import styles from "./SearchBar.module.scss";

const buildSearchHref = (locale: "en" | "zh", q: string, searchPath?: string) => {
  const base = searchPath ?? `/${locale}/search`;
  const url = new URL(base, `https://${locale}`);
  if (q.trim()) url.searchParams.set("q", q.trim());
  return url.pathname + url.search;
};

const useDebounced = (value: string, ms: number) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setV(value), ms);
    return () => window.clearTimeout(t);
  }, [value, ms]);
  return v;
};

const SearchBar = ({ locale, placeholder = "Search…", className, searchPath }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // 如果你係 /[lang]/search，會自動帶返 query 入 input
  const currentQ = useMemo(() => params.get("q") ?? "", [params]);
  const [q, setQ] = useState(currentQ);

  useEffect(() => setQ(currentQ), [currentQ]);

  const debounced = useDebounced(q, 250);

  // Optional：如果你想喺 search page 內「打字即更新結果」
  useEffect(() => {
    const isSearchPage = pathname?.includes(`/${locale}/search`);
    if (!isSearchPage) return;
    router.replace(buildSearchHref(locale, debounced, searchPath));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, locale]);

  const go = () => {
    router.push(buildSearchHref(locale, q, searchPath));
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") go();
    if (e.key === "Escape") setQ("");
  };

  return (
    <Box className={`${styles.searchBar} ${className}`}>
      <SearchRoundedIcon fontSize="small" style={{ opacity: 0.7 }} />
      <InputBase
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        inputProps={{ "aria-label": "Search" }}
        sx={{ flex: 1, fontSize: 14 }}
      />
      {q ? (
        <IconButton size="small" onClick={() => setQ("")} aria-label="Clear search">
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      ) : null}
      <IconButton size="small" onClick={go} aria-label="Run search">
        <SearchRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default SearchBar;