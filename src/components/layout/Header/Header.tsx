"use client"

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Stack } from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { IconButton } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import HeaderNav from "@/components/HeaderNav/HeaderNav";
import SearchOverlay from "@/components/SearchBar/SearchOverlay";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import { MiniCart } from "@/components/MiniCart";
import { NAV_ITEMS } from "@/config/nav.config";
import { HeaderProps } from "./types";
import styles from "./Header.module.scss";

const Header = ({ locale }: HeaderProps) => {
    const { t } = useTranslation("nav");

    // local state
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Box component="header" className={styles.header}>
            <div className={styles.promo}>
                <StorefrontIcon/> Free shipping over $75
            </div>
            <Stack
                className={styles.headerContainer}
            >
                <Link href={`/${locale}`} style={{ textDecoration: "none" }}>
                    <img src="/images/logo_snf_light2.png" className={styles.headerLogo} alt={t(`common.siteTitle`)} />
                </Link>
                {/* <SearchBar locale={locale} /> */}

                <Stack direction="row" spacing={2} alignItems="center">
                    <HeaderNav locale={locale} items={NAV_ITEMS(locale)} />
                    <IconButton onClick={() => setSearchOpen(true)} aria-label="Open search">
                        <SearchRoundedIcon />
                    </IconButton>
                    <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} locale={locale} />

                    
                    {/* Mobile menu */}
                    <IconButton
                        aria-label="Menu"
                        onClick={() => setMobileOpen(true)}
                        sx={{ color: "#fff", display: { xs: "inline-flex", md: "none" } }}
                    >
                        <MenuRoundedIcon />
                    </IconButton>
                    <MobileMenu
                        open={mobileOpen}
                        onClose={() => setMobileOpen(false)}
                        locale={locale}
                    />
                </Stack>
                <MiniCart locale={locale} />
            </Stack>
        </Box>
    );
};

export default Header;
