import { NextResponse } from "next/server";
import { Resend } from "resend";
import { stripe } from "@/lib/stripe";
import { OrderConfirmEmail } from "@/email/OrderConfirmEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const API_BASE = process.env.API_BASE_URL!;

const FROM_EMAIL = "Sniff & Frolic <orders@sniffnfrolic.com>";
const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "woof@sniffnfrolic.com";

interface CompleteBody {
  orderId: string;
  paymentIntentId: string;
}

const isFinalStatus = (s?: string) => {
  const v = String(s || "").toLowerCase();
  return v === "processing" || v === "completed";
};

// ─── Email Helpers ────────────────────────────────────────────────────────────
const sendCustomerConfirmation = async (order: any) => {
  const customerEmail = order.guest_email;
  
  console.log("sendCustomerConfirmation called, order:", JSON.stringify({
    id: order?.id,
    guest_email: order?.guest_email,
    guest_name: order?.guest_name,
    items: order?.items?.length,
  }));

  if (!customerEmail) {
    console.error("sendCustomerConfirmation: no guest_email");
    return;
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: customerEmail,
      subject: `Order Confirmed #${order.id} – Sniff & Frolic 🐾`,
      react: OrderConfirmEmail({
        orderId: order.id,
        customerName: order.guest_name?.split(" ")[0],
        items: order.items ?? [],
        total: String((order.total / 100).toFixed(2)),
        currency: order.currency ?? "CAD",
      }),
    });
    console.log("Customer email result:", JSON.stringify(result));
  } catch (err) {
    console.error("Customer email error:", err);
  }
};

const sendOwnerNotification = async (order: any) => {
  const itemSummary = (order.items ?? [])
    .map((i: any) => `${i.product_name} x${i.quantity}`)
    .join(", ");

  await resend.emails.send({
    from: FROM_EMAIL,
    to: OWNER_EMAIL,
    subject: `🐾 New Order #${order.id} — $${(order.total / 100).toFixed(2)} CAD`,
    text: [
      `New order received!`,
      ``,
      `Order #${order.id}`,
      `Customer: ${order.guest_name} <${order.guest_email}>`,
      `Items: ${itemSummary}`,
      `Total: $${(order.total / 100).toFixed(2)} CAD`,
    ].join("\n"),
  });
};

// ─── Route Handler ────────────────────────────────────────────────────────────

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as Partial<CompleteBody>;

    // NestJS uses UUID strings, not numbers
    const orderId = String(body.orderId ?? "");
    let paymentIntentId = String(body.paymentIntentId ?? "");

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // 0) Read order from NestJS — idempotent safe
    const orderRes = await fetch(`${API_BASE}/orders/${orderId}`);
    if (!orderRes.ok) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    const order = await orderRes.json(); // BUG FIX: was missing .json()

    // Already finalized — return OK
    if (isFinalStatus(order.status)) {
      return NextResponse.json({
        ok: true,
        data: { orderId: order.id, status: order.status },
        alreadyCompleted: true,
      });
    }

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Missing paymentIntentId" },
        { status: 400 }
      );
    }

    // 1) Verify with Stripe
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);

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

    // Verify PI matches order — NestJS stores as order_id in metadata
    const piOrderId =
      pi.metadata?.order_id ||
      pi.metadata?.orderId;

    if (piOrderId && piOrderId !== orderId) {
      return NextResponse.json(
        { error: "PaymentIntent does not match order" },
        { status: 400 }
      );
    }

    // 2) Complete order in NestJS
    const updatedRes = await fetch(`${API_BASE}/orders/${orderId}/complete`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId }),
    });

    if (!updatedRes.ok) {
      throw new Error("Order completion failed in NestJS");
    }

    const { order: updatedOrder } = await updatedRes.json();

    // 3) Send emails — non-blocking, order failure won't affect this
    // BUG FIX: was passing `updated` (Response object) instead of `updatedOrder`
    await Promise.allSettled([
      sendCustomerConfirmation(updatedOrder ?? order),
      sendOwnerNotification(updatedOrder ?? order),
    ]);

    return NextResponse.json({
      ok: true,
      data: {
        orderId: updatedOrder?.id ?? orderId,
        status: updatedOrder?.status ?? "processing",
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