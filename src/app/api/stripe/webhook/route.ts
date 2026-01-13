import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe, getStripeWebhookEvent } from "@/lib/stripe";
import { wooPost } from "@/lib/woo/server";

const safeJsonParse = <T>(raw: string | undefined, fallback: T): T => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const clampInt = (n: any, min: number, max: number) => {
  const x = Number(n);
  if (!Number.isFinite(x)) return min;
  return Math.max(min, Math.min(max, Math.floor(x)));
};

type MetaCartItem = {
  productId: number;
  variationId?: number;
  quantity: number;
};

export const POST = async (req: Request) => {
  let event: Stripe.Event;

  try {
    event = await getStripeWebhookEvent({ req });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook error: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    if (event.type !== "payment_intent.succeeded") {
      return NextResponse.json({ ok: true });
    }

    const pi = event.data.object as Stripe.PaymentIntent;

    // ✅ Idempotency: already created
    if (pi.metadata?.woo_order_id) {
      return NextResponse.json({ ok: true });
    }

    const email = (pi.metadata?.email || "").trim();

    const shipping = safeJsonParse<Record<string, any> | null>(
      pi.metadata?.shipping_json,
      null
    );

    const items = safeJsonParse<MetaCartItem[]>(pi.metadata?.items_json, []);

    // ✅ validation
    if (!email) throw new Error("Missing email in metadata");
    if (!shipping) throw new Error("Missing shipping_json in metadata");
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Missing items_json in metadata");
    }

    const line_items = items.map((it) => {
      const product_id = clampInt(it.productId, 1, 999999999);
      const quantity = clampInt(it.quantity, 1, 99);

      const variation_id_raw = it.variationId;
      const variation_id =
        variation_id_raw == null
          ? undefined
          : clampInt(variation_id_raw, 1, 999999999);

      return {
        product_id,
        ...(variation_id ? { variation_id } : {}),
        quantity,
      };
    });

    const orderPayload = {
      status: "processing",
      payment_method: "stripe",
      payment_method_title: "Credit Card (Stripe)",
      set_paid: true,
      transaction_id: pi.id,
      shipping: {
        ...shipping,
        email,
      },
      shipping,
      line_items,
      meta_data: [{ key: "_stripe_payment_intent", value: pi.id }],
    };

    const order = await wooPost("orders", orderPayload);

    // ✅ write back woo order id for confirm page lookup
    await stripe.paymentIntents.update(pi.id, {
      metadata: {
        ...pi.metadata,
        woo_order_id: String(order.id),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Webhook handler error" },
      { status: 500 }
    );
  }
};
