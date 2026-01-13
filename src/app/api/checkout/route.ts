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

  return +subtotal.toFixed(2);
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

    // 1) price verification + totals (server source of truth)
    const subtotal = await getVerifiedLineItemsTotal(body.cartItems);
    const shippingCost = getFlatShipping(subtotal);

    const gst = +(Number(subtotal ?? 0) * 0.05).toFixed(2);
    const pst = +(Number(subtotal ?? 0) * 0.07).toFixed(2);
    const taxTotal = Number(gst + pst).toFixed(2);
    const total = +(subtotal + shippingCost + Number(taxTotal)).toFixed(2);

    // 2) create Woo order (pending)
    const line_items = body.cartItems.map((it) => {
      const qty = Math.max(1, Math.min(99, Number(it.quantity) || 1));
      const base: any = { product_id: it.product_id, quantity: qty };
      if (it.variationId) base.variation_id = it.variationId;
      return base;
    });

    const shipping = {
      first_name: body.shipping.first_name || "",
      last_name: body.shipping.last_name || "",
      address_1: body.shipping.address_1 || "",
      address_2: body.shipping.address_2 || "",
      city: body.shipping.city || "",
      state: body.shipping.state || "",
      postcode: body.shipping.postcode || "",
      country: body.shipping.country || "CA",
    };

    const billing = {
      ...shipping,
      email: body.email,
      phone: body.shipping.phone || "",
    };

    const order = await wooFetch<any>("orders", {
      method: "POST",
      bodyJson: {
        status: "pending",
        set_paid: false,
        payment_method: "stripe",
        payment_method_title: "Stripe",
        billing,
        shipping,
        line_items,
        currency: "CAD",
        meta_data: [
          { key: "wpml_language", value: body.locale }, // optional; keep if you use WPML
          { key: "_headless_checkout", value: "nextjs" },
        ],
      },
    });

    const orderId = Number(order?.id);
    if (!orderId) throw new Error("Woo order creation failed");

    // 3) create Stripe PaymentIntent
    const intent = await stripe.paymentIntents.create({
      amount: toCents(total),
      currency: "cad",
      automatic_payment_methods: { enabled: true },
      receipt_email: body.email,
      metadata: {
        locale: body.locale,
        email: body.email,
        shipping_method: body.shipping_method,
        subtotal: String(subtotal),
        shipping: String(shippingCost),
        gst: String(gst),
        pst: String(pst),
        tax: String(taxTotal),
        total: String(total),
        // keep these if you really need them (note: metadata size limit)
        shipping_json: JSON.stringify(body.shipping),
        items_json: JSON.stringify(body.cartItems),
      },
    });

    if (!intent.client_secret) {
      return NextResponse.json(
        { error: "Stripe client_secret missing" },
        { status: 500 }
      );
    }

    await wooFetch<any>(`orders/${orderId}`, {
      method: "PUT",
      bodyJson: {
        meta_data: [{ key: "_stripe_payment_intent", value: intent.id }],
      },
    });

    // 4) return to client
    return NextResponse.json({
      data: {
        clientSecret: intent.client_secret,
        paymentIntentId: intent.id,
        amount: total,
        orderId,
        pricing: {
          currency: "CAD",
          subtotal: Number(subtotal ?? 0),
          shipping: shippingCost,
          tax: Number(taxTotal ?? 0),
          total: Number(total ?? 0),
          gst,
          pst,
        },
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
};
