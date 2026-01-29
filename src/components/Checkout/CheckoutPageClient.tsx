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
import { useTranslation } from "react-i18next";
import { useCart } from "@/context/CartContext";
import { cartItemsToServerItems } from "@/lib/cartToServer";
import PageLoading from "../common/PageLoading";
import StripeProvider from "../StripeProvider";
import CheckoutPaymentForm from "./CheckoutPaymentForm";
import CheckoutOrderSummary from "./CheckoutOrderSummary";
import { CheckoutPageClientProps } from "./types";

const CheckoutPageClient = ({ locale }: CheckoutPageClientProps) => {
  const { items, hydrated } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  const [orderId, setOrderId] = useState<number | null>(null);
  const [pricing, setPricing] = useState<any | null>(null);

  const { t } = useTranslation("checkout");

  const cartItemsForServer = useMemo(
    () => cartItemsToServerItems(items),
    [items],
  );

  const handleCreateIntent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError(t("cartEmpty"));
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
      setError(t("createOrderError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageLoading open={loading} label={t("preparingPayment")} />
      <Typography component="h1" gutterBottom>
        {t("heading")}
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
          <Typography variant="h4">{t("shippingInformation")}</Typography>
          <Box component="form" onSubmit={handleCreateIntent}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                mb: 2,
              }}
            >
              <TextField name="first_name" label={t("firstName")} required />
              <TextField name="last_name" label={t("lastName")} required />
            </Box>

            <Box sx={{ display: "grid", gap: 2, mb: 2 }}>
              <TextField
                name="email"
                type="email"
                label={t("email")}
                required
              />
              <TextField name="phone" label={t("phone")} />
              <TextField name="address_1" label={t("address1")} required />
              <TextField name="address_2" label={t("address2Optional")} />
              <TextField name="city" label={t("city")} required />
              <TextField name="state" label={t("stateProvince")} />
              <TextField name="postcode" label={t("postalCode")} required />
              <TextField
                name="country"
                label={t("country")}
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
                ? t("preparingPayment")
                : clientSecret
                  ? t("readyPay")
                  : t("preparePayment")}
            </Button>

            {clientSecret ? (
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 1, opacity: 0.7 }}
              >
                {t("paymentMethodsReady")}
              </Typography>
            ) : null}
          </Box>
        </Box>
        {/* RIGHT: payment */}
        <Box
          sx={{
            p: 3,
            position: { md: "sticky" },
            top: { md: 24 },
          }}
        >
          <CheckoutOrderSummary pricing={pricing} shippingFlatRate={16} />
          <Typography variant="h4" sx={{ mb: 2 }}>
            {t("payment")}
          </Typography>
          {!clientSecret ? (
            <Box sx={{ opacity: 0.75 }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {t("fillFormInstruction")}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">
                {t("paymentOptionsAfterPreparing")}
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
    </>
  );
};

export default CheckoutPageClient;
