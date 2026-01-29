"use client";
import { useState } from "react";
import { Button, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { Locale } from "@/i18n/config";
import PageLoading from "../common/PageLoading";
import Section from "../Section/Section";

interface Props {
  locale: Locale;
  orderId: number;
  pricing?: any;
  paymentIntentId: string;
  onError: (msg: string) => void;
}

const CheckoutPaymentForm = ({
  locale,
  orderId,
  pricing,
  paymentIntentId,
  onError,
}: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const { t } = useTranslation("checkout");

  const handlePay = async () => {
    setLocalError(null);
    onError("");

    if (!stripe || !elements) return;

    try {
      setLoading(true);

      const returnUrl = `${window.location.origin}/${locale}/order/confirm?orderId=${orderId}`;

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
        redirect: "if_required",
      });

      if (result.error) {
        throw new Error(result.error.message ?? "Payment failed");
      }

      const status = result.paymentIntent?.status;

      if (status === "succeeded") {
        const res = await fetch("/api/checkout/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, paymentIntentId }),
        });
        const json = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(json?.error || "Order completion failed");
        }

        // Redirect to success page
        window.location.href = `/${locale}/checkout/success?orderId=${orderId}`;
        return;
      }
      // Other Status, will return
      window.location.href = `/${locale}/checkout/return?orderId=${orderId}`;
      return;
    } catch (e: any) {
      const msg = e?.message || t("paymentError");
      setLocalError(msg);
      onError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <PageLoading open={loading} label={t("preparingPayment")} />
      {localError ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {localError}
        </Alert>
      ) : null}

      <PaymentElement />

      <Button
        variant="contained"
        onClick={handlePay}
        disabled={loading || !stripe || !elements}
        sx={{ mt: 3 }}
      >
        {loading ? t("processingPayment") : t("payNow")}
      </Button>
    </Section>
  );
};

export default CheckoutPaymentForm;
