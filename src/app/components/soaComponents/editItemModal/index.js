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

const instalment_data = [
  createData("INS-001", 1, dayjs("04/04/2025").format("DD/MM/YYYY"), 100),
  createData("INS-002", 2, dayjs("01/01/2026").format("DD/MM/YYYY"), 100),
];

export default function editItemModal({
  modalState,
  handleCloseModal,
  editSoaItem,
  setEditSoaItem,
}) {
  //   const [statementOfAccount, setStatementOfAccount] = useState({
  //     invoice_id: selectedValue,
  //     instalment_id: "",
  //     payment_date: "",
  //     payment_amount: 0,
  //   });

  const handleTextfield = (e) => {
    setEditSoaItem({
      ...editSoaItem,
      payment_amount: e.target.value,
    });
  };

  const handleDate = (e) => {
    const dateformat = dayjs(e.$d).format("YYYY-MM-DD");
    setEditSoaItem({
      ...editSoaItem,
      payment_date: dateformat,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [insSelectedValue, setInsSelectedValue] = useState(0);

  const handleRadioChange = (e) => {
    setInsSelectedValue(e.target.value);
    setEditSoaItem({
      ...statementOfAccount,
      instalment_id: e.target.value,
    });
    // console.log(event.target.value)
  };
  console.log(editSoaItem);
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
                  Edit Item {editSoaItem.soa_id_details}
                </h1>
                <p className="flex w-full justify-center font-medium text-md text-gray-500">
                  Edit existing Statement of Account item
                </p>
              </div>
              <div className="mx-5">
                {/* <p className="text-xl font-bold mt-5">Instalment</p>
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
                          {instalment_data.map((row) => (
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
                                  checked={
                                    row.instalment_id == insSelectedValue
                                  }
                                  onChange={handleRadioChange}
                                  value={row.instalment_id}
                                />
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.instalment_number}
                              </TableCell>
                              <TableCell align="left">{row.due_date}</TableCell>
                              <TableCell align="left">{row.amount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ThemeProvider>
                </div> */}
                <p className="text-xl font-bold">Payment Details</p>
                <div className="grid grid-cols-2 ">
                  <DatePickerMUI
                    bigLabel={"Payment Date"}
                    label={"start date"}
                    onChange={handleDate}
                    dateValue={dayjs(editSoaItem.payment_date)}
                  />
                  <Textfield
                    label={"Payment Amount"}
                    id={"payment_amount"}
                    placeholder={"Insert payment amount..."}
                    onChange={handleTextfield}
                    value={editSoaItem.payment_amount}
                  />
                </div>
                <button className=" w-full my-5 p-2 px-4 border-[3px] drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700">
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
