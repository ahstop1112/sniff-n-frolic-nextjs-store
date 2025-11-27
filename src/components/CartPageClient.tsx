"use client";
import { useState } from "react";
import type { FormEvent } from "react";
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
import type { Locale } from "@/i18n/config";
import { useCart } from "@/context/CartContext";

interface CartPageClientProps {
  locale: Locale;
}

const CartPageClient = ({ locale }: CartPageClientProps) => {
  const {
    items,
    subtotal,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [coupon, setCoupon] = useState("");
  const [applying, setApplying] = useState(false);

  const isZh = locale === "zh";

  // Demo 用：簡單 BC 稅 + flat shipping，可之後改成從 Woo 拉
  const shipping = items.length > 0 ? 15 : 0; // CAD 15 flat
  const gst = +(subtotal * 0.05).toFixed(2);
  const pst = +(subtotal * 0.07).toFixed(2);
  const total = +(subtotal + shipping + gst + pst).toFixed(2);

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setApplying(true);
    // TODO: Call backend / Woo API 驗證 coupon
    setTimeout(() => {
      setApplying(false);
      // 你可以喺呢度加 snackbar / 提示
      console.log("Coupon apply demo:", coupon);
    }, 500);
  };

  const handleDecrease = (id: number, qty: number, variantKey?: string) => {
    if (qty <= 1) return;
    updateQuantity(id, qty - 1, variantKey);
  };

  const handleIncrease = (id: number, qty: number, variantKey?: string) => {
    updateQuantity(id, qty + 1, variantKey);
  };

  const labelShoppingCart = isZh ? "購物車" : "Shopping Cart";
  const labelCheckout = isZh ? "結帳" : "Checkout";
  const labelOrderStatus = isZh ? "訂單狀態" : "Order Status";
  const labelProduct = isZh ? "產品" : "Product";
  const labelPrice = isZh ? "價格" : "Price";
  const labelQuantity = isZh ? "數量" : "Quantity";
  const labelSubtotal = isZh ? "小計" : "Subtotal";
  const labelCartTotals = isZh ? "購物車總計" : "Cart Totals";
  const labelShipping = isZh ? "運費" : "Shipping";
  const labelGST = "GST";
  const labelPST = "PST";
  const labelTotal = isZh ? "總計" : "TOTAL";
  const labelCoupon = isZh ? "優惠碼" : "Coupon code";
  const labelApply = isZh ? "OK" : "OK";
  const labelClear = isZh ? "清空購物車" : "Clear Shopping Cart";
  const labelProceed = isZh ? "前往結帳" : "Proceed To Checkout";
  const emptyText = isZh
    ? "購物車暫時係空嘅。"
    : "Your cart is currently empty.";

  return (
    <Box maxWidth="lg" mx="auto" my={4}>
      {/* Step indicator */}
      <Box mb={3}>
        <Typography variant="subtitle2" sx={{ letterSpacing: 1, mb: 1 }}>
          1 {labelShoppingCart.toUpperCase()}
          <span style={{ opacity: 0.4 }}> &nbsp;—&nbsp; 2 {labelCheckout.toUpperCase()} &nbsp;—&nbsp; 3 {labelOrderStatus.toUpperCase()}</span>
        </Typography>
        <Divider />
      </Box>

      {items.length === 0 ? (
        <Typography variant="body1">{emptyText}</Typography>
      ) : (
        <Grid container spacing={4}>
          {/* 左邊：商品列表 */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card variant="outlined">
              <CardContent>
                {/* 表頭 */}
                <Grid container sx={{ mb: 2, display: { xs: "none", sm: "flex" } }}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="subtitle2">{labelProduct}</Typography>
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Typography variant="subtitle2">{labelPrice}</Typography>
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Typography variant="subtitle2">{labelQuantity}</Typography>
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Typography variant="subtitle2" align="right">
                      {labelSubtotal}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ mb: 2 }} />

                {/* 每件商品 */}
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
                                sx={{
                                  width: 64,
                                  height: 64,
                                  borderRadius: 1,
                                  objectFit: "cover",
                                  flexShrink: 0,
                                }}
                              />
                            )}
                            {/* 名稱 + remove */}
                            <Box>
                              <Link
                                href={`/en/products/${item.slug}`}
                                style={{ textDecoration: "none", color: "#063F53" }}
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
                                {isZh ? "移除" : "Remove"}
                              </Button>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid size={{ xs: 4, sm: 2 }}>
                          <Typography variant="body2">
                            CAD ${item.price.toFixed(2)}
                          </Typography>
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
                                  item.variantKey
                                )
                              }
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Box
                              component="span"
                              sx={{ px: 1.5, minWidth: 24, textAlign: "center" }}
                            >
                              {item.quantity}
                            </Box>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleIncrease(
                                  item.id,
                                  item.quantity,
                                  item.variantKey
                                )
                              }
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Grid>

                        {/* 行小計 */}
                        <Grid size={{ xs: 4, sm: 2 }}>
                          <Typography variant="body2" align="right">
                            CAD ${lineSubtotal.toFixed(2)}
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
                  {/* Coupon */}
                  <Box
                    component="form"
                    onSubmit={handleApplyCoupon}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <TextField
                      size="small"
                      label={labelCoupon}
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      disabled={applying || !coupon}
                    >
                      {labelApply}
                    </Button>
                  </Box>

                  {/* Clear cart */}
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={clearCart}
                    sx={{
                      bgcolor: "#063F53",
                      color: "#fff",
                      "&:hover": { bgcolor: "#042a35" },
                    }}
                  >
                    {labelClear}
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
                  {labelCartTotals}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">{labelSubtotal}</Typography>
                  <Typography variant="body2">
                    CAD ${subtotal.toFixed(2)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">{labelShipping}</Typography>
                  <Typography variant="body2">
                    {items.length === 0 ? "-" : `CAD $${shipping.toFixed(2)}`}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">{labelGST}</Typography>
                  <Typography variant="body2">
                    {items.length === 0 ? "-" : `CAD $${gst.toFixed(2)}`}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2">{labelPST}</Typography>
                  <Typography variant="body2">
                    {items.length === 0 ? "-" : `CAD $${pst.toFixed(2)}`}
                  </Typography>
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
                    {labelTotal}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "#e16849" }}
                  >
                    {items.length === 0 ? "CAD $0.00" : `CAD $${total.toFixed(2)}`}
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
                    {labelProceed}
                  </Button>
                </Link>

                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 1.5, color: "text.secondary" }}
                >
                  {isZh
                    ? "實際金額可能會因稅項及優惠碼略有調整，以結帳頁為準。"
                    : "Final amount may adjust slightly at checkout based on taxes and coupons."}
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