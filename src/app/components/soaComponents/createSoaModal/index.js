import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Textfield from "../../textfield";
import DatePickerMUI from "../../datePickerMUI";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import axios from "axios";
import { createSoa } from "@/app/utils/api/soaApi";

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
    name_of_insured_soa: "",
    periode_start_soa: null,
    periode_end_soa: null,
  });
  ///////////////////////////////////////////////////

  const FormData = require("form-data");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let soaForm = new FormData();
    soaForm.append(
      "name_of_insured_soa",
      statementOfAccount.name_of_insured_soa
    );
    soaForm.append("periode_start_soa", statementOfAccount.periode_start_soa);
    soaForm.append("periode_end_soa", statementOfAccount.periode_end_soa);

    await createSoa(soaForm);
    handleCloseModal();
  };
  ///////////////////////////////////////////////////
  const handleTextfield = (e) => {
    setStatementOfAccount({
      ...statementOfAccount,
      [e.target.id]: e.target.value,
    });
  };

  const handleDateStart = (e) => {
    const dateformat = dayjs(e.$d).format("YYYY-MM-DD");
    setStatementOfAccount({
      ...statementOfAccount,
      periode_start_soa: dateformat,
    });
  };

  const handleDateEnd = (e) => {
    const dateformat = dayjs(e.$d).format("YYYY-MM-DD");
    setStatementOfAccount({
      ...statementOfAccount,
      periode_end_soa: dateformat,
    });
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
                  {/* <Textfield
                    label={"Statement of Account Number"}
                    id={"soa_id"}
                    placeholder={"insert soa number..."}
                    onChange={handleTextfield}
                    value={statementOfAccount.soa_id}
                    disabled={true}
                  /> */}
                  <Textfield
                    label={"Name of Insured"}
                    id={"name_of_insured_soa"}
                    placeholder={"Insert name of insured..."}
                    onChange={handleTextfield}
                    value={statementOfAccount.name_of_insured_soa}
                  />
                </div>
                <div className="flex justify-between ">
                  <DatePickerMUI
                    bigLabel={"Period of Policy"}
                    label={"start date"}
                    onChange={handleDateStart}
                  />

                  <p className="flex justify-center mt-10 text-black text-lg font-bold w-1/3">
                    to
                  </p>
                  <DatePickerMUI
                    bigLabel={<p>&nbsp;</p>}
                    label={"end date"}
                    onChange={handleDateEnd}
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
