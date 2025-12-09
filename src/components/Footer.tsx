"use client";
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
import { useMemo } from "react";
import { getCategories } from "@/lib/wooClient";

const Footer = async () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  const allCats = await getCategories();
  const topLevelCategories = allCats
    .filter((c) => c.parent === 0)
    .sort((a, b) => a.id - b.id);

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        borderTop: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* 左邊：Logo + 簡介 */}
          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Sniff & Frolic
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Cozy adventures for dogs & hoomans.
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography
              variant="caption"
              sx={{
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              Shop
            </Typography>
            <Box
              sx={{
                mt: 1.5,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              {topLevelCategories.map((cat) => (
                <MuiLink
                  key={cat.id}
                  component={NextLink}
                  href={`/category/${cat.slug}`} // 按你而家嘅路由改
                  underline="hover"
                  color="text.primary"
                  sx={{ fontSize: 14 }}
                >
                  {cat.name}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* 中間：導航 2 */}
          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography
              variant="caption"
              sx={{
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              About
            </Typography>
            <Box
              sx={{
                mt: 1.5,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <MuiLink
                component={NextLink}
                href="/about"
                underline="hover"
                color="text.primary"
                sx={{ fontSize: 14 }}
              >
                About Us
              </MuiLink>
              <MuiLink
                component={NextLink}
                href="/faq"
                underline="hover"
                color="text.primary"
                sx={{ fontSize: 14 }}
              >
                FAQ
              </MuiLink>
              <MuiLink
                component={NextLink}
                href="/contact"
                underline="hover"
                color="text.primary"
                sx={{ fontSize: 14 }}
              >
                Contact
              </MuiLink>
            </Box>
          </Grid>

          {/* 右邊：訂閱 + Social */}
          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography
              variant="caption"
              sx={{
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              Stay in touch
            </Typography>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ mt: 1.5, display: "flex", gap: 1, maxWidth: 320 }}
            >
              <TextField
                type="email"
                placeholder="your@email.com"
                size="small"
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiInputBase-input": { fontSize: 14 },
                }}
              />
              <Button
                variant="contained"
                size="small"
                sx={{
                  fontSize: 12,
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </Button>
            </Box>

            <Box
              sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 1 }}
            >
              <Typography variant="caption" color="text.secondary">
                Follow:
              </Typography>
              <MuiLink
                component={NextLink}
                href="https://www.instagram.com/sniffnfrolic"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="text.primary"
                sx={{ fontSize: 12 }}
              >
                Instagram
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* 最底 bar */}
      <Box sx={{ borderTop: 1, borderColor: "divider", mt: 2 }}>
        <Container
          maxWidth="lg"
          sx={{
            py: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © {year} Sniff & Frolic. All rights reserved.
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <MuiLink
              component={NextLink}
              href="/privacy"
              underline="hover"
              color="text.secondary"
              sx={{ fontSize: 12 }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              component={NextLink}
              href="/terms"
              underline="hover"
              color="text.secondary"
              sx={{ fontSize: 12 }}
            >
              Terms &amp; Conditions
            </MuiLink>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
