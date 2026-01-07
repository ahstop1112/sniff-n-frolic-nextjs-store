"use client";

import { useState } from "react";
import { Box, Button, Alert, Typography } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { Locale } from "@/i18n/config";

interface Props {
  locale: Locale;
  paymentIntentId: string;
  onError: (msg: string) => void;
}

const CheckoutPaymentForm = ({ locale, paymentIntentId, onError }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const isZh = locale === "zh";

  const handlePay = async () => {
    setLocalError(null);
    onError("");

    if (!stripe || !elements) return;

    try {
      setLoading(true);

      const returnUrl = `${window.location.origin}/${locale}/order/confirm?pi=${paymentIntentId}`;

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
        redirect: "if_required",
      });

      if (result.error) {
        const msg =
          result.error.message || (isZh ? "付款失敗。" : "Payment failed.");
        setLocalError(msg);
        onError(msg);
        return;
      }

      // If no redirect required (most cases), we can go confirm directly.
      window.location.href = returnUrl;
    } catch (e: any) {
      const msg = e?.message || (isZh ? "付款出現問題。" : "Payment error.");
      setLocalError(msg);
      onError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {isZh ? "付款資料" : "Payment"}
      </Typography>

      {localError ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {localError}
        </Alert>
      ) : null}

      <PaymentElement />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!stripe || !elements || loading}
        onClick={handlePay}
      >
        {loading ? (isZh ? "" : "Paying…") : isZh ? "確認付款" : "Pay now"}
      </Button>
    </Box>
  );
};

export default CheckoutPaymentForm;
