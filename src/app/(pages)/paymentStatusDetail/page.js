"use client";
import React, { useState } from "react";

import TableMUI from "../../components/paymentStatusComponents/paymentStatusDetailTable";
import Textfield from "../../components/textfield";
import DatePickerMUI from "../../components/datePickerMUI";
import { FaSearch } from "react-icons/fa";
import dayjs from "dayjs";
import Link from "next/link";
import CreateSoaModal from "../../components/soaComponents/createSoaModal";
import AddPaymentModal from "../../components/paymentStatusComponents/addPaymentModal";
import AddAdjustmentModal from "../../components/paymentStatusComponents/addAdjustmentModal";

function createInstalment(
  instalment_id,
  instalment_number,
  due_date,
  premium_inception,
  total,
  status
) {
  return {
    instalment_id,
    instalment_number,
    due_date,
    premium_inception,
    total,
    status,
  };
}

function createPayment(
  payment_id,
  instalment_id,
  payment_date,
  payment_amount,
  alocation,
  balance
) {
  return {
    payment_id,
    instalment_id,
    payment_date,
    payment_amount,
    alocation,
    balance,
  };
}

const instalment_data = [
  createInstalment(
    "INS-001",
    1,
    dayjs("05/06/2024").format("DD/MM/YYYY"),
    1000,
    1000,
    "Paid"
  ),
  createInstalment(
    "INS-002",
    2,
    dayjs("05/06/2024").format("DD/MM/YYYY"),
    1000,
    1000,
    "Paid"
  ),
];

const payment_data = [
  createPayment(
    "PAY-001",
    "INS-001",
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    500,
    500,
    -500
  ),
  createPayment(
    "PAY-002",
    "INS-001",
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    500,
    500,
    0
  ),
  createPayment(
    "PAY-003",
    "INS-002",
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    500,
    500,
    -500
  ),
  createPayment(
    "PAY-004",
    "INS-002",
    dayjs("05/07/2024").format("DD/MM/YYYY"),
    500,
    500,
    0
  ),
];

export default function paymentStatusDetail({ params }) {
  const [paymentModalState, setPaymentModalState] = useState(false);
  const handleOpenPaymentModal = () => setPaymentModalState(true);
  const handleClosePaymentModal = () => setPaymentModalState(false);

  const [adjustmentModalState, setAdjustmentModalState] = useState(false);
  const handleOpenAdjustmentModal = () => setAdjustmentModalState(true);
  const handleCloseAdjustmentModal = () => setAdjustmentModalState(false);
  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <AddPaymentModal
        modalState={paymentModalState}
        handleCloseModal={handleClosePaymentModal}
        instalment_data={instalment_data}
      />
      <AddAdjustmentModal
        modalState={adjustmentModalState}
        handleCloseModal={handleCloseAdjustmentModal}
        instalment_data={instalment_data}
      />
      <div className="flex justify-between mb-2">
        <div className="">
          <h1 className="text-4xl text-green-700 font-bold">Payment Status</h1>
          <p className="ml-1 font-medium text-gray-600">
            View payment status details
          </p>
        </div>
        <div>
          <button
            onClick={handleOpenPaymentModal}
            className="p-2 px-4 border-[3px] mt-2 mr-5 drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
          >
            Add Payment
          </button>
          <button
            onClick={handleOpenAdjustmentModal}
            className="p-2 px-4 border-[3px] mt-2 drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
          >
            Add Adjustment
          </button>
        </div>
      </div>

      {/* table */}
      <div className="bg-white rounded-lg w-full mt-5 p-5 drop-shadow-xl">
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
        <p className="text-xl font-semibold mb-5">Billed Payment Terms</p>
        <TableMUI
          instalment_data={instalment_data}
          payment_data={payment_data}
        />
      </div>

      {/* summary */}
      <div className="bg-white rounded-lg w-full mt-5  px-5 drop-shadow-xl ">
        <div className="grid grid-cols-4 gap-2 pb-5 mt-5 pt-5 h-[60%]">
          <div className="drop-shadow-xl border-2 border-gray-500 border-b-[6px] bg-white  border-b-blue-600 border-opacity-60 rounded-2xl h-full p-2 mr-4">
            <h3 className="flex justify-center text-center text-lg font-bold mt-3  ">
              Premium Inception Sum
            </h3>
            <p className="flex justify-center text-center text-gray-500 mt-1 ">
              Sum of the premium inception
            </p>
            <p className="flex justify-center mb-2 text-3xl font-semibold mt-5">
              USD 200
            </p>
          </div>

          <div className="drop-shadow-xl border-2 border-gray-500 border-b-[6px] bg-white  border-b-orange-600 border-opacity-60 rounded-2xl h-full p-2 mr-4">
            <h3 className="flex justify-center text-center text-lg font-bold mt-3  ">
              Total Sum
            </h3>
            <p className="flex justify-center text-center text-gray-500 mt-1 ">
              Sum of total after adjustments
            </p>
            <p className="flex justify-center mb-2 text-3xl font-semibold mt-5">
              USD 200
            </p>
          </div>
          <div className="drop-shadow-xl border-2 border-gray-500 border-b-[6px] bg-white  border-b-violet-600 border-opacity-60 rounded-2xl h-full p-2 mr-4">
            <h3 className="flex justify-center text-center text-lg font-bold mt-3  ">
              Payment Amount Sum
            </h3>
            <p className="flex justify-center text-center text-gray-500 mt-1 ">
              Sum of all payments
            </p>
            <p className="flex justify-center mb-2 text-3xl font-semibold mt-5">
              USD 200
            </p>
          </div>
          <div className="drop-shadow-xl border-2 border-gray-500 border-b-[6px] bg-white  border-b-red-600 border-opacity-60 rounded-2xl h-full p-2 mr-4">
            <h3 className="flex justify-center text-center text-lg font-bold mt-3  ">
              Outstanding Premium Sum
            </h3>
            <p className="flex justify-center text-center text-gray-500 mt-1 ">
              Sum unpaid balance
            </p>
            <p className="flex justify-center mb-2 text-3xl font-semibold mt-5">
              USD 200
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
