import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import {
  SimulatorFormData,
  SimulatorFormInput,
} from "../schemas/simulatorSchema";

interface ExtraPaymentFieldsProps {
  register: UseFormRegister<SimulatorFormInput>;
  watch: UseFormWatch<SimulatorFormInput>;
  errors: FieldErrors<SimulatorFormData>;
}

export const ExtraPaymentFields = ({
  register,
  watch,
  errors,
}: ExtraPaymentFieldsProps) => {
  const extraPaymentEnabled = watch("extraPayment.enabled");
  const extraPaymentType = watch("extraPayment.type");

  return (
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
                <Grid size={12}>
                  <TextField
                    fullWidth
                    select
                    label="Tipo de Aporte"
                    defaultValue="SINGLE"
                    {...register("extraPayment.type")}
                  >
                    <MenuItem value="SINGLE">Aporte único</MenuItem>
                    <MenuItem value="RECURRING">Aporte recorrente</MenuItem>
                  </TextField>
                </Grid>

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

                {extraPaymentType === "RECURRING" && (
                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextField
                      fullWidth
                      label="Frequência em Meses"
                      type="number"
                      {...register("extraPayment.frequencyMonths", {
                        valueAsNumber: true,
                      })}
                      error={!!errors.extraPayment?.frequencyMonths}
                      helperText={errors.extraPayment?.frequencyMonths?.message}
                    />
                  </Grid>
                )}

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
  );
};
