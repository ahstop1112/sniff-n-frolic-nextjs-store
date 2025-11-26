// src/components/CartPageClient.tsx
"use client";

import Link from "next/link";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/i18n/config";

interface CartPageClientProps {
  locale: Locale;
}

const CartPageClient = ({ locale }: CartPageClientProps) => {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const currencyLabel = "CAD $";

  const title = locale === "zh" ? "購物車" : "Shopping Cart";
  const emptyMessage =
    locale === "zh"
      ? "購物車暫時係空嘅，可以去商品頁慢慢揀。"
      : "Your cart is empty. Go browse some goodies for your pet!";
  const continueLabel = locale === "zh" ? "繼續選購" : "Continue shopping";
  const clearLabel = locale === "zh" ? "清空購物車" : "Clear cart";
  const checkoutLabel =
    locale === "zh" ? "到 Sniff & Frolic 結帳" : "Checkout on Sniff & Frolic";

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>

      {items.length === 0 ? (
        <Box mt={2}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {emptyMessage}
          </Typography>
          <Link href={`/${locale}/products`} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              {continueLabel}
            </Button>
          </Link>
        </Box>
      ) : (
        <Box mt={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{locale === "zh" ? "商品" : "Product"}</TableCell>
                <TableCell align="right">
                  {locale === "zh" ? "單價" : "Price"}
                </TableCell>
                <TableCell align="right">
                  {locale === "zh" ? "數量" : "Qty"}
                </TableCell>
                <TableCell align="right">
                  {locale === "zh" ? "小計" : "Subtotal"}
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={`${item.id}-${item.variantKey ?? ""}`} hover>
                  <TableCell>
                    <Link
                      href={`/${locale}/products/${item.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="subtitle1">{item.name}</Typography>
                    </Link>
                    {item.variantKey && (
                      <Typography variant="body2" color="text.secondary">
                        {item.variantKey}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {currencyLabel}
                    {item.price.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      size="small"
                      value={item.quantity}
                      inputProps={{ min: 1, style: { textAlign: "right" } }}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          Number(e.target.value || 1),
                          item.variantKey
                        )
                      }
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {currencyLabel}
                    {(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="Remove item"
                      size="small"
                      onClick={() => removeItem(item.id, item.variantKey)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box
            mt={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Button variant="text" color="secondary" onClick={clearCart}>
              {clearLabel}
            </Button>

            <Box textAlign="right">
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {locale === "zh" ? "小計：" : "Subtotal:"} {currencyLabel}
                {subtotal.toFixed(2)}
              </Typography>

              {/* Demo：checkout link 去 Woo 主站 */}
              <Link
                href="https://sniffnfrolic.com/cart/"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="primary">
                  {checkoutLabel}
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CartPageClient;
