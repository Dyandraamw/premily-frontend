"use client";
import React, { useState } from "react";

import TableMUI from "../../components/soaComponents/soaDetailTable";
import Textfield from "../../components/textfield";
import SideTextfield from "../../components/sideTextfield";
import DatePickerMUI from "../../components/datePickerMUI";
import { FaSearch } from "react-icons/fa";
import dayjs from "dayjs";
import Link from "next/link";
import CreateSoaModal from "../../components/soaComponents/createSoaModal";

function createData(
  invoice_id,
  recipient,
  instalment,
  due_date,
  currency,
  amount,
  payment_date,
  payment_amount,
  alocation,
  balance,
  payment_status,
  aging
) {
  return {
    invoice_id,
    recipient,
    instalment,
    due_date,
    currency,
    amount,
    payment_date,
    payment_amount,
    alocation,
    balance,
    payment_status,
    aging,
  };
}

const soaData = [
  createData(
    "DN-001",
    "PT. Garuda Indonesia",
    1,
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    "USD",
    1000,
    dayjs("06/07/2026").format("DD/MM/YYYY"),
    1000,
    1000,
    0,
    "Paid",
    0
  ),
  createData(
    "CN-001",
    "PT. Garuda Indonesia",
    2,
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    "USD",
    1000,
    dayjs("06/07/2026").format("DD/MM/YYYY"),
    1000,
    1000,
    0,
    "Outstanding",
    0
  ),
  createData(
    "DN-001",
    "PT. Garuda Indonesia",
    1,
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    "USD",
    1000,
    dayjs("06/07/2026").format("DD/MM/YYYY"),
    1000,
    1000,
    0,
    "Overdue",
    0
  ),
  createData(
    "CN-001",
    "PT. Garuda Indonesia",
    2,
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    "USD",
    1000,
    dayjs("06/07/2026").format("DD/MM/YYYY"),
    1000,
    1000,
    0,
    "Paid",
    0
  ),createData(
    "DN-001",
    "PT. Garuda Indonesia",
    1,
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    "USD",
    1000,
    dayjs("06/07/2026").format("DD/MM/YYYY"),
    1000,
    1000,
    0,
    "Paid",
    0
  ),
  createData(
    "CN-001",
    "PT. Garuda Indonesia",
    2,
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    "USD",
    1000,
    dayjs("06/07/2026").format("DD/MM/YYYY"),
    1000,
    1000,
    0,
    "Paid",
    0
  ),
  createData(
    "DN-001",
    "PT. Garuda Indonesia",
    1,
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    "USD",
    1000,
    dayjs("06/07/2026").format("DD/MM/YYYY"),
    1000,
    1000,
    0,
    "Paid",
    0
  ),
  createData(
    "CN-001",
    "PT. Garuda Indonesia",
    2,
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    "USD",
    1000,
    dayjs("06/07/2026").format("DD/MM/YYYY"),
    1000,
    1000,
    0,
    "Paid",
    0
  ),
];
export default function statementOfAccount() {
  const handleSearch = (e) => {
    const searchVal = e.target;
  };

  const [modalState, setModalState] = useState(false);
  const handleOpenModal = () => setModalState(true);
  const handleCloseModal = () => setModalState(false);

  
  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <CreateSoaModal
        modalState={modalState}
        handleCloseModal={handleCloseModal}
      />
      <div className="flex justify-between mb-2">
        <div className="">
          <h1 className="text-4xl text-green-700 font-bold">
            Statement of Account
          </h1>
          <p className="ml-1 font-medium text-gray-600">
            View statement of account number SOA-001 details
          </p>
        </div>
        <div>
          <button
            onClick={handleOpenModal}
            className="p-2 px-4 border-[3px] mt-2 drop-shadow-lg font-medium hover:text-white bg-white text-black rounded-lg hover:bg-green-700 border-green-700 mr-5"
          >
            Edit
          </button>
          <button
            onClick={handleOpenModal}
            className="p-2 px-4 border-[3px] mt-2 drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* filters */}
      <div className="flex justify-between">
        <div className="w-1/3">
          <Textfield
            id={"search_bar"}
            placeholder={"search invoice number, recipient..."}
            onChange={handleSearch}
            icon={<FaSearch />}
          />
        </div>
        <div className="w-1/3 flex justify-between ">
          <DatePickerMUI label={"Due Date"} />
          <select
            id="currency"
            name="currency"
            className="drop-shadow-md focus:border-green-700 focus:border-[3px] border-[2.5px] border-gray-500 rounded-lg  h-[40px]  text-gray-700  focus:outline-none focus:shadow-outline mt-2"
            placeholder="sort"
          >
            <option value="" selected disabled>
              Sort
            </option>
            <option value="invoice_id">Invoice Number</option>
            <option value="issued_date">Issued Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>

      {/* table */}
      <div className="bg-white rounded-lg w-full mt-5 p-5   overflow-x-auto">
        <div className="ml-3 my-5">
            <div className="flex">
                <p className="font-semibold">Name of Insured&nbsp;</p>
                <p>:&emsp;PT.Garuda Indonesia</p>
            </div>
            <div className="flex">
                <p className="font-semibold">Policy Period&nbsp;</p>
                <p>:&emsp;05/07/2024 - 06/08/2025</p>
            </div>
            <div className="flex">
                <p className="font-semibold">Current Date&nbsp;</p>
                <p>:&emsp;{dayjs().format("DD/MM/YYYY")}</p>
            </div>
        </div>
        <TableMUI tableData={soaData} />
      </div>
    </div>
  );
}
