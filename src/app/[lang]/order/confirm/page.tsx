import { notFound } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { stripe } from "@/lib/stripe";

const wooGet = async (path: string) => {
  const base = process.env.WOO_API_BASE_URL!;
  const url = new URL(`${base}/wp-json/wc/v3/${path}`);

  const auth = Buffer.from(
    `${process.env.WOO_CONSUMER_KEY}:${process.env.WOO_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Basic ${auth}` },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
};

type SearchParams = Record<string, string | string[] | undefined>;

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<SearchParams>;
}

const getStr = (v: any) =>
  typeof v === "string" ? v : Array.isArray(v) ? v[0] : "";

const ConfirmPage = async ({ params, searchParams }: Props) => {
  const { lang } = await params;
  const sp = await searchParams;

  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;

  const piId = getStr(sp.pi);
  if (!piId) notFound();

  const pi = await stripe.paymentIntents.retrieve(piId);
  const wooOrderId = pi.metadata?.woo_order_id;

  if (!wooOrderId) {
    // webhook might still be processing; for MVP, show a simple message
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          {locale === "zh" ? "正在確認訂單…" : "Confirming your order…"}
        </Typography>
        <Typography variant="body1">
          {locale === "zh"
            ? "已付款成功，我哋正在建立訂單。請稍後刷新頁面。"
            : "Payment succeeded. We’re creating your order—refresh in a moment."}
        </Typography>
      </Box>
    );
  }

  const order = await wooGet(`orders/${wooOrderId}`);
  if (!order) notFound();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {locale === "zh" ? "訂單確認" : "Order confirmed"}
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {locale === "zh" ? "訂單編號：" : "Order #"} {order.number}
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        {locale === "zh" ? "送貨資料" : "Shipping"}
      </Typography>
      <Typography variant="body2">
        {order.shipping?.first_name} {order.shipping?.last_name}
      </Typography>
      <Typography variant="body2">{order.shipping?.address_1}</Typography>
      {order.shipping?.address_2 ? (
        <Typography variant="body2">{order.shipping.address_2}</Typography>
      ) : null}
      <Typography variant="body2">
        {order.shipping?.city}, {order.shipping?.state}{" "}
        {order.shipping?.postcode}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        {locale === "zh" ? "訂單狀態" : "Status"}
      </Typography>
      <Typography variant="body2">{order.status}</Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        {locale === "zh" ? "商品" : "Items"}
      </Typography>
      {(order.line_items || []).map((li: any) => (
        <Typography key={li.id} variant="body2">
          {li.name} × {li.quantity}
        </Typography>
      ))}

      <Typography variant="h6" sx={{ mt: 3 }}>
        {locale === "zh" ? "總額" : "Total"}
      </Typography>
      <Typography variant="body2">
        {order.total} {order.currency}
      </Typography>
    </Box>
  );
};

export default ConfirmPage;
