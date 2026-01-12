import { NextResponse } from "next/server";
import { wooFetch } from "@/lib/wooClient";
import type { CartItem } from "@/lib/cartTypes";

interface CheckoutRequestBody {
  locale: "en" | "zh";
  cartItems: CartItem[];
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address_1: string;
    address_2?: string;
    city: string;
    state?: string;
    postcode: string;
    country: string;
  };
}

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as CheckoutRequestBody;

    if (!body.cartItems || body.cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Woo needs line_items：[{ product_id, quantity }]
    const lineItems = body.cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    // Create Woo order（pending）
    const order = await wooFetch<any>("orders", {
      method: "POST",
      bodyJson: {
        payment_method: "stripe", // Woo default method
        payment_method_title: "Stripe",
        set_paid: false,
        billing: body.billing,
        shipping: body.billing, // Same as billing
        line_items: lineItems,
        currency: "CAD",
      },
    });

    const orderId = order.id;
    const orderKey = order.order_key;

    // Woo Payment Page URL
    const storeBase = "https://sniffnfrolic.com";
    const redirectUrl = `${storeBase}/checkout/order-pay/${orderId}/?pay_for_order=true&key=${orderKey}`;

    return NextResponse.json({ redirectUrl });
  } catch (err: any) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
};