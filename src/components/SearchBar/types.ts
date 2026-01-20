import type { Locale } from "@/i18n/config";

export type CatOption = { id: number | "all"; label: string; slug?: string };
export type PopularCategory = { label: string; href: string; imgSrc?: string; count?: number };

export type SearchOverlayProps = {
    open: boolean;
    onClose: () => void;
    locale: Locale;

    categories?: CatOption[]; // dropdown
    trending?: string[];
    popularCategories?: PopularCategory[];

    /** search result page path */
    searchPath?: string; // default `/${locale}/search`
};

export  type SearchBarProps = {
    locale: Locale;
    placeholder?: string;
    className?: string;
    /** route for search result page */
    searchPath?: string; // default: `/${locale}/search`
};