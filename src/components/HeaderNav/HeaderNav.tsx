"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { HeaderNavProps } from "./types";
import styles from "./HeaderNav.module.scss";

const HeaderNav = ({ locale, items }: HeaderNavProps) => {
    const [open, setOpen] = useState(true);
    
    // Level 2
    const [activeL2Idx, setActiveL2Idx] = useState<number | null>(null);
    // Level 3
    const [activeL3Idx, setActiveL3Idx] = useState(0);

    const zoneRef = useRef<HTMLDivElement>(null);
    const closeTimerRef = useRef<number | null>(null);

    const megaItem = useMemo(() => items.find((x) => x.mega?.length), [items]);
    const megaLabel = megaItem?.label ?? "Collection";
    const l2List = megaItem?.mega ?? [];
    const l3List = useMemo(() => {
        if (activeL2Idx === null) return [];
        return l2List[activeL2Idx]?.children ?? [];
      }, [l2List, activeL2Idx]);
      
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
        setOpen(true);
        }, 180);
    };

    const closeMenuNow = () => {
        clearCloseTimer();
        setOpen(false);
    };

    // click outside -> close
    useEffect(() => {
        const onDown = (e: MouseEvent) => {
        const t = e.target as Node;
        const inside = !!zoneRef.current?.contains(t);
        if (!inside) closeMenuNow();
        };

        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
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
        setActiveL2Idx(null);
        setActiveL3Idx(0);
      }, [open]);

    return (
        <div
            ref={zoneRef}
            className={styles.nav}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
        >
        <div className={styles.row}>
            {items.map((x) => {
            const isMega = !!x.mega?.length;

            if (!isMega) {
                return (
                <Link key={x.label} href={x.href ?? `/${locale}`} className={styles.link}>
                    {x.label}
                </Link>
                );
            }

            return (
                <button
                    key={x.label}
                    type="button"
                    className={clsx(styles.linkBtn, open && styles.active)}
                    onFocus={openMenu}
                    onClick={() => setOpen((v) => !v)} // optional click toggle
                    aria-expanded={open}
                    aria-haspopup="menu"
                >
                {x.label}
                <KeyboardArrowDownRoundedIcon className={clsx(styles.chev, open && styles.chevOpen)} />
                </button>
            );
            })}
        </div>

        {open ? (
            <div
                className={styles.panel}
                role="menu"
                aria-label={`${megaLabel} menu`}
                onMouseEnter={openMenu}
            >
                {/* L2 column */}
                <div className={styles.panel2}>
                    {l2List.map((l2, idx) => {
                    const active = idx === activeL2Idx;
                    const hasL3 = !!l2.children?.length;

                    return (
                        <div
                            key={l2.label}
                            className={clsx(styles.item, active && styles.itemActive)}
                            onMouseEnter={() => {
                                const hasChildren = !!l2.children?.length;
                                setActiveL2Idx(hasChildren ? idx : null);
                                setActiveL3Idx(0);
                            }}
                        >
                            <Link
                                href={l2.href ?? "#"}
                                className={styles.itemLink}
                                onClick={closeMenuNow}
                                role="menuitem"
                            >
                                <span>{l2.label}</span>
                                {hasL3 ? <ChevronRightRoundedIcon className={styles.rightIcon} /> : null}
                            </Link>
                        </div>
                    );
                    })}
                </div>
                    
                {/* L3 column */}
                    {hasL3 ? <div className={styles.colL3}>
                        {l3List.length ? (
                            l3List.map((l3, idx) => {
                                const active = idx === activeL3Idx;
                                return (
                                    <div
                                        key={l3.label}
                                        className={clsx(styles.subRow, active && styles.subRowActive)}
                                        onMouseEnter={() => setActiveL3Idx(idx)}
                                    >
                                        <Link
                                            href={l3.href ?? "#"}
                                            className={styles.itemLink}
                                            onClick={closeMenuNow}
                                            role="menuitem"
                                        >
                                            {l3.label}
                                        </Link>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={styles.emptyHint} />
                        )}
                    </div> : null}
            </div>
        ) : null}
        </div>
    );
};

export default HeaderNav;