import { Box, Container, Typography, Paper, Grid } from "@mui/material";
import { useEffect } from "react";

import { SimulatorForm } from "../modules/simulator/components/SimulatorForm";
import { useAmortization } from "../modules/simulator/hooks/useAmortization";
import { SimulationSummary } from "../modules/simulator/components/SimulationSummary";
import { EvolutionTable } from "../modules/simulator/components/EvolutionTable";

import { useLocalStorage } from "../modules/simulator/hooks/useLocalStorage";
import { SimulationInput } from "@/modules/simulator/types/simulation.types";

export default function Home() {
  const { results, summary, comparison, handleSimulate } = useAmortization();

  const [lastInput, setLastInput] = useLocalStorage<SimulationInput | null>(
    "last_input",
    null,
  );

  useEffect(() => {
    if (lastInput && results.length === 0) {
      handleSimulate(lastInput);
    }
  }, [lastInput, handleSimulate, results.length]);

  const onSimulateHandler = (data: SimulationInput) => {
    setLastInput(data);
    handleSimulate(data);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Seção de Cabeçalho */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "800", color: "primary.main" }}
        >
          Simulador Financiamento Pro
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: 400 }}
        >
          Simulador Profissional SAC/PRICE com Correção TR
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Coluna Esquerda: Formulário de Entrada */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <SimulatorForm onSimulate={onSimulateHandler} />
          </Paper>
        </Grid>

        {/* Coluna Direita: Resultados */}
        <Grid size={{ xs: 12, md: 8 }}>
          {!summary ? (
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
                Preencha os detalhes ao lado para gerar seu cronograma de
                amortização.
              </Typography>
            </Paper>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Resumo em Cards */}
              <SimulationSummary summary={summary} comparison={comparison} />

              {/* Tabela de Evolução Mensal */}
              <EvolutionTable installments={results} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
