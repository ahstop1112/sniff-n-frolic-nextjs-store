import { Locale } from "@/i18n/config";

export type NavNode = {
    label: string;
    href?: string;
    children?: NavNode[];
  };
  
export type TopNavItem = {
    label: string;
    href?: string;
    mega?: NavNode[]; 
};
  
export type HeaderNavProps = {
    locale: Locale;
    items: TopNavItem[];
  };