"use client";
import { useState, useMemo, type FormEvent } from "react";
import { Box, TextField, Typography, Button, Alert } from "@mui/material";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/i18n/config";
import StripeProvider from "./StripeProvider";
import CheckoutPaymentForm from "./CheckoutPaymentForm";

interface CheckoutPageClientProps {
  locale: Locale;
}

type ShippingPayload = {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone?: string;
};

const CheckoutPageClient = ({ locale }: CheckoutPageClientProps) => {
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  const isZh = locale === "zh";

  const cartItemsForServer = useMemo(
    () =>
      items.map((it: any) => ({
        productId: it.productId,
        variationId: it.variationId,
        quantity: it.quantity,
      })),
    [items]
  );

  const handleCreateIntent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError(isZh ? "購物車暫時係空嘅。" : "Your cart is empty.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const email = (formData.get("email") as string) || "";

    const shipping: ShippingPayload = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      phone: formData.get("phone") as string,
      address_1: formData.get("address_1") as string,
      address_2: formData.get("address_2") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postcode: formData.get("postcode") as string,
      country: formData.get("country") as string,
    };

    const payload = {
      locale,
      email,
      shipping,
      items: cartItemsForServer,
      shipping_method: "flat_rate",
    };

    try {
      setLoading(true);
      const res = await fetch("/api/checkout/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const raw = await res.text();
      let data: any = null;
      try {
        data = raw ? JSON.parse(raw) : null;
      } catch {
        data = { error: raw };
      }

      if (!res.ok) {
        throw new Error(data?.error || data?.message || `HTTP ${res.status}`);
      }

      if (!data?.clientSecret || !data?.paymentIntentId) {
        throw new Error("Missing clientSecret/paymentIntentId");
      }

      setClientSecret(data.clientSecret);
      setPaymentIntentId(data.paymentIntentId);
    } catch (err: any) {
      console.error(err);
      setError(
        isZh ? "" : "There was a problem creating your order. Please try again."
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

      {/* Step 1: collect shipping + create PI */}
      {!clientSecret ? (
        <Box component="form" onSubmit={handleCreateIntent}>
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
            <TextField name="email" type="email" label="Email" required />
            <TextField name="phone" label={isZh ? "電話" : "Phone"} />
            <TextField
              name="address_1"
              label={isZh ? "地址（第一行）" : "Address line 1"}
              required
            />
            <TextField
              name="address_2"
              label={
                isZh ? "地址（第二行，可選）" : "Address line 2 (optional)"
              }
            />
            <TextField name="city" label={isZh ? "城市" : "City"} required />
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
            disabled={loading || items.length === 0}
          >
            {loading
              ? isZh
                ? "準備付款中…"
                : "Preparing payment…"
              : isZh
              ? "下一步：付款"
              : "Next: Pay"}
          </Button>
        </Box>
      ) : (
        // Step 2: mount Stripe Elements and confirm payment
        <StripeProvider clientSecret={clientSecret} locale={locale}>
          <CheckoutPaymentForm
            locale={locale}
            paymentIntentId={paymentIntentId!}
            onError={(msg) => setError(msg)}
          />
        </StripeProvider>
      )}
    </Box>
  );
};

export default CheckoutPageClient;
