import { useState, useMemo } from "react";
import { calculateAmortization } from "../services/finance-engine";
import {
  Installment,
  SimulationInput,
  SimulationSummary,
} from "../types/simulation.types";

export const useAmortization = () => {
  const [results, setResults] = useState<Installment[]>([]);

  const handleSimulate = (data: SimulationInput) => {
    const schedule = calculateAmortization(data);
    setResults(schedule);
  };

  const summary = useMemo<SimulationSummary | null>(() => {
    if (results.length === 0) return null;

    return results.reduce(
      (acc, curr) => ({
        totalPaid: acc.totalPaid + curr.totalInstallment,
        totalInterest: acc.totalInterest + curr.interest,
        totalFees: acc.totalFees + curr.fees,
        totalAmortized: acc.totalAmortized + curr.amortization,
        term: results.length,
      }),
      {
        totalPaid: 0,
        totalInterest: 0,
        totalFees: 0,
        totalAmortized: 0,
        term: 0,
      },
    );
  }, [results]);

  return { results, summary, handleSimulate };
};
