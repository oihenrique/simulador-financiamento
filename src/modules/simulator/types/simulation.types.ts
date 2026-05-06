export type AmortizationSystem = "SAC" | "PRICE";

export type ExtraPaymentType = "SINGLE" | "RECURRING";

export type ExtraPaymentStrategy = "REDUCE_TERM" | "REDUCE_INSTALLMENT";

export interface ExtraPayment {
  type: ExtraPaymentType;
  strategy: ExtraPaymentStrategy;
  amount: number;
  startMonth: number;
  frequencyMonths?: number;
}

export interface SimulationInput {
  imovelValue: number;
  downPayment: number;
  subsidy: number;
  annualInterestRate: number;
  termMonths: number;
  amortizationSystem: AmortizationSystem;
  trEstimated: number;
  fees: {
    monthlyAdminFee: number;
    insuranceFee: number;
  };
  extraPayment?: SingleExtraPaymentForm;
  extraPayments?: ExtraPayment[];
}

export interface Installment {
  month: number;
  initialBalance: number;
  correctedBalance: number;
  interest: number;
  amortization: number;
  fees: number;
  extraPayment: number;
  totalInstallment: number;
  finalBalance: number;
}

export interface SummaryType {
  totalPaid: number;
  totalInterest: number;
  totalFees: number;
  totalAmortized: number;
  totalExtraPaid: number;
  term: number;
}

export interface ScenarioComparison {
  baseSchedule: Installment[];
  acceleratedSchedule: Installment[];
  baseSummary: SummaryType;
  acceleratedSummary: SummaryType;
  interestSaved: number;
  totalSaved: number;
  monthsSaved: number;
}

export interface SingleExtraPaymentForm {
  enabled: boolean;
  amount: number;
  startMonth: number;
  strategy: ExtraPaymentStrategy;
}
