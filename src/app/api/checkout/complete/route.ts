import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { wooFetch } from "@/lib/wooClient";

interface CompleteBody {
  orderId: number;
  paymentIntentId: string;
}

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as Partial<CompleteBody>;

    const orderId = Number(body.orderId);
    const paymentIntentId = String(body.paymentIntentId ?? "");

    if (!orderId || !paymentIntentId) {
      return NextResponse.json(
        { error: "Missing orderId/paymentIntentId" },
        { status: 400 }
      );
    }

    // 1) Verify with Stripe (don't trust client)
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (pi.status !== "succeeded") {
      return NextResponse.json(
        { error: "Payment not succeeded", status: pi.status },
        { status: 400 }
      );
    }

    // Optional safety: ensure PI matches this Woo order (if you set metadata at creation time)
    const piWooOrderId = pi.metadata?.woo_order_id;
    if (piWooOrderId && Number(piWooOrderId) !== orderId) {
      return NextResponse.json(
        { error: "PaymentIntent does not match order" },
        { status: 400 }
      );
    }

    // 2) Update Woo order as paid
    const updated = await wooFetch<any>(`orders/${orderId}`, {
      method: "PUT",
      bodyJson: {
        set_paid: true,
        status: "processing",
        transaction_id: paymentIntentId,
        meta_data: [
          { key: "_stripe_payment_intent", value: paymentIntentId },
          { key: "_headless_paid_via", value: "nextjs" },
        ],
      },
    });

    return NextResponse.json({
      ok: true,
      data: {
        orderId: updated?.id ?? orderId,
        status: updated?.status ?? "processing",
        transaction_id: updated?.transaction_id ?? paymentIntentId,
      },
    });
  } catch (err: any) {
    console.error("Checkout complete error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Checkout complete failed" },
      { status: 500 }
    );
  }
};
