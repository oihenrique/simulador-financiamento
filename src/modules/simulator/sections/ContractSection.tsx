import { Paper } from "@mui/material";
import { SimulatorForm } from "../components/SimulatorForm";
import { SimulatorFormData } from "../schemas/simulatorSchema";

interface ContractSectionProps {
  onSimulate: (data: SimulatorFormData) => void;
}

export const ContractSection = ({ onSimulate }: ContractSectionProps) => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <SimulatorForm onSimulate={onSimulate} />
    </Paper>
  );
};
