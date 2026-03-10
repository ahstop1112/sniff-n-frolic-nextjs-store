import { notFound } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { stripe } from "@/lib/stripe";
import { LangParamsObj, PageProps } from "@/types/next";
import { getDictionary } from "@/i18n/dictionaries";

const wooGet = async (path: string) => {
  const base = process.env.WOO_API_BASE_URL!;
  const url = new URL(`${base}/wp-json/wc/v3/${path}`);

  const auth = Buffer.from(
    `${process.env.WOO_CONSUMER_KEY}:${process.env.WOO_CONSUMER_SECRET}`,
  ).toString("base64");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Basic ${auth}` },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
};

type ConfirmPageProps = PageProps<LangParamsObj>;

const getStr = (v: any) =>
  typeof v === "string" ? v : Array.isArray(v) ? v[0] : "";

const ConfirmPage = async ({ params, searchParams }: ConfirmPageProps) => {
  const { lang } = await params;
  const sp = await searchParams;

  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const piId = sp ? getStr(sp.pi) : 0;
  if (!piId) notFound();

  const pi = await stripe.paymentIntents.retrieve(piId);
  const wooOrderId = pi.metadata?.woo_order_id;

  if (!wooOrderId) {
    // webhook might still be processing; for MVP, show a simple message
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          {dict.checkout.confirmingTitle}
        </Typography>
        <Typography variant="body1">
          {dict.checkout.confirmingDesc}
        </Typography>
      </Box>
    );
  }

  const order = await wooGet(`orders/${wooOrderId}`);
  if (!order) notFound();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {dict.checkout.confirmedTitle}
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        {dict.checkout.orderNumber} {order.number}
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        {dict.checkout.shipping}
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
        {dict.checkout.status}
      </Typography>
      <Typography variant="body2">{order.status}</Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        {dict.checkout.items}
      </Typography>
      {(order.line_items || []).map((li: any) => (
        <Typography key={li.id} variant="body2">
          {li.name} × {li.quantity}
        </Typography>
      ))}
      <Typography variant="h6" sx={{ mt: 3 }}>
        {dict.checkout.total}
      </Typography>
      <Typography variant="body2">
        {order.total} {order.currency}
      </Typography>
    </Box>
  );
};

export default ConfirmPage;
