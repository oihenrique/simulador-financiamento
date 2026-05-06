import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Installment } from "../types/simulation.types";

interface Props {
  installments: Installment[];
}

const tableHeaders = [
  { label: "Mês", align: "left" },
  { label: "Parcela", align: "right" },
  { label: "Juros", align: "right" },
  { label: "Amortização", align: "right" },
  { label: "Saldo\nDevedor", align: "right" },
  { label: "Saldo\nCorrigido", align: "right" },
  { label: "Taxas", align: "right" },
  { label: "Total Pago\nno Mês", align: "right" },
  { label: "Aporte\nExtra", align: "right" },
] as const;

export const EvolutionTable = ({ installments }: Props) => {
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Evolução Mensal das Parcelas
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: 0.82,
          }}
        >
          Acompanhe a evolução do saldo devedor e amortização ao longo do tempo.
        </Typography>
      </Box>

      <TableContainer
        sx={{
          width: "100%",
          maxHeight: 520,
          overflowX: "auto",
          overflowY: "auto",
        }}
      >
        <Table
          stickyHeader
          size="small"
          aria-label="tabela de amortização"
          sx={{
            minWidth: 1080,
          }}
        >
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell
                  key={header.label}
                  align={header.align}
                  sx={{
                    fontWeight: 800,
                    color: "primary.text",
                    borderBottom: "1px solid",
                    borderColor: "primary.main",
                    py: 1.5,
                    whiteSpace: "pre-line",
                    lineHeight: 1.25,
                    minWidth: header.label === "Mês" ? 0 : 90,
                  }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {installments.map((row, index) => {
              const hasExtraPayment = row.extraPayment > 0;

              return (
                <TableRow
                  key={row.month}
                  hover
                  sx={{
                    bgcolor:
                      index % 2 === 0
                        ? "background.paper"
                        : "rgba(21, 94, 239, 0.035)",

                    "&:hover": {
                      bgcolor: "rgba(21, 94, 239, 0.08)",
                    },

                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.month}º
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatCurrency(row.totalInstallment)}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      color: "text.secondary",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatCurrency(row.interest)}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatCurrency(row.amortization)}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 800,
                      color: "primary.main",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatCurrency(row.finalBalance)}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      color: "text.secondary",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatCurrency(row.correctedBalance)}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      color: "text.secondary",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatCurrency(row.fees)}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatCurrency(row.totalMonthPayment)}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: hasExtraPayment ? 800 : 500,
                      color: hasExtraPayment
                        ? "success.main"
                        : "text.secondary",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatCurrency(row.extraPayment)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
