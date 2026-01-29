"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Stack, IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// Components
import HeaderNav from "@/components/HeaderNav/HeaderNav";
import SearchOverlay from "@/components/SearchBar/SearchOverlay";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import MiniCart from "@/components/Cart/MiniCart";
// Context & Config
import { useCategories } from "@/context/CategoriesContext";
import { NAV_ITEMS } from "@/config/nav.config";
import { HeaderProps } from "./types";
import styles from "./Header.module.scss";

const Header = ({ locale }: HeaderProps) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const categories = useCategories();
  const navItems = NAV_ITEMS(locale, categories);

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  return (
    <>
      <Box component="header" className={styles.header}>
        <div className={styles.promo}>
          <StorefrontIcon /> Free shipping over $75
        </div>

        {/* ✅ Desktop Row */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className={styles.headerContainer}
          >
            <Link href={`/${locale}`} style={{ textDecoration: "none" }}>
              <img
                src="/images/logo_snf_light2.png"
                className={styles.headerLogo}
                alt={t("common.siteTitle")}
              />
            </Link>
            {/* Left: Nav */}
            <HeaderNav locale={locale} items={navItems} />

            {/* Right: Search + Cart */}
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
              >
                <SearchRoundedIcon />
              </IconButton>
              <MiniCart locale={locale} />
            </Stack>
          </Stack>
        </Box>

        {/* ✅ Mobile Row */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className={styles.headerContainer}
          >
            {/* Left: Hamburger */}
            <IconButton aria-label="Menu" onClick={() => setMobileOpen(true)}>
              <MenuRoundedIcon />
            </IconButton>

            {/* Center: Logo */}
            <Link href={`/${locale}`} style={{ textDecoration: "none" }}>
              <img
                src="/images/logo_snf_light2.png"
                className={styles.headerLogo}
                alt={t("common.siteTitle")}
              />
            </Link>

            {/* Right: Cart (你想 mobile 有 search 都可以加返) */}
            <MiniCart locale={locale} />
          </Stack>
        </Box>
      </Box>
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        locale={locale}
      />
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        locale={locale}
      />
    </>
  );
};

export default Header;
