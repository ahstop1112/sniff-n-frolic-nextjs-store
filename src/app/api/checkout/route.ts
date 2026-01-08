import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { wooFetch } from "@/lib/wooClient";

type CartItem = {
  product_id: number;
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
  cartItems: CartItem[];
  shipping_method: "flat_rate";
};

// ---- helpers ----
const toCents = (n: number) => Math.round(n * 100);

const getVerifiedLineItemsTotal = async (items: CartItem[]) => {
  // fetch each product (or variation) price from Woo to prevent tampering
  // (MVP approach: sequential; you can optimize later)
  let subtotal = 0;

  for (const it of items) {
    const product: any = await wooFetch(`products/${it.product_id}`);
    if (!product) throw new Error("Product not found");

    let priceStr: string | null = product.price ?? null;

    if (it.variationId) {
      const variation: any = await wooFetch(
        `products/${it.product_id}/variations/${it.variationId}`
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

    if (!body?.email || !body?.cartItems?.length) {
      return NextResponse.json(
        { error: "Missing email/cartItems" },
        { status: 400 }
      );
    }

    const subtotal = await getVerifiedLineItemsTotal(body.cartItems);
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
        items_json: JSON.stringify(body.cartItems),
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
