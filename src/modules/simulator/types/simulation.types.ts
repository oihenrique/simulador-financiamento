export type AmortizationSystem = "SAC" | "PRICE";

export interface SimulationInput {
  imovelValue: number;
  downPayment: number;
  subsidy: number;
  annualInterestRate: number;
  termMonths: number;
  amortizationSystem: AmortizationSystem;
  trEstimated: number; // Ex: 0.0005 para 0.05%
  fees: {
    monthlyAdminFee: number;
    insuranceFee: number;
  };
}

export interface Installment {
  month: number;
  initialBalance: number;
  correctedBalance: number;
  interest: number;
  amortization: number;
  fees: number;
  totalInstallment: number;
  finalBalance: number;
}

export interface SummaryType {
  totalPaid: number;
  totalInterest: number;
  totalFees: number;
  totalAmortized: number;
  term: number;
}
