"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useLocale } from "@/i18n/LocaleProvider";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/currency";
import StepIndicator from "./StepIndicator";
import styles from "./Cart.module.scss";

const CartPageClient = () => {
  const locale = useLocale();
  const { t } = useTranslation("cart");

  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  const [coupon, setCoupon] = useState("");
  const [applying, setApplying] = useState(false);

  const handleDecrease = (id: number, qty: number, variantKey?: string) => {
    if (qty <= 1) return;
    updateQuantity(id, qty - 1, variantKey);
  };

  const handleIncrease = (id: number, qty: number, variantKey?: string) => {
    updateQuantity(id, qty + 1, variantKey);
  };

  const total = +(subtotal).toFixed(2);

  return (
    <Box maxWidth="lg" mx="auto" my={4}>
      {/* Step indicator */}
      <StepIndicator curStep="cart" />
      {items.length === 0 ? (
        <Typography variant="body1">{t(`emptyText`)}</Typography>
      ) : (
        <Grid container spacing={4}>
          {/* Left Product List */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card variant="outlined">
              <CardContent>
                <Grid
                  container
                  sx={{ mb: 2, display: { xs: "none", sm: "flex" } }}
                >
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="subtitle2">{t(`product`)}</Typography>
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Typography variant="subtitle2">{t(`price`)}</Typography>
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Typography variant="subtitle2">{t(`quantity`)}</Typography>
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Typography variant="subtitle2" align="right">
                      {t(`subtotal`)}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ mb: 2 }} />

                {/* Every Product */}
                {items.map((item) => {
                  const lineSubtotal = +(item.price * item.quantity).toFixed(2);
                  return (
                    <Box
                      key={`${item.id}-${item.variantKey ?? ""}`}
                      sx={{
                        mb: 2,
                        pb: 2,
                        borderBottom: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <Grid container alignItems="center" spacing={2}>
                        {/* 圖 + 名 */}
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Box display="flex" alignItems="center" gap={2}>
                            {/* 圖片 */}
                            {item.imageUrl && (
                              <Box
                                component="img"
                                src={item.imageUrl}
                                alt={item.name}
                                className={styles.productImage}
                              />
                            )}
                            <Box>
                              <Link
                                href={`/en/products/${item.slug}`}
                                style={{
                                  textDecoration: "none",
                                  color: "#063F53",
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontWeight: 600,
                                    mb: 0.5,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                  }}
                                >
                                  {item.name}
                                </Typography>
                              </Link>
                              <Button
                                size="small"
                                onClick={() =>
                                  removeItem(item.id, item.variantKey)
                                }
                                startIcon={<DeleteOutlineIcon />}
                                sx={{ mt: 0.5 }}
                              >
                                {t(`remove`)}
                              </Button>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid size={{ xs: 4, sm: 2 }}>
                         {formatPrice(item.price)}
                        </Grid>

                        <Grid size={{ xs: 4, sm: 2 }}>
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              border: "1px solid #ddd",
                              borderRadius: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDecrease(
                                  item.id,
                                  item.quantity,
                                  item.variantKey,
                                )
                              }
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Box
                              component="span"
                              sx={{
                                px: 1.5,
                                minWidth: 24,
                                textAlign: "center",
                              }}
                            >
                              {item.quantity}
                            </Box>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleIncrease(
                                  item.id,
                                  item.quantity,
                                  item.variantKey,
                                )
                              }
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Grid>

                        <Grid size={{ xs: 4, sm: 2 }}>
                          <Typography variant="body2" align="right">
                            {formatPrice(lineSubtotal)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}

                {/* Coupon + Clear Cart */}
                <Box
                  mt={3}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    gap: 2,
                    alignItems: { xs: "stretch", sm: "center" },
                  }}
                >
                  {/* Clear cart */}
                  <Button
                    variant="contained"
                    onClick={clearCart}
                  >
                    {t(`clear`)}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 2, textAlign: "right" }}
                >
                  {t(`total`)}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">{t(`subtotal`)}</Typography>
                  <Typography variant="body2">{formatPrice(subtotal)}</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {t(`total`)}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#e16849" }}
                  >
                    {items.length === 0
                      ? `${formatPrice(0)}`
                      : `${formatPrice(total)}`}
                  </Typography>
                </Box>

                <Link
                  href={`/${locale}/checkout`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "#e16849",
                      "&:hover": { bgcolor: "#c9563a" },
                      py: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    {t(`proceed`)}
                  </Button>
                </Link>

                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 1.5, color: "text.secondary" }}
                >
                  {t(`checkoutNote`)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CartPageClient;
