// src/components/MiniCart.tsx
"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
  Box,
  Typography,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/i18n/config";

interface MiniCartProps {
  locale: Locale;
}

export const MiniCart = ({ locale }: MiniCartProps) => {
  const { items, totalItems, subtotal } = useCart();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const currencyLabel = "CAD $";

  const cartLabel = locale === "zh" ? "購物車" : "Cart";
  const emptyLabel =
    locale === "zh" ? "購物車暫時係空嘅。" : "Your cart is currently empty.";
  const viewCartLabel = locale === "zh" ? "查看購物車" : "View cart";

  return (
    <>
      <IconButton
        aria-label={cartLabel}
        onClick={handleOpen}
        size="large"
        sx={{ ml: 1 }}
      >
        <Badge badgeContent={totalItems} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ px: 2, pt: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {cartLabel}
          </Typography>
        </Box>

        {items.length === 0 && (
          <MenuItem>
            <ListItemText primary={emptyLabel} />
          </MenuItem>
        )}

        {items.slice(0, 4).map((item) => (
          <MenuItem key={`${item.id}-${item.variantKey ?? ""}`}>
            <ListItemText
              primary={item.name}
              secondary={`${
                item.quantity
              } × ${currencyLabel}${item.price.toFixed(2)}`}
            />
          </MenuItem>
        ))}

        {items.length > 4 && (
          <MenuItem>
            <ListItemText
              primary={
                locale === "zh"
                  ? `⋯ 還有 ${items.length - 4} 件`
                  : `⋯ plus ${items.length - 4} more`
              }
            />
          </MenuItem>
        )}

        {items.length > 0 && (
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {locale === "zh" ? "小計：" : "Subtotal:"} {currencyLabel}
              {subtotal.toFixed(2)}
            </Typography>
            <Link
              href={`/${locale}/cart`}
              style={{ textDecoration: "none", width: "100%" }}
              onClick={handleClose}
            >
              <Button variant="contained" color="primary" fullWidth>
                {viewCartLabel}
              </Button>
            </Link>
          </Box>
        )}
      </Menu>
    </>
  );
};
