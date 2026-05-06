import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import {
  simulatorSchema,
  SimulatorFormData,
  SimulatorFormInput,
} from "../schemas/simulatorSchema";
import { ContractFields } from "./ContractFields";
import { ExtraPaymentFields } from "./ExtraPaymentFields";

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
      fees: {
        monthlyAdminFee: 25,
        insuranceFee: 0,
      },
      extraPayment: {
        enabled: false,
        amount: 0,
        startMonth: 1,
        strategy: "REDUCE_TERM",
      },
    },
  });

  return (
    <form onSubmit={handleSubmit(onSimulate)}>
      <Grid container spacing={3}>
        <ContractFields register={register} errors={errors} />

        <ExtraPaymentFields register={register} watch={watch} errors={errors} />

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
