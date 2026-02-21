export type RawNavNode = {
  label: string;
  href?: string;
  children?: RawNavNode[];
};

export type NavNode = {
  key?: string;
  label: string;
  href?: string;
  slug?: string;
  parent?: number;
  children?: NavNode[];
};

export type NavOpenState = {
  openL2?: string | null;
  openL3?: string | null;
};

export type NavActiveState = {
  activeL1?: string | null;
  activeL2?: string | null;
  activeL3?: string | null;
};

export type TopNavItem = {
  label: string;
  href?: string;
  children?: NavNode[];
};

export type HeaderNavProps = {
  items: TopNavItem[];
};
