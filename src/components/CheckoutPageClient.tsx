"use client";
import { useState, useMemo, type FormEvent } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  Divider,
} from "@mui/material";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/i18n/config";
import { cartItemsToServerItems } from "@/lib/cartToServer";

import StripeProvider from "./StripeProvider";
import CheckoutPaymentForm from "./CheckoutPaymentForm";
import CheckoutOrderSummary from "./CheckoutOrderSummary";

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
  const { items, hydrated } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  const [orderId, setOrderId] = useState<number | null>(null);
  const [pricing, setPricing] = useState<any | null>(null);

  const isZh = locale === "zh";

  const cartItemsForServer = useMemo(
    () => cartItemsToServerItems(items),
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

    const shipping: ShippingPayload & { email: string } = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email,
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
      cartItems: cartItemsForServer,
      shipping_method: "flat_rate",
    };

    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.error || json?.message || `HTTP ${res.status}`);
      }

      const data = json?.data ?? json;
      if (!data?.clientSecret || !data?.paymentIntentId) {
        throw new Error("Missing clientSecret/paymentIntentId");
      }

      setClientSecret(data.clientSecret);
      setPaymentIntentId(data.paymentIntentId);

      setOrderId(Number(data.orderId));
      setPricing(data.pricing);
    } catch (err: any) {
      console.error(err);
      setError(
        isZh
          ? "建立訂單／付款失敗，請再試一次。"
          : "There was a problem creating your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mx="auto" mt={4} mb={6}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isZh ? "結帳" : "Checkout"}
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
          mb: 2,
        }}
      >
        {/* LEFT: form */}
        <Box>
          <Typography variant="h6">
            {isZh ? "運送資料" : "Shipping Information"}
          </Typography>
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
              disabled={!hydrated || loading || items.length === 0}
            >
              {loading
                ? isZh
                  ? "準備付款中…"
                  : "Preparing payment…"
                : isZh
                ? clientSecret
                  ? "已準備好，可付款"
                  : "準備付款"
                : clientSecret
                ? "Ready — Pay on the right"
                : "Prepare payment"}
            </Button>

            {clientSecret ? (
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 1, opacity: 0.7 }}
              >
                {isZh
                  ? "右邊已顯示付款方式，請完成付款。"
                  : "Payment methods are ready on the right."}
              </Typography>
            ) : null}
          </Box>
        </Box>
        {/* RIGHT: payment */}
        <Box
          sx={{
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 2,
            p: 3,
            position: { md: "sticky" },
            top: { md: 24 },
          }}
        >
          <CheckoutOrderSummary pricing={pricing} shippingFlatRate={16} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            {isZh ? "付款方式" : "Payment"}
          </Typography>
          {!clientSecret ? (
            <Box sx={{ opacity: 0.75 }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {isZh
                  ? "請先喺左邊填資料，然後按「準備付款」。"
                  : "Fill in the form on the left, then click “Prepare payment”."}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">
                {isZh
                  ? "完成準備後，呢度會出現信用卡／Apple Pay 等付款選項。"
                  : "After preparing, card / Apple Pay options will appear here."}
              </Typography>
            </Box>
          ) : (
            // Step 2: mount Stripe Elements and confirm payment
            <StripeProvider clientSecret={clientSecret} locale={locale}>
              <CheckoutPaymentForm
                locale={locale}
                orderId={orderId!}
                pricing={pricing!}
                paymentIntentId={paymentIntentId!}
                onError={(msg) => setError(msg)}
              />
            </StripeProvider>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPageClient;
