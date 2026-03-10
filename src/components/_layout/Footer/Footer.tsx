"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import NextLink from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";
import type { WooCategory } from "@/lib/wooClient";
import { useLocale } from "@/i18n/LocaleProvider";
import { getTopLevelCategories } from "@/utils/category";
import styles from "./Footer.module.scss";

const Footer = () => {
  const { t } = useTranslation("footer");
  const locale = useLocale();
  const [topLevelCategories, setTopLevelCategories] = useState<WooCategory[]>(
    [],
  );
  const [loadingCats, setLoadingCats] = useState(false);

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCats(true);
        const res = await fetch("/api/categories", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = (await res.json()) as WooCategory[];
        setTopLevelCategories(getTopLevelCategories(data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCats(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <Box component="footer" className={styles.footerSection}>
      <Container className={styles.footer}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 6, sm: 6, md: 4 }} className={styles.footerMenu}>
            <p>
              {" "}
              <b> {t("subscribeText")} </b>
            </p>
            <TextField
              type="email"
              placeholder="your@email.com"
              size="small"
              fullWidth
              variant="outlined"
              className={styles.emailInput}
            />
            <Button variant="contained" size="small">
              {t("subscribe")}
            </Button>
            <p>
              <b>{t("needHelp")}</b><br/>
              <a href="mailto:woff@sniffnfrolic.com">woff@sniffnfrolic.com</a>
            </p>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 2 }} className={styles.footerMenu}>
            <h5>{t("categories")}</h5>
            <Box className={styles.link}>
              {loadingCats && (
                <Typography variant="caption" color="text.secondary">
                  {t("loading")}...
                </Typography>
              )}

              {!loadingCats &&
                topLevelCategories.map((cat) => (
                  <MuiLink
                    key={cat.id}
                    component={NextLink}
                    href={`/${locale}/category/${cat.slug}`} // 依你路由改
                    underline="hover"
                    color="text.primary"
                    sx={{ fontSize: 14 }}
                  >
                    {cat.name}
                  </MuiLink>
                ))}

              {!loadingCats && topLevelCategories.length === 0 && (
                <MuiLink
                  component={NextLink}
                  href="/products"
                  underline="hover"
                  color="text.primary"
                  sx={{ fontSize: 14 }}
                >
                  {t("allProducts")}
                </MuiLink>
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 2 }} className={styles.footerMenu}>
            <h5>{t("information")}</h5>
            <Box className={styles.link}>
              <MuiLink
                component={NextLink}
                href={`/${locale}/sniff-frolic-story`}
              >
                {t("outStory")}
              </MuiLink>
              <MuiLink component={NextLink} href={`/${locale}/how-to-buy`}>
                {t("howToBuy")}
              </MuiLink>
              <MuiLink component={NextLink} href={`/${locale}/faq`}>
                {t('faq')}
              </MuiLink>
              <MuiLink component={NextLink} href={`/${locale}/contact-us`}>
                {t("contactUs")}
              </MuiLink>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }} className={styles.footerMenu}>
            <h5>{t("policy")}</h5>
            <Box className={styles.link}>
              <MuiLink
                component={NextLink}
                href={`/${locale}/refund-return-policy`}
              >
                {t("refundReturnPolicy")}
              </MuiLink>
              <MuiLink component={NextLink} href={`/${locale}/shipping-policy`}>
                {t("shippingPolicy")}
              </MuiLink>
              <MuiLink
                component={NextLink}
                href={`/${locale}/terms-and-conditions`}
              >
                {t("termsConditions")}
              </MuiLink>
              <MuiLink component={NextLink} href={`/${locale}/privacy-policy`}>
                {t("privacyPolicy")}
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box className={styles.copyright}>
        <p>
          {t("copyright")}
        </p>
      </Box>
    </Box>
  );
};

export default Footer;
