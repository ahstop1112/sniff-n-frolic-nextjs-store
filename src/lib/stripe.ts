import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

export const stripe = new Stripe(secretKey);

export const getStripeWebhookEvent = async (args: {
  req: Request;
}) => {
  const sig = args.req.headers.get("stripe-signature");
  if (!sig) throw new Error("Missing stripe-signature header");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) throw new Error("Missing STRIPE_WEBHOOK_SECRET");

  const rawBody = await args.req.text();

  return stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
};
