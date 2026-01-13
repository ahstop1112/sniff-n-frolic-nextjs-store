"use client";

import { Backdrop, CircularProgress, Box, Typography } from "@mui/material";

const PageLoading = ({
  open,
  label,
}: {
  open: boolean;
  label?: string;
}) => {
  return (
    <Backdrop open={open} sx={{ zIndex: (t) => t.zIndex.modal + 1 }}>
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
        {label ? (
          <Typography sx={{ mt: 2, color: "white", opacity: 0.9 }}>
            {label}
          </Typography>
        ) : null}
      </Box>
    </Backdrop>
  );
};

export default PageLoading;