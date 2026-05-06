import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { Installment } from "../types/simulation.types";

interface Props {
  installments: Installment[];
}

export const EvolutionTable = ({ installments }: Props) => {
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 500, mt: 4, borderRadius: 2 }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          fontWeight: "bold",
          bgcolor: "primary.light",
          color: "primary.contrastText",
        }}
      >
        Evolução Mensal das Parcelas
      </Typography>
      <Table stickyHeader size="small" aria-label="tabela de amortização">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Mês</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Parcela
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Juros
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Amortização
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Saldo Devedor
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Saldo Corrigido
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Taxas
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Total Pago no Mês
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Aporte Extra
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {installments.map((row) => (
            <TableRow key={row.month} hover>
              <TableCell component="th" scope="row">
                {row.month}º
              </TableCell>
              <TableCell align="right">
                {formatCurrency(row.totalInstallment)}
              </TableCell>
              <TableCell align="right">
                {formatCurrency(row.interest)}
              </TableCell>
              <TableCell align="right">
                {formatCurrency(row.amortization)}
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {formatCurrency(row.finalBalance)}
              </TableCell>
              <TableCell align="right">
                {formatCurrency(row.correctedBalance)}
              </TableCell>
              <TableCell align="right">{formatCurrency(row.fees)}</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {formatCurrency(row.totalMonthPayment)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: row.extraPayment > 0 ? "bold" : "normal",
                  color: row.extraPayment > 0 ? "success.main" : "text.primary",
                }}
              >
                {formatCurrency(row.extraPayment)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
