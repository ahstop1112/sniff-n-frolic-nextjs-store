"use client";
import Link from "next/link";
import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useCart } from "@/context/CartContext";

const CheckoutSuccessPage = ({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) => {
  const orderId = searchParams?.orderId ?? "";
  const pathname = window.location.pathname;
  const lang = pathname.startsWith("/zh") ? "zh" : "en";

  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Box maxWidth={700} mx="auto" mt={6} px={2}>
      <Typography variant="h4" gutterBottom>
        {lang === "zh" ? "付款成功 ✅" : "Payment successful ✅"}
      </Typography>

      <Typography sx={{ mb: 2 }}>
        {lang === "zh"
          ? "多謝你！我哋已收到付款。"
          : "Thank you! We’ve received your payment."}
      </Typography>

      {orderId ? (
        <Typography sx={{ mb: 3, opacity: 0.8 }}>
          {lang === "zh" ? "訂單編號：" : "Order ID: "} <b>{orderId}</b>
        </Typography>
      ) : null}

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button variant="contained" component={Link} href={`/${lang}/shop`}>
          {lang === "zh" ? "繼續購物" : "Continue shopping"}
        </Button>

        <Button
          variant="outlined"
          component={Link}
          href={`/${lang}/account/orders`}
        >
          {lang === "zh" ? "查看訂單" : "View orders"}
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutSuccessPage;
