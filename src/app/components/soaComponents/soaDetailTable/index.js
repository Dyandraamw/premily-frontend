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

export default function tableMUI({ tableData, handleOpenModal }) {
  return (
    <ThemeProvider theme={theme}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Invoice Number</TableCell>
              <TableCell align="left">Recipient</TableCell>
              <TableCell align="left">Instalment</TableCell>
              <TableCell align="left">Due Date</TableCell>
              <TableCell align="left">Currency</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell sx={{ color: "#757575" }} align="center">
                |
              </TableCell>
              <TableCell align="left">Payment Date</TableCell>
              <TableCell align="left">Currency</TableCell>
              <TableCell align="left">Payment Amount</TableCell>
              <TableCell align="left">Alocation</TableCell>
              <TableCell align="left">Balance</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Aging</TableCell>
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
                <TableCell align="left">{row.instalment_number}</TableCell>
                <TableCell align="left">{row.due_date}</TableCell>
                <TableCell align="left">{row.currency}</TableCell>
                <TableCell align="left">{row.amount}</TableCell>
                <TableCell sx={{ color: "#757575" }} align="center">
                  |
                </TableCell>
                <TableCell align="left">{row.payment_date}</TableCell>
                <TableCell align="left">{row.currency}</TableCell>
                <TableCell align="left">{row.payment_amount}</TableCell>
                <TableCell align="left">{row.alocation}</TableCell>
                <TableCell align="left">{row.balance}</TableCell>
                <TableCell align="left">
                  <div
                    className={
                      (row.payment_status == "Paid"
                        ? "bg-green-700"
                        : row.payment_status == "Outstanding"
                        ? "bg-yellow-600"
                        : "bg-red-700") +
                      " flex justify-center rounded-2xl p-2 text-white "
                    }
                  >
                    {row.payment_status}
                  </div>
                </TableCell>
                <TableCell align="left">{row.aging}</TableCell>
                <TableCell align="center">
                  <button
                    onClick={(e) =>
                      handleOpenModal([
                        row.soa_id_details,
                        row.invoice_id,
                        row.instalment_id,
                        row.payment_date,
                        row.payment_amount,
                      ])
                    }
                    className="p-2 px-4 border-[3px] drop-shadow-lg font-semibold text-black hover:bg-white hover:text-black rounded-lg bg-yellow-500 border-yellow-500"
                  >
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
