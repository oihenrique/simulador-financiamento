import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, TextField, Button, MenuItem, Typography } from "@mui/material";
import {
  simulatorSchema,
  SimulatorFormData,
  SimulatorFormInput,
} from "../schemas/simulatorSchema";

interface Props {
  onSimulate: (data: SimulatorFormData) => void;
}

export const SimulatorForm = ({ onSimulate }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SimulatorFormInput, unknown, SimulatorFormData>({
    resolver: zodResolver(simulatorSchema),
    defaultValues: {
      amortizationSystem: "SAC",
      trEstimated: 0.0005, // 0.05% padrão
      fees: {
        monthlyAdminFee: 25,
        insuranceFee: 0,
      },
    },
  });

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
