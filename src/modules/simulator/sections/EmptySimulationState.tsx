import { Paper, Typography } from "@mui/material";

export const EmptySimulationState = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 10,
        textAlign: "center",
        bgcolor: "grey.50",
        borderStyle: "dashed",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "400px",
      }}
    >
      <Typography variant="h6" color="text.secondary">
        Pronto para calcular?
      </Typography>

      <Typography variant="body2" color="text.disabled">
        Preencha os detalhes ao lado para gerar seu cronograma de amortização.
      </Typography>
    </Paper>
  );
};
