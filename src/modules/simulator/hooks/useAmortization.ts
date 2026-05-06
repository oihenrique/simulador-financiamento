import { useState, useMemo, useCallback } from "react";
import {
  calculateAmortization,
  calculateSummary,
  compareScenarios,
} from "../services/finance-engine";
import {
  Installment,
  ScenarioComparison,
  SimulationInput,
  SummaryType,
} from "../types/simulation.types";

export const useAmortization = () => {
  const [results, setResults] = useState<Installment[]>([]);
  const [comparison, setComparison] = useState<ScenarioComparison | null>(null);

  const handleSimulate = useCallback((data: SimulationInput) => {
    const normalizedInput: SimulationInput = {
      ...data,
      extraPayments:
        data.extraPayment?.enabled && data.extraPayment.amount > 0
          ? [
              {
                type: data.extraPayment.type,
                strategy: data.extraPayment.strategy,
                amount: data.extraPayment.amount,
                startMonth: data.extraPayment.startMonth,
                frequencyMonths:
                  data.extraPayment.type === "RECURRING"
                    ? data.extraPayment.frequencyMonths
                    : undefined,
              },
            ]
          : [],
    };

    const schedule = calculateAmortization(normalizedInput);
    const scenarioComparison = compareScenarios(normalizedInput);

    setResults(schedule);
    setComparison(scenarioComparison);
  }, []);

  const summary = useMemo<SummaryType | null>(() => {
    if (results.length === 0) return null;

    return calculateSummary(results);
  }, [results]);

  return {
    results,
    summary,
    comparison,
    handleSimulate,
  };
};
