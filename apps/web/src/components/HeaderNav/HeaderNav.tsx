"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/i18n/LocaleProvider";
import clsx from "clsx";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import type { NavNode } from "@/domains/nav/types";
import styles from "./HeaderNav.module.scss";

export type HeaderNavProps = {
  items: NavNode[];
};

const HeaderNav = ({ items }: HeaderNavProps) => {
  const { t } = useTranslation("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  // Level 2 /3 active (desktop hover)
  const [activeL2Key, setActiveL2Key] = useState<number | null>(null);
  const [activeL3Key, setActiveL3Key] = useState<number | null>(null);

  const zoneRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  // pick the first nav item that has children => mega root
  const megaRoot = useMemo(
    () => items.find((x) => (x.children?.length ?? 0) > 0) ?? null,
    [items],
  );
  const megaLabel = megaRoot?.label ? t(megaRoot.label) : t("nav.collection");
  const l2List = megaRoot?.children ?? [];

  const l3List = useMemo(() => {
    if (activeL2Key === null) return [];
    return l2List[activeL2Key]?.children ?? [];
  }, [l2List, activeL2Key]);

  const hasL3 = l3List.length > 0;

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const closeMenu = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 180);
  };

  const closeMenuNow = () => {
    clearCloseTimer();
    setOpen(false);
  };

  // click outside -> close
  useEffect(() => {
    const onDown = (e: Event) => {
      const target = e.target as Node | null;
      const inside = !!(target && zoneRef.current?.contains(target));
      if (!inside) closeMenuNow();
    };

    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, []);

  // ESC -> close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenuNow();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // open reset highlight
  useEffect(() => {
    if (!open) return;
    setActiveL2Key(null);
    setActiveL3Key(null);
  }, [open]);

  return (
    <div ref={zoneRef} className={styles.nav}>
      <div className={styles.row}>
        {items.map((x) => {
          const isMega = (x.children?.length ?? 0) > 0;

          if (!isMega) {
            return (
              <Link
                key={x.label}
                href={x.href ?? `/${locale}`}
                className={styles.link}
                onMouseEnter={closeMenuNow}
              >
                {t(x.label)}
              </Link>
            );
          }

          return (
            <div
              key={x.label}
              className={clsx(styles.linkBtn, open && styles.active)}
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
            >
              {/* Text = real link */}
              <Link
                href={x.href ?? `/${locale}/products`}
                className={styles.link}
              >
                {t(x.label)}
              </Link>

              {/* Icon = menu toggle only */}
              <button
                type="button"
                className={styles.iconBtn}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen((v) => !v);
                }}
                onFocus={openMenu}
              >
                <KeyboardArrowDownRoundedIcon
                  className={clsx(styles.chev, open && styles.chevOpen)}
                />
              </button>
            </div>
          );
        })}
      </div>

      {open && megaRoot ? (
        <div
          className={styles.panel}
          role="menu"
          aria-label={`${megaLabel} menu`}
          onMouseEnter={openMenu}
        >
          {/* L2 column */}
          <div className={styles.panel2}>
            {l2List.map((l2, idx) => {
              const active = idx === activeL2Key;
              const hasL3 = !!l2.children?.length;

              return (
                <div
                  key={l2.label}
                  className={clsx(styles.item, active && styles.itemActive)}
                  onMouseEnter={() => {
                    const hasChildren = !!l2.children?.length;
                    setActiveL2Key(hasChildren ? idx : null);
                    setActiveL3Key(0);
                  }}
                >
                  <Link
                    href={l2.href ?? "#"}
                    className={styles.itemLink}
                    onClick={closeMenuNow}
                    role="menuitem"
                  >
                    <span>{t(l2.label)}</span>
                    {hasL3 ? (
                      <ChevronRightRoundedIcon className={styles.rightIcon} />
                    ) : null}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* L3 column */}
          {hasL3 ? (
            <div className={styles.colL3}>
              {l3List.length ? (
                l3List.map((l3, idx) => {
                  const active = idx === activeL3Key;
                  return (
                    <div
                      key={l3.label}
                      className={clsx(
                        styles.subRow,
                        active && styles.subRowActive,
                      )}
                      onMouseEnter={() => setActiveL3Key(idx)}
                    >
                      <Link
                        href={l3.href ?? "#"}
                        className={styles.itemLink}
                        onClick={closeMenuNow}
                        role="menuitem"
                      >
                        {t(l3.label)}
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className={styles.emptyHint} />
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default HeaderNav;
