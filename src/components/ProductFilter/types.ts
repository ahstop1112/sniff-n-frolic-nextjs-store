import type { getDictionary } from "@/i18n/dictionaries";
import { CategorySliderItem } from "../Category/types";

type Dict = Awaited<ReturnType<typeof getDictionary>>;
type CommonDict = Dict["common"];

export interface SimpleCategory {
  id: string;
  name: string;
  slug: string;
}

export interface SimpleTerm {
  id: string;
  name: string;
  slug: string;
}

export interface ProductsFilterProps {
  categories: CategorySliderItem[];
  colors?: SimpleTerm[];
  common: CommonDict;
}
