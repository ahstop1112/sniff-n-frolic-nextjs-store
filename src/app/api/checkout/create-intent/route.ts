import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

type CartItem = {
  productId: number;
  variationId?: number;
  quantity: number;
};

type CheckoutPayload = {
  locale: "en" | "zh";
  email: string;
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string; // "CA"
    phone?: string;
  };
  items: CartItem[];
  shipping_method: "flat_rate";
};

// ---- helpers ----
const toCents = (n: number) => Math.round(n * 100);

const wooFetch = async (path: string, query?: Record<string, string>) => {
  const base = process.env.WOO_BASE_URL!;
  const url = new URL(`${base}/wp-json/wc/v3/${path}`);
  if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));

  // Basic auth via key/secret (server-only)
  const auth = Buffer.from(
    `${process.env.WOO_CONSUMER_KEY}:${process.env.WOO_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Basic ${auth}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Woo fetch failed: ${res.status} ${text}`);
  }
  return res.json();
};

const getVerifiedLineItemsTotal = async (items: CartItem[]) => {
  // fetch each product (or variation) price from Woo to prevent tampering
  // (MVP approach: sequential; you can optimize later)
  let subtotal = 0;

  for (const it of items) {
    const product: any = await wooFetch(`products/${it.productId}`);
    if (!product) throw new Error("Product not found");

    let priceStr: string | null = product.price ?? null;

    if (it.variationId) {
      const variation: any = await wooFetch(
        `products/${it.productId}/variations/${it.variationId}`
      );
      priceStr = variation?.price ?? priceStr;
    }

    const price = Number(priceStr);
    if (!Number.isFinite(price) || price <= 0) throw new Error("Invalid price");

    const qty = Math.max(1, Math.min(99, Number(it.quantity) || 1));
    subtotal += price * qty;
  }

  return subtotal;
};

const getFlatShipping = (subtotal: number) => {
  // MVP flat rate rules (you can replace with Woo shipping zones later)
  const FREE_OVER = 80;
  const FLAT = 10;
  return subtotal >= FREE_OVER ? 0 : FLAT;
};

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as CheckoutPayload;

    if (!body?.email || !body?.items?.length) {
      return NextResponse.json({ error: "Missing email/items" }, { status: 400 });
    }

    const subtotal = await getVerifiedLineItemsTotal(body.items);
    const shippingCost = getFlatShipping(subtotal);
    const tax = 0; // MVP (later connect tax rules)
    const total = subtotal + shippingCost + tax;

    const intent = await stripe.paymentIntents.create({
      amount: toCents(total),
      currency: "cad",
      automatic_payment_methods: { enabled: true },
      receipt_email: body.email,
      metadata: {
        locale: body.locale,
        email: body.email,
        shipping_json: JSON.stringify(body.shipping),
        items_json: JSON.stringify(body.items),
        shipping_method: body.shipping_method,
        subtotal: String(subtotal),
        shipping: String(shippingCost),
        tax: String(tax),
      },
    });

    return NextResponse.json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
      amount: total,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
};