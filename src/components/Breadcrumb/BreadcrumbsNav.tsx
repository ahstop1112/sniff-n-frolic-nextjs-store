// src/components/BreadcrumbsNav.tsx
import { Box } from "@mui/material";
import Link from "next/link";
import { BreadcrumbsNavProps, BreadcrumbItem } from "./types";
import styles from './Breadcrumb.module.scss'

const BreadcrumbsNav = ({ items = [], locale = "en" }: BreadcrumbsNavProps) => {
  const navItems: BreadcrumbItem[] = [
    { label: locale === "zh" ? "首頁" : "Home", href: locale === "zh" ? "/zh" : "/en" },
    { label: locale === "zh" ? "全部商品" : "Collection", href: `/${locale}/products` },
    ...items
  ];

  return (
    <Box component="nav" aria-label="Breadcrumb" className={styles.breadcrumb}>
      <ol>
        {navItems.map((item, index) => {
          const isLast = index === navItems.length - 1;
          return (
            <li key={`${item.label}-${index}`}>
              {item.href && item.label && !isLast ? (
                <Link href={item.href}>
                    {item.label.replace("&amp;", "&")}
                </Link>
              ) : (
                <span> {item.label} </span>
              )}

              {/* separator */}
              {!isLast && (
                <span className={styles.seperator}>/</span>
              )}
            </li>
          );
        })}
      </ol>
    </Box>
  );
};

export default BreadcrumbsNav;
