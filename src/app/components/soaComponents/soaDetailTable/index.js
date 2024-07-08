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
export default function tableMUI({ tableData, handleOpenModal, calcValues }) {
  const mounted = useMounted();
  const handleAging = (data, bal) => {
    if (bal >= 0) {
      return "-";
    }
    const curr = dayjs();
    const days = curr.diff(data, "day");

    return days;
  };

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
            {tableData.map((row, i) => (
              <TableRow
                key={row.SOA_Details_ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Invoice_ID}
                </TableCell>
                <TableCell align="left">{row.Recipient}</TableCell>
                <TableCell align="left">{row.Installment_Standing}</TableCell>
                <TableCell align="left">
                  {dayjs(row.Due_Date).format("DD MMM YYYY")}
                </TableCell>
                <TableCell align="left">IDR</TableCell>
                <TableCell align="left">
                  {parseInt(row.SOA_Amount).toLocaleString()}
                </TableCell>
                <TableCell sx={{ color: "#757575" }} align="center">
                  |
                </TableCell>
                <TableCell align="left">
                  {dayjs(row.Payment_Date).format("DD MMM YYYY")}
                </TableCell>
                <TableCell align="left">IDR</TableCell>
                <TableCell align="left">
                  {parseInt(row.Payment_Amount).toLocaleString()}
                </TableCell>
                <TableCell align="left">
                  {parseInt(
                    calcValues.length != 0 ? calcValues[i].alocation : null
                  ).toLocaleString()}
                </TableCell>
                <TableCell align="left">
                  {parseInt(
                    calcValues.length != 0 ? calcValues[i].balance : null
                  ).toLocaleString()}
                </TableCell>
                <TableCell align="left">
                  <div
                    className={
                      (calcValues.length != 0
                        ? calcValues[i].status == "PAID"
                          ? "bg-green-700"
                          : "bg-yellow-600"
                        : null) +
                      // (row.Status == "PAID"
                      //   ? "bg-green-700"
                      //   : row.Status == "OUTSTANDING"
                      //   ? "bg-yellow-600"
                      //   : "bg-red-700") +
                      " flex justify-center rounded-2xl p-2 text-white "
                    }
                  >
                    {calcValues.length != 0 ? calcValues[i].status : null}
                  </div>
                </TableCell>
                <TableCell align="left">
                  {calcValues.length != 0
                    ? handleAging(row.Due_Date, calcValues[i].balance)
                    : null}
                </TableCell>
                {mounted && userRole == "staff" ? null : (
                  <TableCell align="center">
                    <button
                      onClick={(e) =>
                        handleOpenModal([
                          row.SOA_Details_ID,
                          row.Invoice_ID,
                          row.Installment_Standing,
                          row.Payment_Date,
                          row.Payment_Amount,
                        ])
                      }
                      className="p-2 px-4 border-[3px] drop-shadow-lg font-semibold text-black hover:bg-white hover:text-black rounded-lg bg-yellow-500 border-yellow-500"
                    >
                      Edit
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
