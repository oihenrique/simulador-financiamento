import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
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

interface ExtraPaymentSectionProps {
  register: UseFormRegister<SimulatorFormInput>;
  watch: UseFormWatch<SimulatorFormInput>;
  errors: FieldErrors<SimulatorFormData>;
}

export const ExtraPaymentSection = ({
  register,
  watch,
  errors,
}: ExtraPaymentSectionProps) => {
  const extraPaymentEnabled = watch("extraPayment.enabled");

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Accordion elevation={0} disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Aporte Extra
          </Typography>
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
    </Paper>
  );
};
