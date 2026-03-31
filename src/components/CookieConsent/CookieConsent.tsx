"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NextLink from "next/link";
import Image from "next/image";
import { Box, Button, Link as MuiLink, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { useLocale } from "@/i18n/LocaleProvider";
import styles from "./CookieConsent.module.scss";

const CookieConsent = () => {
    const locale = useLocale();
    const { t } = useTranslation("cookie");

    const [open, setOpen] = useState(false);
    const [viewPreferences, setViewPreferences] = useState(false);
    const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
    const [functionalOpen, setFunctionalOpen] = useState(false);
    const [statisticsOpen, setStatisticsOpen] = useState(false);
    const [marketingOpen, setMarketingOpen] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem("cookie-consent");

        if (!accepted) {
            const timer = setTimeout(() => {
                setOpen(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        window.localStorage.setItem("cookie-consent", "accepted");
        setOpen(false);
    };

    const handleDeny = () => {
        localStorage.setItem("cookie-consent", "denied");
        setOpen(false);
    }

    const handlePreference = () => setViewPreferences(true);

    const handleClose = () => setOpen(false);

    if (!open) return null;

    return (
        <div className={styles.overlay}>
            <Box className={styles.cookieBanner}>
                <div className={styles.header}>
                    <div className={styles.logoWrap}>
                        <Image
                            src="/images/logo_snf_s2.png"
                            alt="Sniff & Frolic"
                            width={100}
                            height={36}
                            className={styles.logo}
                        />
                    </div>
                    <Typography variant="h5" className={styles.title}>
                        {t("title")}
                    </Typography>
                    <button
                        type="button"
                        aria-label="Close cookie consent"
                        className={styles.closeButton}
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="inherit" />
                    </button>
                </div>

                <Typography variant="body1" className={styles.message}>
                    {t("messageLong")}
                </Typography>
                {viewPreferences && <div className={styles.preferencesContent}>
                    <div className={styles.section}>
                        <button type="button"
                            className={styles.sectionHeaderButton}
                            onClick={() => setFunctionalOpen((prev) => !prev)} >
                            <div className={styles.sectionHeaderLeft}>
                                <Typography variant="body1" className={styles.sectionTitle}> {t('functionalTitle')} </Typography>
                            </div>
                            <div className={styles.sectionHeaderRight}>
                                <span className={styles.activeLabel}> {t('alwaysActive')} </span>
                                {functionalOpen ? (<KeyboardArrowUpIcon className={styles.sectionIcon} />) : (<KeyboardArrowDownIcon className={styles.sectionIcon} />)}
                            </div>
                        </button>
                        {functionalOpen && (<Typography variant="body1" className={styles.sectionText}>{t('functionalDesc')}</Typography>)}
                    </div>
                    <div className={styles.section}>
                        <button type="button"
                            className={styles.sectionHeaderButton}
                            onClick={() => setStatisticsOpen((prev) => !prev)} >
                            <div className={styles.sectionHeaderLeft}>
                                <Typography variant="body1" className={styles.sectionTitle}> {t('statisticsTitle')} </Typography>
                            </div>
                            <div className={styles.sectionHeaderRight}>
                                <label className={styles.switch} onClick={(e) => e.stopPropagation()} >
                                    <input type="checkbox" checked={analyticsEnabled} onChange={(e) => setAnalyticsEnabled(e.target.checked)} />
                                    <span className={styles.slider} />
                                </label>
                                {statisticsOpen ? (<KeyboardArrowUpIcon className={styles.sectionIcon} />) : (<KeyboardArrowDownIcon className={styles.sectionIcon} />)}
                            </div>
                        </button>
                        {statisticsOpen && (<Typography variant="body1" className={styles.sectionText}> {t('statisticsDesc')} </Typography>)}
                    </div>
                    <div className={styles.section}>
                        <button type="button"
                            className={styles.sectionHeaderButton}
                            onClick={() => setMarketingOpen((prev) => !prev)} >
                            <div className={styles.sectionHeaderLeft}>
                                <Typography variant="body1" className={styles.sectionTitle}> {t('marketingTitle')} </Typography>
                            </div>
                            <div className={styles.sectionHeaderRight}>
                                <label className={styles.switch} onClick={(e) => e.stopPropagation()} >
                                    <input type="checkbox" checked={analyticsEnabled} onChange={(e) => setAnalyticsEnabled(e.target.checked)} />
                                    <span className={styles.slider} />
                                </label>
                                {marketingOpen ? (<KeyboardArrowUpIcon className={styles.sectionIcon} />) : (<KeyboardArrowDownIcon className={styles.sectionIcon} />)}
                            </div>
                        </button>
                        {marketingOpen && (<Typography variant="body1" className={styles.sectionText}> {t('marketingDesc')} </Typography>)}
                    </div>
                </div>}
                <div className={styles.actions}>
                    <Button
                        variant="contained"
                        className={styles.acceptButton}
                        onClick={handleAccept}
                    >
                        {t("acceptAll")}
                    </Button>

                    <Button
                        variant="outlined"
                        className={styles.secondaryButton}
                        onClick={handleDeny}
                    >
                        {t("denyAll")}
                    </Button>

                    <Button
                        variant="outlined"
                        className={styles.secondaryButton}
                        onClick={handlePreference}
                    >
                        {!viewPreferences ? t("viewPreferences") : t("savePreferences")}
                    </Button>
                </div>

                <div className={styles.links}>
                    <MuiLink
                        component={NextLink}
                        href={`/${locale}/cookie-policy`}
                        underline="hover"
                        className={styles.policyLink}
                    >
                        {t("cookiePolicy")}
                    </MuiLink>

                    <MuiLink
                        component={NextLink}
                        href={`/${locale}/privacy-policy`}
                        underline="hover"
                        className={styles.policyLink}
                    >
                        {t("privacyPolicy")}
                    </MuiLink>
                </div>
            </Box>
        </div>
    );
};

export default CookieConsent;