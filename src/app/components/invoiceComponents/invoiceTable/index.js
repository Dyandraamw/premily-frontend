import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import Link from "next/link";
import Cookies from "js-cookie";
import useMounted from "@/app/utils/hooks/useMounted";

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

export default function tableMUI({ tableData, handleOpenModal }) {
  const mounted = useMounted();
  const currency = "IDR";
  const handleStartPeriod = (data) => {
    if (data != null) {
      const start = dayjs(data.slice(0, 10)).format("DD MMM YYYY");
      return start;
    }
    return;
  };

  const handleEndPeriod = (data) => {
    if (data != null) {
      const end = dayjs(data.slice(13, 23)).format("DD MMM YYYY");
      return end;
    }
    return;
    console.log(handleEndPeriod(data));
  };

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
                key={row.Invoice_ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link
                    className="hover:font-semibold hover:text-green-700"
                    href={"/invoiceList/" + row.Invoice_ID}
                  >
                    {row.Invoice_ID}
                  </Link>
                </TableCell>
                <TableCell align="left">{row.Recipient}</TableCell>
                <TableCell align="left">
                  {dayjs(row.Created_At).format("DD MMM YYYY")}
                </TableCell>
                <TableCell align="left">
                  {handleStartPeriod(row.Period)} -{" "}
                  {handleEndPeriod(row.Period)}
                </TableCell>
                {/* <TableCell align="left">{dayjs(row.period_start).format('DD/MM/YYYY')}-{dayjs(row.period_end).format('DD/MM/YYYY')}</TableCell> */}
                <TableCell align="left">
                  {currency} {parseInt(row.Total_Premium_Due).toLocaleString()}
                </TableCell>
                {mounted && userRole == "staff" ? null : (
                  <TableCell sx={{ borderBottom: "none" }} align="center">
                    <button
                      onClick={(e) => handleOpenModal(row.Invoice_ID)}
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
