import type { getDictionary } from "@/i18n/dictionaries";

type Dict = Awaited<ReturnType<typeof getDictionary>>;
type CommonDict = Dict["common"];

export interface SimpleCategory {
  id: number;
  name: string;
  slug: string;
}

export interface SimpleTerm{
  id: number;
  name: string;
  slug: string;
}

export interface ProductsFilterSidebarClientProps {
  locale: "en" | "zh";
  categories: SimpleCategory[];
  colors?: SimpleTerm[];
  common: CommonDict
}