"use client";
import { Box } from "@mui/material";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { BreadcrumbsNavProps, BreadcrumbItem } from "./types";
import styles from "./Breadcrumb.module.scss";
import { useTranslation } from "react-i18next";

const BreadcrumbsNav = ({ items = [], isProduct = true }: BreadcrumbsNavProps) => {
  const { t } = useTranslation("nav")
  const locale = useLocale();
  const navItems: BreadcrumbItem[] = [
    {
      label: t("home"),
      href: locale === "zh" ? "/zh" : "/en",
    },
  ];
  if (isProduct) {
    navItems.push({
      label: t("collection"),
      href: `/${locale}/products`,
    });
  }
  navItems.push(...items);

  return (
    <Box component="nav" aria-label="Breadcrumb" className={styles.breadcrumb}>
      <ol>
        {navItems.map((item, index) => {
          const isLast = index === navItems.length - 1;
          return (
            <li key={`${item.label}-${index}`}>
              {item.href && item.label && !isLast ? (
                <Link href={item.href}>{item.label.replace("&amp;", "&")}</Link>
              ) : (
                <span> {item.label} </span>
              )}

              {/* separator */}
              {!isLast && <span className={styles.seperator}>/</span>}
            </li>
          );
        })}
      </ol>
    </Box>
  );
};

export default BreadcrumbsNav;
