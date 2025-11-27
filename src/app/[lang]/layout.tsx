// src/app/[lang]/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Box, Stack, Typography } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SearchBar } from "@/components/SearchBar";
import { CartProviderClient } from "@/components/CartProviderClient";
import { MiniCart } from "@/components/MiniCart";

interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

const LangLayout = async ({ children, params }: LangLayoutProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) return notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  return (
    <CartProviderClient>
        <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box component="header" sx={{ mb: 4 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
            >
                <Link href={`/${locale}`} style={{ textDecoration: "none" }}>
                    <Typography variant="h6">
                        {dict.common.siteTitle}
                    </Typography>
                </Link>
                <SearchBar locale={locale} />

                <Stack direction="row" spacing={2} alignItems="center">
                    <Link href={`/${locale}`}>
                    {dict.nav.home}
                    </Link >
                    <Link href={`/${locale}/products`}>
                    {dict.nav.products}
                    </Link >
                    <Link href={`/${locale}/about`}>
                    {dict.nav.about}
                    </Link >
                    <Link href="/en">EN</Link>
                    <Link href="/zh">中文</Link>
                    <MiniCart locale={locale} />
                </Stack>
            </Stack>
        </Box>

        <main>{children}</main>
        </Container>
    </CartProviderClient>
  );
};

export default LangLayout;  