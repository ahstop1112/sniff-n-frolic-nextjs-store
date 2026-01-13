import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { wooFetch } from "@/lib/wooClient";

interface CompleteBody {
  orderId: number;
  paymentIntentId: string;
}

const isFinalWooStatus = (s?: string) => {
  const v = String(s || "").toLowerCase();
  return v === "processing" || v === "completed";
};

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as Partial<CompleteBody>;

    const orderId = Number(body.orderId);
    let paymentIntentId = String(body.paymentIntentId ?? "");

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // 0) Read Woo Order First -> idempotent safe
    const order: any = await wooFetch(`orders/${orderId}`);
    if (!order?.id) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // If already finalized, return OK (idempotent)
    if (isFinalWooStatus(order.status)) {
      return NextResponse.json({
        ok: true,
        data: { orderId: order.id, status: order.status, transaction_id: order.transaction_id ?? "" },
        alreadyCompleted: true,
      });
    }

    // Fallback: read PI from Woo meta if missing
    if (!paymentIntentId && Array.isArray(order.meta_data)) {
      const found = order.meta_data.find((m: any) => m?.key === "_stripe_payment_intent");
      if (found?.value) paymentIntentId = String(found.value);
    }

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Missing paymentIntentId" },
        { status: 400 }
      );
    }


    // 1) Verify with Stripe (don't trust client)
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Redirect-based methods may be async for a short time
    if (pi.status === "processing" || pi.status === "requires_action") {
      return NextResponse.json(
        { ok: false, retryLater: true, status: pi.status },
        { status: 202 }
      );
    }

    if (pi.status !== "succeeded") {
      return NextResponse.json(
        { error: "Payment not succeeded", status: pi.status },
        { status: 400 }
      );
    }

    // Optional safety: ensure PI matches this Woo order (if you set metadata at creation time)
    const piWooOrderId = pi.metadata?.orderId || pi.metadata?.woo_order_id || pi.metadata?.wooOrderId;

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
