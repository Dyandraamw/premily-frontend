import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Textfield from "../../textfield";
import DatePickerMUI from "../../datePickerMUI";
import Modal from "@mui/material/Modal";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Radio from "@mui/material/Radio";
import dayjs from "dayjs";
import { addItemApi } from "@/app/utils/api/soaApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

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

function createData(instalment_id, instalment_number, due_date, amount) {
  return { instalment_id, instalment_number, due_date, amount };
}

// const instalment_data = [
//   createData("INS-001", 1, dayjs("04/04/2025").format("DD/MM/YYYY"), 100),
//   createData("INS-002", 2, dayjs("01/01/2026").format("DD/MM/YYYY"), 100),
// ];

export default function addItemModal({
  setSelectedValue,
  handleModalRadio,
  selectedValue,
  modalState,
  handleCloseModal,
  statementOfAccount,
  setStatementOfAccount,
  insDetail,
  // handleCurrency,
  soa_id,
}) {
  //   const [statementOfAccount, setStatementOfAccount] = useState({
  //     invoice_id: selectedValue,
  //     instalment_id: "",
  //     payment_date: "",
  //     payment_amount: 0,
  //   });
  const [instalment_data, setData] = useState([]);

  console.log(insDetail);
  const handleTextfield = (e) => {
    setStatementOfAccount({
      ...statementOfAccount,
      payment_amount: parseInt(e.target.value),
    });
  };

  const handleDate = (e) => {
    const dateformat = dayjs(e.$d).format("YYYY-MM-DD");
    setStatementOfAccount({
      ...statementOfAccount,
      payment_date: dateformat,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let itemForm = new FormData();
    itemForm.append("invoice_id", statementOfAccount.invoice_id);
    itemForm.append("payment_date", statementOfAccount.payment_date);
    itemForm.append("payment_amount", statementOfAccount.payment_amount);
    itemForm.append(
      "installment_standing",
      statementOfAccount.installment_standing
    );
    // itemForm.append("payment_currency", statementOfAccount.payment_currency);

    await addItemApi(soa_id, itemForm);
    handleCloseModal();
    window.location.replace("/soaList/" + soa_id);
  };

  //console.log(statementOfAccount)
  return (
    <div>
      <Modal
        open={modalState}
        // onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <button
              onClick={handleCloseModal}
              className="flex justify-end w-full text-xl font-bold  hover:text-green-700"
            >
              X
            </button>
            <div className="">
              <div>
                <h1 className="flex w-full justify-center text-2xl  font-semibold">
                  Add Item Details
                </h1>
                <p className="flex w-full justify-center font-medium text-md text-gray-500">
                  Input item details into statement of account
                </p>
              </div>
              <div className="mx-5">
                <p className="text-xl font-bold mt-5">Instalment</p>
                <div className="  border-2 rounded-lg mt-5 mb-3">
                  <ThemeProvider theme={theme}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left">No.</TableCell>
                            <TableCell align="left">Due Date</TableCell>
                            <TableCell align="left">Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {insDetail.map((row, idx) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">
                                <Radio
                                  checked={idx + 1 == selectedValue}
                                  onChange={handleModalRadio}
                                  value={idx + 1}
                                />
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {idx + 1}
                              </TableCell>
                              <TableCell align="left">
                                {dayjs(row.Due_Date).format("DD/MM/YYYY")}
                              </TableCell>
                              <TableCell align="left">
                                {row.Ins_Amount}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ThemeProvider>
                </div>
                <p className="text-xl font-bold">Payment Details</p>
                <div className="grid grid-cols-2 ">
                  <DatePickerMUI
                    bigLabel={"Payment Date"}
                    label={"Payment date"}
                    onChange={handleDate}
                  />
                  <Textfield
                    label={"Payment Amount"}
                    id={"payment_amount"}
                    placeholder={"Insert payment amount..."}
                    onChange={handleTextfield}
                    value={statementOfAccount.amount}
                  />
                </div>
                {/* <div>
                  <h2 className="font-bold text-lg">Payment Currency</h2>
                  <select
                    id="payment_currency"
                    name="payment_currency"
                    className="drop-shadow-md focus:border-green-700 focus:border-[3px] border-[2.5px] border-gray-500 rounded-lg  h-[40px]  text-gray-700  focus:outline-none focus:shadow-outline mt-2"
                    placeholder="sort"
                    onChange={handleCurrency}
                    defaultValue="currencyHeader"
                  >
                    <option value="currencyHeader" disabled>
                      Currency
                    </option>
                    <option value="USD">USD</option>
                    <option value="IDR">IDR</option>
                  </select>
                </div> */}

                <button
                  type="submit"
                  className=" w-full my-5 p-2 px-4 border-[3px] drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
