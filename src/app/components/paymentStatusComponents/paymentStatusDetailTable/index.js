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
import { FaEdit } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdEdit } from "react-icons/md";
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
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell key={"icon_space"}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell key={"ins_idx"} component="th" scope="row">
            {props.instalmentidx}
          </TableCell>
          <TableCell key={"due_date_data"} align="left">
            {dayjs(row.due_date).format("DD/MM/YYYY")}
          </TableCell>
          <TableCell key={"ins_amount"} align="left">
            {parseInt(row.ins_amount).toLocaleString()}
          </TableCell>
          {props.adjustment_data.map((data, i) => (
            <TableCell key={i} align="left">
              {parseInt(
                data.adjustment_amount[props.rowIndex]
              ).toLocaleString()}
            </TableCell>
          ))}
          <TableCell key={"ins_total"} align="left">
            {parseInt(row.ins_total).toLocaleString()}
          </TableCell>
          <TableCell align="left">
            <div
              className={
                row.installment_status != ""
                  ? (row.installment_status == "PAID"
                      ? "bg-green-700"
                      : row.installment_status == "OUTSTANDING"
                      ? "bg-yellow-600"
                      : "bg-red-700") +
                    " flex justify-center rounded-2xl p-2 text-white "
                  : null
              }
            >
              {row.installment_status}
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <div className="pl-5 ml-8">
                <ThemeProvider theme={theme}>
                  <Table size="small" aria-label="purchases">
                    <TableHead className="bg-green-700 bg-opacity-10 ">
                      <TableRow key={props.instalmentidx}>
                        <TableCell>Payment Date</TableCell>
                        <TableCell align="left">Payment Amount (IDR)</TableCell>
                        <TableCell align="left">Alocation (IDR)</TableCell>
                        <TableCell align="left">Balance (IDR)</TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.payment_data.map((nestedrow, i) =>
                        nestedrow.pd_ins_id == row.installment_id ? (
                          <TableRow key={nestedrow.pay_detail_id}>
                            <TableCell>
                              {dayjs(nestedrow.pay_date).format("DD/MM/YYYY")}
                            </TableCell>
                            <TableCell align="left">
                              {parseInt(nestedrow.pay_amount).toLocaleString()}
                            </TableCell>
                            <TableCell align="left">
                              {parseInt(
                                nestedrow.pay_alocation
                              ).toLocaleString()}
                            </TableCell>
                            <TableCell align="left">
                              {parseInt(nestedrow.pay_balance).toLocaleString()}
                            </TableCell>
                            <TableCell align="right">
                              {mounted && userRole == "staff" ? null : (
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    props.handleOpenEditPaymentModal([
                                      nestedrow.pay_detail_id,
                                      nestedrow.pd_ins_id,
                                      nestedrow.pay_date,
                                      nestedrow.pay_amount,
                                    ])
                                  }
                                  className="p-2 px-4 border-[3px] drop-shadow-lg font-semibold text-black hover:bg-white hover:text-black rounded-lg bg-yellow-500 border-yellow-500"
                                >
                                  Edit
                                </button>
                              )}
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

export default function paymentStatusDetailTable({
  paymentStatus,
  instalment_data,
  payment_data,
  adjustment_data,
  handleOpenEditPaymentModal,
  handleOpenEditAdjustmentModal,
}) {
  const mounted = useMounted();
  return (
    <ThemeProvider theme={theme}>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead className="bg-green-700 bg-opacity-10">
            <TableRow>
              <TableCell key={"empty_space"} />
              <TableCell key={"instalment_space"}>Instalment</TableCell>
              <TableCell key={"due_date_space"} align="left">
                Due Date
              </TableCell>
              <TableCell key={"premium_space"} align="left">
                Premium at Inception (IDR)
              </TableCell>
              {adjustment_data.map((data) => (
                <TableCell key={data.adjustment_itr} align="left">
                  <div className="flex items-center">
                    {data.adjustment_title}
                    {mounted && userRole == "staff" ? null : (
                      <FaEdit
                        className="text-yellow-600 hover:text-gray-700 ml-2 text-2xl"
                        onClick={(e) =>
                          handleOpenEditAdjustmentModal([
                            data.adjustment_itr,
                            data.adjustment_id,
                            data.adjustment_title,
                            data.adjustment_amount,
                          ])
                        }
                      />
                    )}
                  </div>
                </TableCell>
              ))}
              <TableCell key={"total_space"} align="left">
                Total (IDR)
              </TableCell>
              <TableCell key={"status_space"} align="left">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instalment_data.map((data, index) => (
              <Row
                key={data.installment_id}
                instalmentidx={index + 1}
                row={data}
                rowIndex={index}
                payment_data={payment_data}
                adjustment_data={adjustment_data}
                handleOpenEditPaymentModal={handleOpenEditPaymentModal}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
