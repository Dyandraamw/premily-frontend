import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "dayjs";



function createData(invoice_id, recipient, issued_date, policy_period, amount) {
  return { invoice_id, recipient, issued_date, policy_period, amount };
}

const tableData = [
  createData(
    "CN-001",
    "PT. Garuda Indonesia",
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    "05/07/2024-06/08/2025",
    "$100,00"
  ),
  createData(
    "CN-001",
    "PT. Garuda Indonesia",
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    "05/07/2024-06/08/2025",
    "$100,00"
  ),
  createData(
    "CN-001",
    "PT. Garuda Indonesia",
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    "05/07/2024-06/08/2025",
    "$100,00"
  ),
  createData(
    "CN-001",
    "PT. Garuda Indonesia",
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    "05/07/2024-06/08/2025",
    "$100,00"
  ),
];

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontFamily: "inherit",
        },
        head: {
          fontWeight: 700,
        },
      },
    },
  },
});



export default function tableMUI({tableData}) {
  return (
    <ThemeProvider theme={theme}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Invoice Number</TableCell>
              <TableCell align="left">Recipient</TableCell>
              <TableCell align="left">Issued Date</TableCell>
              <TableCell align="left">Policy Period</TableCell>
              <TableCell align="left">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.invoice_id}
                </TableCell>
                <TableCell align="left">{row.recipient}</TableCell>
                <TableCell align="left">{row.issued_date}</TableCell>
                <TableCell align="left">{row.policy_period}</TableCell>
                <TableCell align="left">{row.amount}</TableCell>
                <TableCell sx={{ borderBottom: "none" }} align="center">
                  <button className="p-2 px-4 border-[3px] drop-shadow-lg font-semibold text-black hover:bg-white hover:text-black rounded-lg bg-yellow-500 border-yellow-500">
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
