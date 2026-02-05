"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, Fragment } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import type { Locale } from "@/i18n/config";
import type { NavNode } from "@/domains/nav/types";
import { useRunSearch } from "@/domains/search/useRunSearch";
import { findNavStateByPath } from "@/domains/nav/match";
import styles from "./MobileMenu.module.scss";

export type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  items: NavNode[];
  // if you want route matching to ignore locale prefix, pass your locale codes here
  localeCodes?: string[];
};

const MobileMenu = ({
  open,
  locale,
  items,
  onClose,
  localeCodes,
}: MobileMenuProps) => {
  const { t } = useTranslation("nav");
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const { runSearch } = useRunSearch({ locale, onClose });

  const [q, setQ] = useState("");
  const [openL1, setOpenL1] = useState<string | null>(null);
  const [openL2, setOpenL2] = useState<string | null>(null);
  const [openL3, setOpenL3] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const { open: nextOpen, active } = findNavStateByPath(items, pathname, {
    locales: localeCodes ?? [],
  });

  useEffect(() => {
    if (!open) return;
    onClose();
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!open) return;
    // ✅ route -> auto open corresponding level
    setOpenL1(active.activeL1 ?? null);
    setOpenL2(nextOpen.openL2 ?? null);
    setOpenL3(nextOpen.openL3 ?? null);
  }, [open, items, pathname, localeCodes]);

  const toggleL2 = (key: string) => {
    setOpenL2((prev) => (prev === key ? null : key));
    setOpenL3(null);
  };

  const toggleL3 = (key: string) =>
    setOpenL3((prev) => (prev === key ? null : key));

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="left"
      PaperProps={{ className: styles.paper }}
      ModalProps={{ keepMounted: true }}
    >
      <div className={styles.wrap}>
        {/* Header row */}
        <div className={styles.header}>
          <IconButton
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Close menu"
          >
            <CloseRoundedIcon />
          </IconButton>
        </div>

        {/* Search */}
        <div className={styles.search}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch(q);
            }}
            placeholder={t("searchPlaceholder")}
            className={styles.searchInput}
          />
          <SearchRoundedIcon
            className={styles.searchIcon}
            onClick={() => runSearch(q)}
          />
        </div>

        {/* Nav scroll area */}
        <div ref={scrollRef} className={styles.nav}>
          {/* Top links */}
          <List disablePadding className={styles.list}>
            {items.map((l1) => {
              const l1HasChildren = (l1.children?.length ?? 0) > 0;

              // L1 = link only
              if (!l1HasChildren) {
                return (
                  <ListItem key={l1.key} disablePadding>
                    <ListItemButton
                      component={Link}
                      href={l1.href ?? `/${locale}`}
                      onClick={onClose}
                      className={clsx(
                        styles.liBtn,
                        active.activeL1 === l1.key && styles.active,
                      )}
                    >
                      <ListItemText primary={t(l1.label)} />
                    </ListItemButton>
                  </ListItem>
                );
              }

              // L1 = group (Collection)
              const l1Expanded = openL1 === l1.key;
              const l2List = l1.children ?? [];

              return (
                <Fragment key={l1.key}>
                  <ListItem disablePadding>
                    <ListItemButton
                      className={clsx(
                        styles.liBtn,
                        active.activeL1 === l1.key && styles.active,
                      )}
                      onClick={() => {
                        const key = l1.key ?? null;
                        if (!key) return;
                        setOpenL1((prev) => (prev === key ? null : key));
                      }}
                      aria-expanded={l1Expanded}
                    >
                      <ListItemText primary={t(l1.label)} />
                      {l1Expanded ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={l1Expanded} timeout="auto" unmountOnExit>
                    <List disablePadding className={styles.subList}>
                      {l2List.map((l2) => {
                        const hasChildren = (l2.children?.length ?? 0) > 0;
                        const expanded = openL2 === l2.key;
                        return (
                          <Fragment key={l2.key}>
                            <ListItem disablePadding>
                              {hasChildren ? (
                                <ListItemButton
                                  onClick={() => {
                                    const key = l2.key ?? null;
                                    if (!key) return;
                                    toggleL2(key);
                                  }}
                                  className={clsx(
                                    styles.subLiBtn,
                                    active.activeL2 === l2.key && styles.active,
                                  )}
                                  aria-expanded={expanded}
                                >
                                  <ListItemText primary={t(l2.label)} />
                                  {expanded ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                              ) : (
                                <ListItemButton
                                  component={Link}
                                  href={l2.href ?? "#"}
                                  onClick={onClose}
                                  className={clsx(
                                    styles.subLiBtn,
                                    active.activeL2 === l2.key && styles.active,
                                  )}
                                >
                                  <ListItemText primary={t(l2.label)} />
                                </ListItemButton>
                              )}
                            </ListItem>
                            {hasChildren ? (
                              <Collapse
                                in={expanded}
                                timeout="auto"
                                unmountOnExit
                              >
                                <List
                                  disablePadding
                                  className={styles.subSubList}
                                >
                                  {(l2.children ?? []).map((l3) => {
                                    const l3HasChildren =
                                      (l3.children?.length ?? 0) > 0;
                                    const l3Expanded = openL3 === l3.key;

                                    return (
                                      <Fragment key={l3.key}>
                                        <ListItem disablePadding>
                                          {l3HasChildren ? (
                                            <ListItemButton
                                              className={clsx(
                                                styles.subSubLiBtn,
                                                active.activeL3 === l3.key &&
                                                  styles.active,
                                              )}
                                              component="button"
                                              onClick={() => {
                                                const key = l3.key ?? null;
                                                if (!key) return;
                                                toggleL3(key);
                                              }}
                                              aria-expanded={l3Expanded}
                                            >
                                              <ListItemText
                                                primary={t(l3.label)}
                                              />
                                              {l3Expanded ? (
                                                <ExpandLess />
                                              ) : (
                                                <ExpandMore />
                                              )}
                                            </ListItemButton>
                                          ) : (
                                            <ListItemButton
                                              className={clsx(
                                                styles.subSubLiBtn,
                                                active.activeL3 === l3.key &&
                                                  styles.active,
                                              )}
                                              component={Link}
                                              href={l3.href ?? "#"}
                                              onClick={onClose}
                                            >
                                              <ListItemText
                                                primary={t(l3.label)}
                                              />
                                            </ListItemButton>
                                          )}
                                        </ListItem>
                                      </Fragment>
                                    );
                                  })}
                                </List>
                              </Collapse>
                            ) : null}
                          </Fragment>
                        );
                      })}
                    </List>
                  </Collapse>
                </Fragment>
              );
            })}
          </List>
        </div>
        <Divider className={styles.divider} />
      </div>
    </Drawer>
  );
};

export default MobileMenu;
