import { Installment, SimulationInput } from "../types/simulation.types";

/**
 * Calculates the amortization schedule based on SAC or PRICE systems,
 * considering monthly TR correction and MCMV specific fees.
 */
export const calculateAmortization = (
  input: SimulationInput,
): Installment[] => {
  const {
    imovelValue,
    downPayment,
    subsidy,
    annualInterestRate,
    termMonths,
    amortizationSystem,
    trEstimated,
    fees,
  } = input;

  // Initial Debt: Value - (Entry + Subsidy)
  let currentBalance = imovelValue - (downPayment + subsidy);

  // Monthly Interest Rate: (1 + i_annual)^(1/12) - 1
  const monthlyInterestRate =
    Math.pow(1 + annualInterestRate / 100, 1 / 12) - 1;
  const totalFees = fees.monthlyAdminFee + fees.insuranceFee;

  const schedule: Installment[] = [];

  for (let month = 1; month <= termMonths; month++) {
    const initialBalance = currentBalance;

    // 1. Monetary Correction (TR) - Corrects the balance BEFORE interest and amortization
    const correctedBalance = initialBalance * (1 + trEstimated);

    // 2. Interest calculation over corrected balance
    const interest = correctedBalance * monthlyInterestRate;

    let amortization = 0;

    if (amortizationSystem === "SAC") {
      // SAC: Constant amortization over the initial principal
      const baseAmortization =
        (imovelValue - (downPayment + subsidy)) / termMonths;
      amortization = Math.min(baseAmortization, correctedBalance);
    } else {
      // PRICE: Calculate PMT (Principal + Interest)
      // Formula: PMT = SD * [i(1+i)^n] / [(1+i)^n - 1]
      const remainingMonths = termMonths - month + 1;
      const pmt =
        correctedBalance *
        ((monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, remainingMonths)) /
          (Math.pow(1 + monthlyInterestRate, remainingMonths) - 1));
      amortization = pmt - interest;
    }

    // 3. Final Installment (Amortization + Interest + Fees)
    const totalInstallment = amortization + interest + totalFees;

    // 4. Update Balance
    currentBalance = Math.max(0, correctedBalance - amortization);

    schedule.push({
      month,
      initialBalance: Number(initialBalance.toFixed(2)),
      correctedBalance: Number(correctedBalance.toFixed(2)),
      interest: Number(interest.toFixed(2)),
      amortization: Number(amortization.toFixed(2)),
      fees: Number(totalFees.toFixed(2)),
      totalInstallment: Number(totalInstallment.toFixed(2)),
      finalBalance: Number(currentBalance.toFixed(2)),
    });

    // Safety break if debt is cleared before the term
    if (currentBalance <= 0) break;
  }

  return schedule;
};
