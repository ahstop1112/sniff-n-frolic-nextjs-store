import type { Locale } from "@/i18n/config";

export interface BreadcrumbItem {
    label?: string;
    href?: string;
  }
  
export interface BreadcrumbsNavProps {
    locale?: Locale;
    items?:  BreadcrumbItem[];
  }