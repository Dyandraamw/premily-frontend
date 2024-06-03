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
import Link from "next/link";


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
              <TableCell align="left">
                Invoice Number</TableCell>
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
                <TableCell component="th" scope="row"><Link className="hover:font-semibold hover:text-green-700" href={'/invoiceList/'+row.invoice_id}>
                  {row.invoice_id}</Link>
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
