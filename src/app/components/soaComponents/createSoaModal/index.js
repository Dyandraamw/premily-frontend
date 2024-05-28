import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Textfield from "../../textfield";
import DatePickerMUI from "../../datePickerMUI";
import Modal from "@mui/material/Modal";

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

export default function createSoaModal({ modalState, handleCloseModal }) {
  const [statementOfAccount, setStatementOfAccount] = useState({
    soa_id: "SOA-001",
    name_of_insured: "",
  });

  const handleTextfield = (e) => {
    setStatementOfAccount({
      ...statementOfAccount,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
                  Create a Statement of Account
                </h1>
                <p className="flex w-full justify-center font-medium text-md text-gray-500">
                  Input detail to create a new statement of account
                </p>
              </div>
              <div className="mx-5">
                <div className="w-1/2 mt-5">
                  <Textfield
                    label={"Statement of Account Number"}
                    id={"soa_id"}
                    placeholder={"insert soa number..."}
                    onChange={handleTextfield}
                    value={statementOfAccount.soa_id}
                  />
                  <Textfield
                    label={"Name of Insured"}
                    id={"name_of_insured"}
                    placeholder={"Insert name of insured..."}
                    onChange={handleTextfield}
                    value={statementOfAccount.name_of_insured}
                  />
                </div>
                <div className="flex justify-between ">
                  <DatePickerMUI
                    bigLabel={"Period of Policy"}
                    label={"start date"}
                  />

                  <p className="flex justify-center mt-10 text-black text-lg font-bold w-1/3">
                    to
                  </p>
                  <DatePickerMUI bigLabel={<p>&nbsp;</p>} label={"end date"} />
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
