"use client";

import { useMemo, useState } from "react";
import { Box, Typography, Divider, TextField, Button } from "@mui/material";
import { useCart } from "@/context/CartContext";

type Props = {
  shippingFlatRate?: number; // default 16
  showCoupon?: boolean; // default true
};

const money = (n: number) => `CAD $${n.toFixed(2)}`;

const CheckoutOrderSummary = ({
  shippingFlatRate = 16,
  showCoupon = true,
}: Props) => {
  const { items, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");

  const calc = useMemo(() => {
    const shipping = shippingFlatRate;
    const gst = +(subtotal * 0.05).toFixed(2);
    const pst = +(subtotal * 0.07).toFixed(2);
    const total = +(subtotal + shipping + gst + pst).toFixed(2);
    return { shipping, gst, pst, total };
  }, [subtotal, shippingFlatRate]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Your order
      </Typography>

      {showCoupon ? (
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Coupon code"
            size="small"
          />
          <Button
            variant="contained"
            onClick={() => {
              // TODO: implement coupon apply (server-side)
              // for now just UI
            }}
            disabled={!coupon.trim()}
          >
            Apply
          </Button>
        </Box>
      ) : null}

      <Divider sx={{ mb: 2 }} />

      {/* Items */}
      <Box sx={{ display: "grid", gap: 2, mb: 2 }}>
        {items.map((it: any) => {
          const qty = Number(it.quantity || 0);
          const unit = Number(it.price ?? it.unitPrice ?? 0); // best-effort
          const lineTotal = unit ? unit * qty : 0;

          return (
            <Box
              key={`${it.id}-${it.variantKey ?? ""}`}
              sx={{
                display: "grid",
                gridTemplateColumns: "64px 1fr auto",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={it.image ?? it.imageUrl ?? it.thumbnail ?? ""}
                alt={it.name ?? "Item"}
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 1.5,
                  objectFit: "cover",
                  border: "1px solid rgba(0,0,0,0.12)",
                  backgroundColor: "rgba(0,0,0,0.04)",
                }}
              />

              <Box>
                <Typography variant="subtitle1" sx={{ lineHeight: 1.2 }}>
                  {it.name ?? "Item"}
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
                  {qty} × {unit ? money(unit) : "—"}
                </Typography>
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {unit ? money(lineTotal) : ""}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Totals */}
      <Box sx={{ display: "grid", gap: 1.25 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {money(subtotal)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">Shipping</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Flat rate: {money(calc.shipping)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">GST</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {money(calc.gst)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">PST</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {money(calc.pst)}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">TOTAL</Typography>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {money(calc.total)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutOrderSummary;
