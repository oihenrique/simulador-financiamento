import { z } from "zod";

const extraPaymentSchema = z.object({
  enabled: z.boolean().default(false),

  amount: z.number().min(0).default(0),

  startMonth: z.number().int().min(1).default(1),

  strategy: z
    .enum(["REDUCE_TERM", "REDUCE_INSTALLMENT"])
    .default("REDUCE_TERM"),
});

export const simulatorSchema = z
  .object({
    imovelValue: z
      .number({ error: "O valor do imóvel deve ser um número." })
      .positive("O valor do imóvel deve ser um número positivo.")
      .min(10000, "Valor muito baixo."),
    downPayment: z
      .number({ error: "O valor da entrada deve ser um número." })
      .positive("O valor da entrada deve ser um número positivo.")
      .min(1000, "Valor muito baixo."),
    subsidy: z
      .number({ error: "O valor do subsídio deve ser um número." })
      .min(0, "Valor não pode ser negativo.")
      .default(0),
    annualInterestRate: z
      .number()
      .positive("A taxa de juros deve ser um número positivo.")
      .max(20, "Taxa de juros muito alta para a simulação."),
    termMonths: z
      .number()
      .int()
      .min(1, "O prazo deve ser de pelo menos 1 mês.")
      .max(420, "O prazo máximo é de 420 meses (35 anos)."),
    amortizationSystem: z.enum(["SAC", "PRICE"], {
      error: "O sistema de amortização deve ser 'SAC' ou 'PRICE'.",
    }),
    trEstimated: z.number().default(0),
    fees: z.object({
      monthlyAdminFee: z.number().min(0).default(25),
      insuranceFee: z.number().min(0).default(0),
    }),
    extraPayment: extraPaymentSchema.optional(),
  })
  .refine((data) => data.downPayment + data.subsidy < data.imovelValue, {
    message:
      "A soma da entrada e do subsídio deve ser menor que o valor do imóvel.",
    path: ["downPayment"],
  });

export type SimulatorFormInput = z.input<typeof simulatorSchema>;
export type SimulatorFormData = z.output<typeof simulatorSchema>;
