import { Container, Grid } from "@mui/material";
import { useEffect } from "react";

import { useAmortization } from "@/modules/simulator/hooks/useAmortization";
import { useLocalStorage } from "@/modules/simulator/hooks/useLocalStorage";
import { SimulationInput } from "@/modules/simulator/types/simulation.types";
import { SimulatorFormData } from "@/modules/simulator/schemas/simulatorSchema";
import { PageHeader } from "@/modules/simulator/sections/PageHeader";
import { ContractSection } from "@/modules/simulator/sections/ContractSection";
import { ResultsSection } from "@/modules/simulator/sections/ResultSection";
import { EvolutionTable } from "@/modules/simulator/components/EvolutionTable";

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

  const onSimulateHandler = (data: SimulatorFormData) => {
    setLastInput(data);
    handleSimulate(data);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <PageHeader />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ContractSection onSimulate={onSimulateHandler} />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <ResultsSection summary={summary} comparison={comparison} />
        </Grid>

        {summary && (
          <Grid size={12}>
            <EvolutionTable installments={results} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
