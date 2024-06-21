import React, { useState } from "react";
import Box from "@mui/material/Box";
import Textfield from "../../textfield";
import DatePickerMUI from "../../datePickerMUI";
import Modal from "@mui/material/Modal";

import dayjs from "dayjs";
import { editItemApi } from "@/app/utils/api/soaApi";

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

export default function editItemModal({
  modalState,
  handleCloseModal,
  editSoaItem,
  setEditSoaItem,
}) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let editItemForm = new FormData();
    editItemForm.append(
      "payment_date",
      dayjs(editSoaItem.payment_date).format("YYYY-MM-DD")
    );
    editItemForm.append("payment_amount", editSoaItem.payment_amount);
    await editItemApi(editSoaItem.soa_id_details, editItemForm);
  };

  //console.log(editSoaItem);
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
              type="button"
              onClick={handleCloseModal}
              className="flex justify-end w-full text-xl font-bold  hover:text-green-700"
            >
              X
            </button>
            <div className="">
              <div>
                <h1 className="flex w-full justify-center text-2xl  font-semibold">
                  Edit Item
                </h1>
                <p className="flex w-full justify-center font-medium text-md text-gray-500">
                  Edit existing Statement of Account item
                </p>
              </div>
              <div className="mx-5">
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
