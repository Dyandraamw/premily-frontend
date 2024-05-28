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

// function createData(instalment_id,instalment_number, due_date, amount) {
//   return {instalment_id,instalment_number, due_date, amount};
// }

// const instalment_data = [
//   createData('INS-001',1, dayjs("04/04/2025").format("DD/MM/YYYY"), 100),
//   createData('INS-002',2, dayjs("01/01/2026").format("DD/MM/YYYY"), 100),
// ];

export default function addAdjustmentModal({
  modalState,
  handleCloseModal,
  instalment_data,
}) {
  const arr_length = instalment_data.length;
  const [adjustment, setAdjustment] = useState({
    payment_status_id: "PS-001",
    adjustment_id: "ADJ-001",
    adjustment_title: "",
    adjustment_amount: new Array(arr_length).fill(0),
  });

  const handleTextfield = (e) => {
    setAdjustment({
      ...adjustment,
      [e.target.id]: e.target.value,
    });
  };

  const handleAmount = (e, i) => {
    let arr = adjustment.adjustment_amount;
    arr[i] = e.target.value;
    setAdjustment({
      ...adjustment,
      adjustment_amount: arr,
    });
  };

  const handleDate = (e) => {
    const dateformat = dayjs(e.$d).format("DD/MM/YYYY");
    setAdjustment({
      ...adjustment,
      payment_date: dateformat,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //   console.log(adjustment);
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
                  Add Adjustment
                </h1>
                <p className="flex w-full justify-center font-medium text-md text-gray-500">
                  Input adjustment details into statement of account
                </p>
              </div>
              <div className="mx-5">
                <Textfield
                  label={"Adjustment Title"}
                  id={"adjustment_title"}
                  placeholder={"Insert adjustment title..."}
                  onChange={handleTextfield}
                  value={adjustment.adjustment_title}
                />
                <p className="text-xl font-bold mt-5">Instalment</p>
                <div className="  border-2 rounded-lg mt-5 mb-3">
                  <ThemeProvider theme={theme}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">No.</TableCell>
                            <TableCell align="left">Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {instalment_data.map((row, i) => (
                            <TableRow
                              key={row.instalment_id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.instalment_number}
                              </TableCell>
                              <TableCell align="left">
                                <Textfield
                                  id={"adjustment_amount"}
                                  placeholder={"Insert adjustment amount..."}
                                  onChange={(e) => handleAmount(e, i)}
                                  value={adjustment.adjustment_amount[i]}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ThemeProvider>
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
