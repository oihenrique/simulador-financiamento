import {
  ExtraPayment,
  Installment,
  ScenarioComparison,
  SimulationInput,
  SummaryType,
} from "../types/simulation.types";

const roundMoney = (value: number) => Number(value.toFixed(2));

const getInitialDebt = (input: SimulationInput) =>
  input.imovelValue - (input.downPayment + input.subsidy);

const getMonthlyInterestRate = (annualInterestRate: number) =>
  Math.pow(1 + annualInterestRate / 100, 1 / 12) - 1;

const calculatePricePayment = (
  balance: number,
  monthlyInterestRate: number,
  months: number,
) => {
  if (months <= 0) return 0;

  if (monthlyInterestRate === 0) {
    return balance / months;
  }

  return (
    balance *
    ((monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
      (Math.pow(1 + monthlyInterestRate, months) - 1))
  );
};

const getExtraPaymentForMonth = (
  month: number,
  extraPayments?: ExtraPayment[],
): number => {
  if (!extraPayments?.length) return 0;

  return extraPayments.reduce((total, payment) => {
    if (payment.type === "SINGLE") {
      return payment.startMonth === month ? total + payment.amount : total;
    }

    const frequency = payment.frequencyMonths ?? 1;
    const isRecurringMonth =
      month >= payment.startMonth &&
      (month - payment.startMonth) % frequency === 0;

    return isRecurringMonth ? total + payment.amount : total;
  }, 0);
};

const hasReduceInstallmentStrategy = (
  month: number,
  extraPayments?: ExtraPayment[],
): boolean => {
  if (!extraPayments?.length) return false;

  return extraPayments.some((payment) => {
    if (payment.strategy !== "REDUCE_INSTALLMENT") return false;

    if (payment.type === "SINGLE") {
      return payment.startMonth === month;
    }

    const frequency = payment.frequencyMonths ?? 1;

    return (
      month >= payment.startMonth &&
      (month - payment.startMonth) % frequency === 0
    );
  });
};

export const calculateSummary = (schedule: Installment[]): SummaryType =>
  schedule.reduce(
    (acc, curr) => ({
      totalPaid: acc.totalPaid + curr.totalInstallment + curr.extraPayment,
      totalInterest: acc.totalInterest + curr.interest,
      totalFees: acc.totalFees + curr.fees,
      totalAmortized: acc.totalAmortized + curr.amortization,
      totalExtraPaid: acc.totalExtraPaid + curr.extraPayment,
      term: schedule.length,
    }),
    {
      totalPaid: 0,
      totalInterest: 0,
      totalFees: 0,
      totalAmortized: 0,
      totalExtraPaid: 0,
      term: 0,
    },
  );

export const calculateAmortization = (
  input: SimulationInput,
): Installment[] => {
  const {
    annualInterestRate,
    termMonths,
    amortizationSystem,
    trEstimated,
    fees,
    extraPayments,
  } = input;

  const initialDebt = getInitialDebt(input);

  let currentBalance = initialDebt;

  let currentBaseAmortization = initialDebt / termMonths;

  const monthlyInterestRate = getMonthlyInterestRate(annualInterestRate);
  const totalFees = fees.monthlyAdminFee + fees.insuranceFee;

  let currentPricePayment =
    amortizationSystem === "PRICE"
      ? calculatePricePayment(initialDebt, monthlyInterestRate, termMonths)
      : 0;

  const schedule: Installment[] = [];

  for (let month = 1; month <= termMonths; month++) {
    const initialBalance = currentBalance;

    const correctedBalance = initialBalance * (1 + trEstimated / 100);

    const interest = correctedBalance * monthlyInterestRate;

    const amortization =
      amortizationSystem === "SAC"
        ? Math.min(currentBaseAmortization, correctedBalance)
        : Math.min(
            Math.max(currentPricePayment - interest, 0),
            correctedBalance,
          );

    const regularInstallment = amortization + interest + totalFees;

    const rawExtraPayment = getExtraPaymentForMonth(month, extraPayments);

    const extraPayment = Math.min(
      rawExtraPayment,
      Math.max(0, correctedBalance - amortization),
    );

    currentBalance = Math.max(
      0,
      correctedBalance - amortization - extraPayment,
    );

    schedule.push({
      month,
      initialBalance: roundMoney(initialBalance),
      correctedBalance: roundMoney(correctedBalance),
      interest: roundMoney(interest),
      amortization: roundMoney(amortization),
      fees: roundMoney(totalFees),
      extraPayment: roundMoney(extraPayment),
      totalInstallment: roundMoney(regularInstallment),
      totalMonthPayment: roundMoney(regularInstallment + extraPayment),
      finalBalance: roundMoney(currentBalance),
    });

    if (currentBalance <= 0) break;

    if (hasReduceInstallmentStrategy(month, extraPayments)) {
      const nextRemainingMonths = termMonths - month;

      if (nextRemainingMonths > 0) {
        if (amortizationSystem === "SAC") {
          currentBaseAmortization = currentBalance / nextRemainingMonths;
        }

        if (amortizationSystem === "PRICE") {
          currentPricePayment = calculatePricePayment(
            currentBalance,
            monthlyInterestRate,
            nextRemainingMonths,
          );
        }
      }
    }
  }

  return schedule;
};

export const compareScenarios = (
  input: SimulationInput,
): ScenarioComparison => {
  const baseInput: SimulationInput = {
    ...input,
    extraPayment: undefined,
    extraPayments: [],
  };

  const baseSchedule = calculateAmortization(baseInput);
  const acceleratedSchedule = calculateAmortization(input);

  const baseSummary = calculateSummary(baseSchedule);
  const acceleratedSummary = calculateSummary(acceleratedSchedule);

  return {
    baseSchedule,
    acceleratedSchedule,
    baseSummary,
    acceleratedSummary,
    interestSaved: roundMoney(
      baseSummary.totalInterest - acceleratedSummary.totalInterest,
    ),
    totalSaved: roundMoney(
      baseSummary.totalPaid - acceleratedSummary.totalPaid,
    ),
    monthsSaved: baseSummary.term - acceleratedSummary.term,
  };
};
