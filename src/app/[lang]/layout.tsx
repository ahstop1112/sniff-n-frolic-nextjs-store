// src/app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategories } from "@/lib/wooClient";
import I18nProvider from "@/i18n/I18nProvider";
import { CartProviderClient } from "@/components/Cart/CartProviderClient";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { ProductsProvider } from "@/context/ProductsContext";
import AppShell from "@/components/_layout/AppShell/AppShell";
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

  // ✅ Fetch categories once at layout level - cached for 1 hour
  const categories = await getCategories();

  return (
    <CartProviderClient>
      <I18nProvider locale={locale} dictionary={dictionary}>
        <CurrencyProvider>
          <CategoriesProvider categories={categories || []}>
            <ProductsProvider>
              <AppShell locale={locale}>
                <main>{children}</main>
              </AppShell>
            </ProductsProvider>
          </CategoriesProvider>
        </CurrencyProvider>
      </I18nProvider>
    </CartProviderClient>
  );
};

export default LangLayout;
