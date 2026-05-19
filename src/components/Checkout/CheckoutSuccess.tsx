"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button } from "@mui/material";
import { useCart } from "@/context/CartContext";

const CheckoutSuccess = ({ orderId, lang }: { orderId: string; lang: string }) => {
  const { t } = useTranslation("checkout");
  const { clearCart } = useCart();

  useEffect(() => {
      clearCart();
      const pathname = window.location.pathname;
      lang  = pathname.startsWith("/zh") ? "zh" : "en";
  }, []);

  return (
    <Box maxWidth={700} mx="auto" mt={6} mb={6} px={2}>
      <Typography variant="h4" gutterBottom>
        {t('paymentSuccess')}
      </Typography>

      <Typography sx={{ mb: 2 }}>
        {t('thankyou')}
      </Typography>

      {orderId ? (
        <Typography sx={{ mb: 3, opacity: 0.8 }}>
          {t('orderId')} <b>{orderId}</b>
        </Typography>
      ) : null}

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button variant="contained" component={Link} href={`/${lang}/products`}>
          {t('continueShopping')}
        </Button>

        {/* <Button
          variant="outlined"
          component={Link}
          href={`/${lang}/account/orders`}
        >
          {t('viewOrders')}
        </Button> */}
      </Box>
    </Box>
  );
};

export default CheckoutSuccess;
