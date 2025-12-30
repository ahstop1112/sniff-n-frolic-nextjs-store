// src/components/BreadcrumbsNav.tsx
import { Locale } from "@/i18n/config";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsNavProps {
  locale: Locale
  items: BreadcrumbItem[];
  hideProducts: any
}

const BreadcrumbsNav = ({ items, locale = "en", hideProducts = false }: BreadcrumbsNavProps) => {
  if (!items || items.length === 0) return null;
  let navItems = [
    { label: locale === "zh" ? "首頁" : "Home", href: locale === "zh" ? "/zh" : "/en" },
    { label: locale === "zh" ? "全部商品" : "Collection", href: `/${locale}/products` }
  ];
 navItems.push(...items);

  console.log(navItems);

  return (
    <Box component="nav" aria-label="Breadcrumb" sx={{ mb: 2, fontSize: 13 }}>
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        {navItems.map((item, index) => {
          const isLast = index === navItems.length - 1;
          console.log(item.label, isLast)
          return (
            <li
              key={`${item.label}-${index}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              {isLast}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: 13,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {item.label.replace("&amp;", "&")}
                  </Typography>
                </Link>
              ) : (
                <Typography
                  component="span"
                  sx={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "text.primary",
                  }}
                >
                  {item.label}
                </Typography>
              )}

              {/* separator */}
              {!isLast && (
                <Typography
                  component="span"
                  sx={{ mx: 0.75, fontSize: 13, color: "text.secondary" }}
                >
                  /
                </Typography>
              )}
            </li>
          );
        })}
      </ol>
    </Box>
  );
};

export default BreadcrumbsNav;
