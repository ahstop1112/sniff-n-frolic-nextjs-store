// src/app/[lang]/layout.tsx
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SearchBar } from "@/components/SearchBar";
import { MiniCart } from "@/components/MiniCart";
import styles from "./scss/Header.module.scss";

const Header = async ({ locale }: Locale) => {
  const dict = await getDictionary(locale);

  return (
      <Box component="header" className={styles.header}>
        <div className={styles.promo}>
            <StorefrontIcon/> Free shipping over $75
        </div>
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            className={styles.headerContainer}
        >
            <Link href={`/${locale}`} style={{ textDecoration: "none" }}>
                <img src="/images/logo_snf_light2.png" className={styles.headerLogo} alt={dict.common.siteTitle} />
            </Link>
            {/* <SearchBar locale={locale} /> */}

            <Stack direction="row" spacing={2} alignItems="center">
                <Link href={`/${locale}`}>{dict.nav.home}</Link>
                <Link href={`/${locale}/products`}>{dict.nav.products}</Link>
                <Link href={`/${locale}/about`}>{dict.nav.about}</Link>
                <Link href="/en">EN</Link>
                <Link href="/zh">中文</Link>
            </Stack>
            <MiniCart locale={locale} />
        </Stack>
    </Box>
  );
};

export default Header;
