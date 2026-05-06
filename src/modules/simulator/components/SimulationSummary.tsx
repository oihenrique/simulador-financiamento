import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { ScenarioComparison, SummaryType } from "../types/simulation.types";

interface Props {
  summary: SummaryType;
  comparison?: ScenarioComparison | null;
}

export const SimulationSummary = ({ summary, comparison }: Props) => {
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Resumo da Simulação
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card
            variant="outlined"
            sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
          >
            <CardContent>
              <Typography variant="overline">Total a Pagar</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {formatCurrency(summary.totalPaid)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Total de Juros
              </Typography>
              <Typography
                variant="h5"
                color="error.main"
                sx={{ fontWeight: "bold" }}
              >
                {formatCurrency(summary.totalInterest)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Taxas Bancárias
              </Typography>
              <Typography variant="h6">
                {formatCurrency(summary.totalFees)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Total Amortizado
              </Typography>
              <Typography variant="h6">
                {formatCurrency(summary.totalAmortized)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Prazo
              </Typography>
              <Typography variant="h6">{summary.term} meses</Typography>
            </CardContent>
          </Card>
        </Grid>

        {comparison && (
          <>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Economia em Juros
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    {formatCurrency(comparison.interestSaved)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Meses Antecipados
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    {comparison.monthsSaved} meses
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};
