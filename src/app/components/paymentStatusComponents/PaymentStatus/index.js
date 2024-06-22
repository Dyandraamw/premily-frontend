import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Link from "next/link";
import dayjs from "dayjs";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Cookies from "js-cookie";

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

const userRole = Cookies.get("userRole");

export default function TablePaymentStatus({
  tableData,
  handleOpenDetailPsModal,
}) {
  return (
    <ThemeProvider theme={theme}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Payment Status Number</TableCell>
              <TableCell align="left">Invoice Number</TableCell>
              <TableCell align="left">Invoice Recipient</TableCell>
              <TableCell align="left">Policy Period</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link
                    className="hover:font-semibold hover:text-green-700"
                    href={"/paymentStatus/" + row.payment_status_id}
                  >
                    {row.payment_status_id}
                  </Link>
                </TableCell>
                <TableCell align="left">{row.invoice_id}</TableCell>
                <TableCell align="left">{row.invoice}</TableCell>
                <TableCell align="left">
                  {" "}
                  {dayjs(row.period_start).format("DD/MM/YYYY")}-
                  {dayjs(row.period_end).format("DD/MM/YYYY")}
                </TableCell>
                {userRole == "staff" ? null : (
                  <TableCell sx={{ borderBottom: "none" }} align="center">
                    <button
                      onClick={(e) =>
                        handleOpenDetailPsModal([
                          row.payment_status_id,
                          row.invoice_id,
                          row.invoice_recipient,
                          row.period_start,
                          row.period_end,
                        ])
                      }
                      className="p-2 px-4 border-[3px] drop-shadow-lg font-semibold text-white hover:bg-white hover:text-black rounded-lg bg-red-600 border-red-600"
                    >
                      Delete
                    </button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
