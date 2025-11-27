// src/components/MiniCart.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconButton,
  Badge,
  Drawer,
  Box,
  Typography,
  Divider,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/i18n/config";

interface MiniCartProps {
  locale: Locale;
}

export const MiniCart = ({ locale }: MiniCartProps) => {
  const { items, subtotal, totalItems, updateQuantity, removeItem } = useCart();
  const [open, setOpen] = useState(false);

  const currencyLabel = "CAD $";

  const cartTitle = locale === "zh" ? "購物車" : "Cart";
  const emptyText =
    locale === "zh"
      ? "購物車暫時係空嘅。"
      : "Your cart is currently empty.";
  const viewCartLabel = locale === "zh" ? "查看購物車" : "View cart";
  const checkoutLabel = locale === "zh" ? "前往結帳" : "Checkout";
  const subtotalLabel = locale === "zh" ? "小計：" : "Subtotal:";

  const toggle = (value: boolean) => () => setOpen(value);

  return (
    <>
      {/* Header 上面個 icon */}
      <IconButton aria-label={cartTitle} onClick={toggle(true)} size="large">
        <Badge badgeContent={totalItems} color="primary">
          <ShoppingBagOutlinedIcon />
        </Badge>
      </IconButton>

      {/* Side cart drawer */}
      <Drawer anchor="right" open={open} onClose={toggle(false)}>
        <Box
          sx={{
            width: 360,
            maxWidth: "100vw",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#fff7ef", // 類似你而家個淡米色底
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ letterSpacing: 1, fontWeight: 600 }}
            >
              {cartTitle.toUpperCase()}
            </Typography>
            <IconButton onClick={toggle(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Items list */}
          <Box sx={{ flexGrow: 1, overflowY: "auto", px: 2, py: 1 }}>
            {items.length === 0 ? (
              <Typography variant="body2" sx={{ mt: 2 }}>
                {emptyText}
              </Typography>
            ) : (
              <List disablePadding>
                {items.map((item) => (
                  <ListItem
                    key={`${item.id}-${item.variantKey ?? ""}`}
                    alignItems="flex-start"
                    sx={{ py: 1.5 }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        src={item.imageUrl}
                        alt={item.name}
                        sx={{ width: 64, height: 64, mr: 1.5 }}
                      />
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Link
                          href={`/en/products/${item.slug}`} // 如果要 locale 可以改 `${locale}`
                          style={{
                            textDecoration: "none",
                            color: "#063F53",
                            fontWeight: 600,
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{
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
                      }
                      secondary={
                        <Box
                          sx={{
                            mt: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {/* 數量輸入 */}
                          <TextField
                            type="number"
                            size="small"
                            value={item.quantity}
                            inputProps={{
                              min: 1,
                              style: { textAlign: "center", width: 40 },
                            }}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                Number(e.target.value || 1),
                                item.variantKey
                              )
                            }
                          />
                          <Typography variant="body2">×</Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#b45b33", fontWeight: 600 }}
                          >
                            {currencyLabel} {item.price.toFixed(2)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Footer：Subtotal + Buttons */}
          <Box sx={{ mt: "auto", px: 2, pb: 2 }}>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {subtotalLabel}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "#b45b33" }}
              >
                {currencyLabel} {subtotal.toFixed(2)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href={`/${locale}/cart`}
                style={{ textDecoration: "none" }}
                onClick={toggle(false)}
              >
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: "#f2d2bd",
                    color: "#b45b33",
                    fontWeight: 600,
                  }}
                >
                  {viewCartLabel.toUpperCase()}
                </Button>
              </Link>

              {/* Demo：直接 link 去 Woo checkout */}
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
                    fontWeight: 600,
                  }}
                >
                  {checkoutLabel}
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};