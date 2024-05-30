import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
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


function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.instalment_number}
          </TableCell>
          <TableCell align="left">{row.due_date}</TableCell>
          <TableCell align="left">{row.premium_inception}</TableCell>
          <TableCell align="left">{row.total}</TableCell>
          <TableCell align="left">
            <div
              className={
                (row.status == "Paid"
                  ? "bg-green-700"
                  : row.status == "Outstanding"
                  ? "bg-yellow-600"
                  : "bg-red-700") +
                " flex justify-center rounded-2xl p-2 text-white "
              }
            >
              {row.status}
            </div>
          </TableCell>
          <TableCell align="center">
            <button className="p-2 px-4 border-[3px] drop-shadow-lg font-semibold text-black hover:bg-white hover:text-black rounded-lg bg-yellow-500 border-yellow-500">
              Edit
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <div className="pl-5 ml-8">
                <ThemeProvider theme={theme}>
                  <Table size="small" aria-label="purchases">
                    <TableHead className="bg-green-700 bg-opacity-10 ">
                      <TableRow>
                        <TableCell>Payment Date</TableCell>
                        <TableCell align="left">Payment Amount (USD)</TableCell>
                        <TableCell align="left">Alocation (USD)</TableCell>
                        <TableCell align="left">Balance (USD)</TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.payment_data.map((nestedrow) =>
                        nestedrow.instalment_id == row.instalment_id ? (
                          <TableRow key={nestedrow.payment_id}>
                            <TableCell>{nestedrow.payment_date}</TableCell>
                            <TableCell align="left">
                              {nestedrow.payment_amount}
                            </TableCell>
                            <TableCell align="left">
                              {nestedrow.alocation}
                            </TableCell>
                            <TableCell align="left">
                              {nestedrow.balance}
                            </TableCell>
                            <TableCell align="right">
                              <button className="p-2 px-4 border-[3px] drop-shadow-lg font-semibold text-black hover:bg-white hover:text-black rounded-lg bg-yellow-500 border-yellow-500">
                                Edit
                              </button>
                            </TableCell>
                          </TableRow>
                        ) : null
                      )}
                    </TableBody>
                  </Table>
                </ThemeProvider>
              </div>
            </Collapse>
          </TableCell>
        </TableRow>
      </ThemeProvider>
    </React.Fragment>
  );
}


export default function paymentStatusDetailTable({instalment_data, payment_data}) {
  return (
    <ThemeProvider theme={theme}>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead className="bg-green-700 bg-opacity-10">
            <TableRow>
              <TableCell />
              <TableCell>Instalment</TableCell>
              <TableCell align="left">Due Date</TableCell>
              <TableCell align="left">Premium Inception (USD)</TableCell>
              <TableCell align="left">Total (USD)</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instalment_data.map((row) => (
              <Row key={row.name} row={row} payment_data={payment_data} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
