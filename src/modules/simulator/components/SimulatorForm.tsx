import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, TextField, Button, MenuItem, Typography } from "@mui/material";
import {
  simulatorSchema,
  SimulatorFormData,
  SimulatorFormInput,
} from "../schemas/simulatorSchema";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  onSimulate: (data: SimulatorFormData) => void;
}

export const SimulatorForm = ({ onSimulate }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SimulatorFormInput, unknown, SimulatorFormData>({
    resolver: zodResolver(simulatorSchema),
    defaultValues: {
      amortizationSystem: "SAC",
      trEstimated: 0.05, // 0.05% padrão
      fees: {
        monthlyAdminFee: 25,
        insuranceFee: 0,
      },
    },
  });

  const extraPaymentEnabled = watch("extraPayment.enabled");

  return (
    <form onSubmit={handleSubmit(onSimulate)}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Detalhes do Contrato
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Valor do Imóvel"
            type="number"
            {...register("imovelValue", { valueAsNumber: true })}
            error={!!errors.imovelValue}
            helperText={errors.imovelValue?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            select
            label="Sistema de Amortização"
            defaultValue="SAC"
            {...register("amortizationSystem")}
            error={!!errors.amortizationSystem}
            helperText={errors.amortizationSystem?.message}
          >
            <MenuItem value="SAC">SAC</MenuItem>
            <MenuItem value="PRICE">PRICE</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Taxa de Juros Anual (%)"
            type="number"
            slotProps={{ htmlInput: { step: "0.01" } }}
            {...register("annualInterestRate", { valueAsNumber: true })}
            error={!!errors.annualInterestRate}
            helperText={errors.annualInterestRate?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="TR Mensal Estimada (%)"
            type="number"
            slotProps={{ htmlInput: { step: "0.0001" } }}
            {...register("trEstimated", {
              valueAsNumber: true,
              setValueAs: (value) => Number(value) / 100,
            })}
            error={!!errors.trEstimated}
            helperText={errors.trEstimated?.message ?? "Ex.: 0,05% = 0.05"}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Prazo (Meses)"
            type="number"
            {...register("termMonths", { valueAsNumber: true })}
            error={!!errors.termMonths}
            helperText={errors.termMonths?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Valor de Entrada"
            type="number"
            {...register("downPayment", { valueAsNumber: true })}
            error={!!errors.downPayment}
            helperText={errors.downPayment?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Subsídio MCMV"
            type="number"
            {...register("subsidy", { valueAsNumber: true })}
            error={!!errors.subsidy}
            helperText={errors.subsidy?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Taxa de Adm. Mensal"
            type="number"
            {...register("fees.monthlyAdminFee", { valueAsNumber: true })}
            error={!!errors.fees?.monthlyAdminFee}
            helperText={errors.fees?.monthlyAdminFee?.message}
          />
        </Grid>

        <Grid size={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Configurar Aporte Extra</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <FormControlLabel
                    control={<Switch {...register("extraPayment.enabled")} />}
                    label="Ativar aporte extra"
                  />
                </Grid>

                {extraPaymentEnabled && (
                  <>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Valor do Aporte"
                        type="number"
                        {...register("extraPayment.amount", {
                          valueAsNumber: true,
                        })}
                        error={!!errors.extraPayment?.amount}
                        helperText={errors.extraPayment?.amount?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="Mês do Aporte"
                        type="number"
                        {...register("extraPayment.startMonth", {
                          valueAsNumber: true,
                        })}
                        error={!!errors.extraPayment?.startMonth}
                        helperText={errors.extraPayment?.startMonth?.message}
                      />
                    </Grid>

                    <Grid size={12}>
                      <TextField
                        fullWidth
                        select
                        label="Estratégia"
                        defaultValue="REDUCE_TERM"
                        {...register("extraPayment.strategy")}
                      >
                        <MenuItem value="REDUCE_TERM">Reduzir Prazo</MenuItem>

                        <MenuItem value="REDUCE_INSTALLMENT">
                          Reduzir Parcela
                        </MenuItem>
                      </TextField>
                    </Grid>
                  </>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid size={12}>
          <Button
            variant="contained"
            type="submit"
            size="large"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Simular Amortização
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
