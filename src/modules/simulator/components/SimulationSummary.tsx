import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { ScenarioComparison, SummaryType } from "../types/simulation.types";

interface Props {
  summary: SummaryType;
  comparison?: ScenarioComparison | null;
}

export const SimulationSummary = ({ summary, comparison }: Props) => {
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Resumo da Simulação
      </Typography>

      <Grid container spacing={2}>
        {/* =========================
            RESUMO PRINCIPAL
        ========================== */}

        <Grid size={12}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            Resumo do Financiamento
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            variant="outlined"
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <CardContent>
              <Typography variant="overline">Total Pago</Typography>

              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {formatCurrency(summary.totalPaid)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Total Amortizado
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {formatCurrency(summary.totalAmortized)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Prazo Total
              </Typography>

              <Typography variant="h5">{summary.term} meses</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* =========================
            CUSTOS
        ========================== */}

        <Grid size={12}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontWeight: "bold", mt: 2 }}
          >
            Custos Financeiros
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
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

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Taxas Bancárias
              </Typography>

              <Typography variant="h5">
                {formatCurrency(summary.totalFees)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Total Aportado
              </Typography>

              <Typography variant="h5">
                {formatCurrency(summary.totalExtraPaid)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* =========================
            IMPACTO DOS APORTES
        ========================== */}

        {comparison && (
          <>
            <Grid size={12}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontWeight: "bold", mt: 2 }}
              >
                Impacto dos Aportes
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Economia em Juros
                  </Typography>

                  <Typography
                    variant="h5"
                    color="success.main"
                    sx={{ fontWeight: "bold" }}
                  >
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

                  <Typography variant="h5" color="success.main">
                    {comparison.monthsSaved} meses
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Economia Total
                  </Typography>

                  <Typography
                    variant="h5"
                    color="success.main"
                    sx={{ fontWeight: "bold" }}
                  >
                    {formatCurrency(comparison.totalSaved)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Cenário Sem Aporte
                  </Typography>

                  <Typography variant="h6">
                    {formatCurrency(comparison.baseSummary.totalPaid)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Cenário Com Aporte
                  </Typography>

                  <Typography variant="h6">
                    {formatCurrency(comparison.acceleratedSummary.totalPaid)}
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
