import { Box, Typography } from "@mui/material";

export const PageHeader = () => {
  return (
    <Box sx={{ mb: 6, textAlign: "center" }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 800, color: "primary.main" }}
      >
        Simulador Financiamento Pro
      </Typography>

      <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
        Simulador Profissional SAC/PRICE com Correção TR
      </Typography>
    </Box>
  );
};
