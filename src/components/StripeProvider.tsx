"use client";
import { PropsWithChildren, useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
}

const stripePromise = loadStripe(publishableKey);

type Props = PropsWithChildren<{
  clientSecret: string;
  locale?: "en" | "zh";
}>;

const StripeProvider = ({ clientSecret, children, locale = "en" }: Props) => {
  const options: StripeElementsOptions = useMemo(
    () => ({
      clientSecret,
      // appearance: { theme: "stripe" }, // optional
      locale: locale === "zh" ? "zh" : "en",
    }),
    [clientSecret, locale]
  );

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

export default StripeProvider;