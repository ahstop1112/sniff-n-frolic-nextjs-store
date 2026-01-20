// src/app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import I18nProvider from "@/components/I18nProvider";
import { CartProviderClient } from "@/components/CartProviderClient";
import { CurrencyProvider } from "@/context/CurrencyContext";
import AppShell from "@/components/layout/AppShell/AppShell";
import "./globals.scss";

interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

const LangLayout = async ({ children, params }: LangLayoutProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;
  const dictionary = await getDictionary(locale);

  return (
    <CartProviderClient>
      <I18nProvider locale={locale} dictionary={dictionary}>
        <CurrencyProvider>
          <AppShell locale={locale} >
            <main>{children}</main>
          </AppShell>
        </CurrencyProvider>
      </I18nProvider>
    </CartProviderClient>
  );
};

export default LangLayout;
