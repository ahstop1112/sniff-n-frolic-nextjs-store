// src/app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Container } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { CartProviderClient } from "@/components/CartProviderClient";
import { CurrencyProvider } from "@/context/CurrencyContext";
import AppShell from "@/components/layout/AppShell";
import "@/styles/globals.scss";

interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

interface FooterProps {
  locale: Locale;
}

const LangLayout = async ({ children, params }: LangLayoutProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;

  return (
    <CartProviderClient>
      <AppShell locale={locale} >
        <main>
        <CurrencyProvider>{children}</CurrencyProvider>
        </main>
      </AppShell>
    </CartProviderClient>
  );
};

export default LangLayout;
