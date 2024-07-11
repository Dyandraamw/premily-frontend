import React, { useState } from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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

export default function loadingModal({
  modalState,

  // handleCurrency,
  soa_id,
}) {

  return (
    <div>
      <Modal
        open={modalState}
        // onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <button
              onClick={handleCloseModal}
              className="flex justify-end w-full text-xl font-bold  hover:text-green-700"
            >
              X
            </button> */}
          <div className="h-[200px] ">
            <div className="flex w-full justify-center py-5">
             <CircularProgress color="success" size={110}/> 
            </div>
            <div>
              <h1 className="flex w-full justify-center text-2xl  font-semibold">
                Loading...
              </h1>
              <p className="flex w-full justify-center font-medium text-md text-gray-500">
                Please wait for your data to load!
              </p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
