import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Textfield from "../../textfield";
import DatePickerMUI from "../../datePickerMUI";
import Modal from "@mui/material/Modal";
import SelectField from "../../selectField";
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

export default function addPayment({
  modalState,
  handleCloseModal,
  instalment_data,
}) {
  const [paymentDetails, setPaymentDetails] = useState({
    payment_detail_id: "PD-001",
    instalment_id: instalment_data[0].instalment_id,
    payment_date: "",
    payment_amount: 0,
  });

  const handleTextfield = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleDate = (e) => {
    const dateformat = dayjs(e.$d).format("DD/MM/YYYY")
    setPaymentDetails({
      ...paymentDetails,
      payment_date: dateformat,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSelect = (e) => {
    setPaymentDetails({
        ...paymentDetails,
        instalment_id: e,
      });
  };

  console.log(paymentDetails)
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
                  Add Payment
                </h1>
                <p className="flex w-full justify-center font-medium text-md text-gray-500">
                Input payment details for payment status
                </p>
              </div>
              <div className="mx-5">
                <div className="w-1/2 mt-5">
                  <div>
                    <label
                      for="instalment_id"
                      className="block text-black text-lg font-bold mb-2"
                    >
                      Select Instalment
                    </label>
                    <select
                      id="instalment_id"
                      name="instalment_id"
                      className="drop-shadow-md  focus:border-green-700 focus:border-[3px]  border-[2.5px] border-gray-500 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) => handleSelect(e.target.value)}
                    >
                      {instalment_data.map((opt) => (
                        <option value={opt.instalment_id}>{opt.instalment_number}</option>
                      ))}
                    </select>
                  </div>
                  <DatePickerMUI
                    bigLabel={"Payment Date"}
                    label={"Input Date"}
                    onChange={handleDate}
                  />
                  <Textfield
                    label={"Payment Amount"}
                    id={"payment_amount"}
                    placeholder={"Insert payment amount..."}
                    onChange={handleTextfield}
                    value={paymentDetails.payment_amount}
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
