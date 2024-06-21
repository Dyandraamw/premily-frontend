import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Textfield from "../../textfield";
import DatePickerMUI from "../../datePickerMUI";
import Modal from "@mui/material/Modal";
import SelectField from "../../selectField";
import dayjs from "dayjs";
import { editPaymentApi } from "@/app/utils/api/psApi";

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

export default function editPayment({
  psID,
  modalState,
  handleCloseModal,
  instalment_data,
  editPayment,
  setEditPayment,
}) {
  // const [paymentDetails, setPaymentDetails] = useState({
  //   payment_detail_id: editData.payment_id ,
  //   instalment_id: instalment_data[0].instalment_id,
  //   payment_date: editData.payment_date,
  //   payment_amount: editData.payment_amount,
  // });

  const handleTextfield = (e) => {
    setEditPayment({
      ...editPayment,
      [e.target.id]: e.target.value,
    });
  };

  const handleDate = (e) => {
    const dateformat = dayjs(e.$d).format("YYYY-MM-DD");
    // console.log(e)
    setEditPayment({
      ...editPayment,
      payment_date: dateformat,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payForm = new FormData();
    payForm.append("pay_date", dayjs(editPayment.payment_date).format('YYYY-MM-DD'));
    payForm.append("pay_amount", editPayment.payment_amount);

    await editPaymentApi(payForm,editPayment.payment_id,psID)
    handleCloseModal()
  };

  // const handleSelect = (e) => {
  //   setPaymentDetails({
  //       ...paymentDetails,
  //       instalment_id: e,
  //     });
  // };

  //console.log(editPayment);
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
                  Edit {editPayment.payment_id}
                </h1>
                <p className="flex w-full justify-center font-medium text-md text-gray-500">
                  Edit selected payment details for payment status
                </p>
              </div>
              <div className="mx-5">
                <div className="w-1/2 mt-5">
                  <DatePickerMUI
                    bigLabel={"Payment Date"}
                    label={"Input Date"}
                    onChange={handleDate}
                    dateValue={dayjs(editPayment.payment_date)}
                  />
                  <Textfield
                    label={"Payment Amount"}
                    id={"payment_amount"}
                    placeholder={"Insert payment amount..."}
                    onChange={handleTextfield}
                    value={editPayment.payment_amount}
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
