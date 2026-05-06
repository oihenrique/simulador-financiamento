import { Box } from "@mui/material";
import { SimulationSummary } from "../components/SimulationSummary";
import { ScenarioComparison, SummaryType } from "../types/simulation.types";
import { EmptySimulationState } from "./EmptySimulationState";

interface ResultsSectionProps {
  summary: SummaryType | null;
  comparison: ScenarioComparison | null;
}

export const ResultsSection = ({
  summary,
  comparison,
}: ResultsSectionProps) => {
  if (!summary) {
    return <EmptySimulationState />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <SimulationSummary summary={summary} comparison={comparison} />
    </Box>
  );
};
