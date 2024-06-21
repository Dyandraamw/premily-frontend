import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import axios from "axios";
import { deleteSoa } from "@/app/utils/api/soaApi";

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

export default function deleteSoaModal({
  deleteSoaModal,
  handleCloseModal,
  detailStatementOfAccount,
  setdetailStatementOfAccount,
}) {
  
  const handleDelete = async () => {
    await deleteSoa(detailStatementOfAccount)
    handleCloseModal()
  };

  // console.log(editStatementOfAccount.payment_start)
  return (
    <div>
      <Modal
        open={deleteSoaModal}
        // onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="">
            <div>
              <h1 className="flex w-full justify-center text-2xl  font-semibold">
                Delete Statement of Account
              </h1>
              <p className=" w-full text-center justify-center font-medium text-md text-gray-500">
                Are you sure you want to delete Statement of Account number{" "}
                <b>{detailStatementOfAccount}</b>
              </p>
            </div>
            <div className="mx-5">
              <div className="flex justify-between">
                <button
                  onClick={handleCloseModal}
                  className="w-1/2 my-5 mx-1 p-2 px-4 border-[3px] drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-slate-700 border-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="w-1/2 my-5 mx-1 p-2 px-4 border-[3px] drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-red-600 border-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
