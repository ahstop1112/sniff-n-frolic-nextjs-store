"use client";

import { useState, type FormEvent } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/i18n/config";

interface CheckoutPageClientProps {
  locale: Locale;
}

const CheckoutPageClient = ({ locale }: CheckoutPageClientProps) => {
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isZh = locale === "zh";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError(isZh ? "購物車暫時係空嘅。" : "Your cart is empty.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const payload = {
      locale,
      cartItems: items,
      billing: {
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        address_1: formData.get("address_1") as string,
        address_2: formData.get("address_2") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        postcode: formData.get("postcode") as string,
        country: formData.get("country") as string,
      },
    };

    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = await res.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error("Missing redirectUrl from checkout API");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        isZh
          ? "建立訂單時出現問題，請稍後再試。"
          : "There was a problem creating your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={600} mx="auto" mt={4} mb={6}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isZh ? "結帳" : "Checkout"}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        {isZh
          ? `小計：CAD $${subtotal.toFixed(2)}（實際金額以結帳頁面為準）`
          : `Subtotal: CAD $${subtotal.toFixed(
              2
            )} (final amount may vary on payment page).`}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            name="first_name"
            label={isZh ? "名" : "First name"}
            required
          />
          <TextField
            name="last_name"
            label={isZh ? "姓" : "Last name"}
            required
          />
        </Box>

        <Box sx={{ display: "grid", gap: 2, mb: 2 }}>
          <TextField
            name="email"
            type="email"
            label="Email"
            required
          />
          <TextField
            name="phone"
            label={isZh ? "電話" : "Phone"}
          />
          <TextField
            name="address_1"
            label={isZh ? "地址（第一行）" : "Address line 1"}
            required
          />
          <TextField
            name="address_2"
            label={isZh ? "地址（第二行，可選）" : "Address line 2 (optional)"}
          />
          <TextField
            name="city"
            label={isZh ? "城市" : "City"}
            required
          />
          <TextField
            name="state"
            label={isZh ? "省 / 州" : "State / Province"}
          />
          <TextField
            name="postcode"
            label={isZh ? "郵政編碼" : "Postal code"}
            required
          />
          <TextField
            name="country"
            label={isZh ? "國家" : "Country"}
            defaultValue="CA"
            required
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || items.length === 0}
        >
          {loading
            ? isZh
              ? "建立訂單中…"
              : "Creating order…"
            : isZh
            ? "前往付款頁完成結帳"
            : "Go to payment page"}
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutPageClient;