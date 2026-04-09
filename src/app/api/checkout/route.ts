import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CartItem } from "@/lib/cartTypes";
import { CheckoutPayload } from "./types";

const API_BASE = process.env.API_BASE_URL!;

const getFlatShipping = (subtotalCents: number) => {
  const FREE_OVER_CENTS = 8000; // $80
  const FLAT_CENTS = 1600;      // $16
  return subtotalCents >= FREE_OVER_CENTS ? 0 : FLAT_CENTS;
};

const getVerifiedLineItems = async (items: CartItem[]) => {
  const results = await Promise.all(
    items.map(async (item) => {
      const res = await fetch(`${API_BASE}/products/${item.slug}`);
      if (!res.ok) throw new Error(`Product ${item.slug} not found`);
      const product = await res.json();

      const qty = Math.max(1, Math.min(99, Number(item.quantity) || 1));
      return {
        product_id: product.id,
        product_name: product.name,
        sku: product.sku ?? undefined,
        quantity: qty,
        unit_price: product.effective_price, // cents
      };
    }),
  );
  return results;
};

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as CheckoutPayload;

    if (!body?.email || !body?.cartItems?.length) {
      return NextResponse.json(
        { error: "Missing email/cartItems" },
        { status: 400 },
      );
    }

    // 1) price verification from NestJS
    const lineItems = await getVerifiedLineItems(body.cartItems);
    const subtotal = lineItems.reduce(
      (sum, item) => sum + item.unit_price * item.quantity,
      0,
    );
    const shippingCost = getFlatShipping(subtotal);
    const gstCents = Math.round(subtotal * 0.05);
    const pstCents = Math.round(subtotal * 0.07);
    const total = subtotal + shippingCost + gstCents + pstCents;

    // 2) create order in NestJS
    const orderRes = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_name: `${body.shipping.first_name} ${body.shipping.last_name}`,
        guest_email: body.email,
        shipping_address: {
          line1: body.shipping.address_1,
          line2: body.shipping.address_2 ?? "",
          city: body.shipping.city,
          province: body.shipping.state,
          postal_code: body.shipping.postcode,
          country: body.shipping.country,
        },
        items: lineItems,
        notes: null,
        currency: "CAD",
      }),
    });

    if (!orderRes.ok) throw new Error("NestJS order creation failed");
    const order = await orderRes.json();

    // 3) create Stripe PaymentIntent
    const intent = await stripe.paymentIntents.create({
      amount: total,
      currency: "cad",
      automatic_payment_methods: { enabled: true },
      receipt_email: body.email,
      metadata: {
        order_id: order.id,
        locale: body.locale,
        subtotal: String(subtotal),
        shipping: String(shippingCost),
        gst: String(gstCents),
        pst: String(pstCents),
        total: String(total),
      },
    });

    if (!intent.client_secret) {
      return NextResponse.json(
        { error: "Stripe client_secret missing" },
        { status: 500 },
      );
    }

    // 4) return to client
    return NextResponse.json({
      data: {
        clientSecret: intent.client_secret,
        paymentIntentId: intent.id,
        orderId: order.id,
        pricing: {
          currency: "CAD",
          subtotal,
          shipping: shippingCost,
          gst: gstCents,
          pst: pstCents,
          tax: gstCents + pstCents,
          total,
        },
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 },
    );
  }
};