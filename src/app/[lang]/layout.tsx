// src/app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategories } from "@/lib/storeApi";
import I18nProvider from "@/i18n/I18nProvider";
import { requireLocale } from "@/i18n/requireLocale";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { CartProviderClient } from "@/components/Cart/CartProviderClient";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { ProductsProvider } from "@/context/ProductsContext";
import AppShell from "@/components/_layout/AppShell/AppShell";
import AIChatbot from "@/components/AIChatbot";
import { LangParamsObj } from "@/types/next";
import "./globals.scss";

interface LangLayoutProps {
  children: ReactNode;
  params: LangParamsObj;
}

const LangLayout = async ({ children, params }: LangLayoutProps) => {
  const locale = await requireLocale(params);
  const dictionary = await getDictionary(locale);
  // ✅ Fetch categories once at layout level - cached for 1 hour
  const categories = await getCategories();

  return (
    <CartProviderClient>
      <I18nProvider locale={locale} dictionary={dictionary}>
        <LocaleProvider locale={locale}>
          <CurrencyProvider>
            <CategoriesProvider categories={categories || []}>
              <ProductsProvider>
                <AppShell>
                  <main>{children}</main>
                  <AIChatbot />
                </AppShell>
              </ProductsProvider>
            </CategoriesProvider>
          </CurrencyProvider>
        </LocaleProvider>
      </I18nProvider>
    </CartProviderClient>
  );
};

export default LangLayout;
