// src/app/[lang]/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Box, Stack, Link as MuiLink } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SearchBar } from "@/components/SearchBar";

const LangLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) => {
  if (!isValidLocale(params.lang)) return notFound();

  const locale: Locale = params.lang;
  const dict = await getDictionary(locale);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box component="header" sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <MuiLink component={Link} href={`/${locale}`} underline="none">
            {dict.common.siteTitle}
          </MuiLink>

          <SearchBar locale={locale} />

          <Stack direction="row" spacing={2} alignItems="center">
            <MuiLink component={Link} href={`/${locale}`} underline="none">
              {dict.nav.home}
            </MuiLink>
            <MuiLink component={Link} href={`/${locale}/products`} underline="none">
              {dict.nav.products}
            </MuiLink>
            <MuiLink component={Link} href={`/${locale}/about`} underline="none">
              {dict.nav.about}
            </MuiLink>
            <MuiLink component={Link} href="/en" underline="none">
              EN
            </MuiLink>
            <MuiLink component={Link} href="/zh" underline="none">
              中文
            </MuiLink>
          </Stack>
        </Stack>
      </Box>

      <main>{children}</main>
    </Container>
  );
};

export default LangLayout;