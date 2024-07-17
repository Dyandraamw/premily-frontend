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
import { editAdjustmentApi } from "@/app/utils/api/psApi";

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

export default function editAdjustmentModal({
  psID,
  modalState,
  handleCloseModal,
  instalment_data,
  editAdjustment,
  setEditAdjustment,
}) {
  const handleTextfield = (e) => {
    setEditAdjustment({
      ...editAdjustment,
      [e.target.id]: e.target.value,
    });
  };

  const handleAmount = (e, i) => {
    let arr = editAdjustment.adjustment_amount;
    arr[i] = e.target.value;
    setEditAdjustment({
      ...editAdjustment,
      adjustment_amount: arr,
    });
  };

  const handleSubmit = async (title, amount, id) => {
    // editAdjustment.adjustment_id.map((adj,i)=>{
    let adjForm = new FormData();
    adjForm.append("title", title);
    adjForm.append("amount", amount);
    await editAdjustmentApi(adjForm, id, psID);
    // })
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    const adjLen = editAdjustment.adjustment_id.length;
    const adj = editAdjustment;

    for (let i = 0; i < adjLen; i++) {
      handleSubmit(
        adj.adjustment_title,
        adj.adjustment_amount[i],
        adj.adjustment_id[i]
      );
    }
  };

  //console.log(editAdjustment);
  return (
    <div>
      <Modal
        open={modalState}
        // onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleClickSubmit}>
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex justify-end w-full text-xl font-bold  hover:text-green-700"
            >
              X
            </button>
            <div className="">
              <div>
                <h1 className="flex w-full justify-center text-2xl  font-semibold">
                  Edit adjustment
                  {/* Edit adjustment {editAdjustment.adjustment_title} */}
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
                  value={editAdjustment.adjustment_title}
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
                              key={i}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {i + 1}
                              </TableCell>
                              <TableCell align="left">
                                <Textfield
                                  id={"adjustment_amount"}
                                  placeholder={"Insert adjustment amount..."}
                                  onChange={(e) => handleAmount(e, i)}
                                  value={editAdjustment.adjustment_amount[i]}
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
