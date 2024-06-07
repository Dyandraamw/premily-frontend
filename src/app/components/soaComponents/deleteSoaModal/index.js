import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Textfield from "../../textfield";
import DatePickerMUI from "../../datePickerMUI";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";

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
  detailSoaModal,
  handleCloseModal,
  detailStatementOfAccount,
  setdetailStatementOfAccount,
}) {
  // const handleTextfield = (e) => {
  //   setEditStatementOfAccount({
  //     ...editStatementOfAccount,
  //     [e.target.id]: e.target.value,
  //   });
  // };

  // const handleDateStart = (e) => {
  //   const dateformat = dayjs(e.$d).format("YYYY-MM-DD");
  //   setEditStatementOfAccount({
  //     ...editStatementOfAccount,
  //     period_start: dateformat,
  //   });
  // };

  // const handleDateEnd = (e) => {
  //   const dateformat = dayjs(e.$d).format("YYYY-MM-DD");
  //   setEditStatementOfAccount({
  //     ...editStatementOfAccount,
  //     period_end: dateformat,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // console.log(editStatementOfAccount.payment_start)
  return (
    <div>
      <Modal
        open={detailSoaModal}
        // onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            {/* <button
              onClick={handleCloseModal}
              className="flex justify-end w-full text-xl font-bold  hover:text-green-700"
            >
              X
            </button> */}
            <div className="">
              <div>
                <h1 className="flex w-full justify-center text-2xl  font-semibold">
                  Delete Statement of Account
                </h1>
                <p className=" w-full text-center justify-center font-medium text-md text-gray-500">
                  Are you sure you want to delete Statement of Account number <b>{detailStatementOfAccount.soa_id}</b> 
                </p>
              </div>
              <div className="mx-5">
                {/* <div className="w-1/2 mt-5">
                  <Textfield
                    label={"Statement of Account Number"}
                    id={"soa_id"}
                    placeholder={"insert soa number..."}
                    disabled={true}
                    onChange={handleTextfield}
                    value={editStatementOfAccount.soa_id}
                  />
                  <Textfield
                    label={"Name of Insured"}
                    id={"name_of_insured"}
                    placeholder={"Insert name of insured..."}
                    onChange={handleTextfield}
                    value={editStatementOfAccount.name_of_insured}
                  />
                </div>
                <div className="flex justify-between ">
                  <DatePickerMUI
                    bigLabel={"Period of Policy"}
                    label={"start date"}
                    onChange={handleDateStart}
                    dateValue={dayjs(editStatementOfAccount.period_start)}
                  />

                  <p className="flex justify-center mt-10 text-black text-lg font-bold w-1/3">
                    to
                  </p>
                  <DatePickerMUI
                    bigLabel={<p>&nbsp;</p>}
                    label={"end date"}
                    onChange={handleDateEnd}
                    dateValue={dayjs(editStatementOfAccount.period_end)}
                  />
                </div> */}
                <div className="flex justify-between">
                  <button onClick={handleCloseModal} className="w-1/2 my-5 mx-1 p-2 px-4 border-[3px] drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-slate-700 border-slate-700">
                    Cancel
                  </button>
                  <button className="w-1/2 my-5 mx-1 p-2 px-4 border-[3px] drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-red-600 border-red-600">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
