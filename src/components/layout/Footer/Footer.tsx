'use client';

import { useEffect, useMemo, useState } from "react";
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
import { getTopLevelCategories } from "@/utils/category";
import { FooterProps } from "./types";
import styles from "./Footer.module.scss";

const Footer = ({ locale }:FooterProps) => {
  const [topLevelCategories, setTopLevelCategories] = useState<WooCategory[]>([]);
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
    <Box
      component="footer"
      className={styles.footerSection}
    >
      <Container className={styles.footer}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 6, sm: 6, md: 4 }} className={styles.footerMenu}>
           <p> <b>📬 Subscribe to Fei Fei’s Newsletter for exclusive deals & new arrivals!</b></p>
           <TextField
              type="email"
              placeholder="your@email.com"
              size="small"
              fullWidth
              variant="outlined"
              className={styles.emailInput}
            />
            <Button
              variant="contained"
              size="small"
              >
                Subscribe
              </Button>
            <p><h6>Need Help?</h6>
            <a href="mailto:woff@sniffnfrolic.com">woff@sniffnfrolic.com</a></p>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 2 }} className={styles.footerMenu}>
            <h5>Categories</h5>
            <Box className={styles.link} >
              {loadingCats && (
                <Typography variant="caption" color="text.secondary">
                  Loading...
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
                  All Products
                </MuiLink>
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 2 }} className={styles.footerMenu}>
            <h5>Information</h5>
            <Box className={styles.link}>
              <MuiLink component={NextLink} href={`/${locale}/sniff-frolic-story`}>Our Story</MuiLink>
              <MuiLink component={NextLink} href={`/${locale}/how-to-buy`}>How To Buy</MuiLink>
              <MuiLink component={NextLink} href={`/${locale}/faq`}>FAQ</MuiLink>
              <MuiLink component={NextLink} href={`/${locale}/contact-us`}>Contact Us</MuiLink>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }} className={styles.footerMenu}>
            <h5>Policy</h5>
            <Box className={styles.link}>
              <MuiLink component={NextLink} href={`/${locale}/refund-return-policy`}>Refund & Return Policy</MuiLink>
              <MuiLink component={NextLink} href={`/${locale}/shipping-policy`}>Shipping Policy</MuiLink>
              <MuiLink component={NextLink} href={`/${locale}/terms-and-conditions`}>Terms & Condition</MuiLink>
              <MuiLink component={NextLink} href={`/${locale}/privacy-policy`}>Privacy Policy</MuiLink>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box className={styles.copyright}>
          <p>
            Copyright © {year} Sniff & Frolic, For furry friends & the hoomans they love =)
          </p>
      </Box>
    </Box>
  );
};

export default Footer;