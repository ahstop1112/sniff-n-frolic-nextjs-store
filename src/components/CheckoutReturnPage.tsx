"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/material";

const CheckoutReturnPage = () => {
  const sp = useSearchParams();

  useEffect(() => {
    const orderId = Number(sp.get("orderId") || 0);
    if (!orderId) return;
    window.location.href = `/checkout/success?orderId=${orderId}`;
  }, [sp]);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6 }}>
      <Typography variant="h6">Processing…</Typography>
    </Box>
  );
};

export default CheckoutReturnPage;
