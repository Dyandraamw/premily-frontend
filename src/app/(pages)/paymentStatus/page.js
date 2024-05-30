"use client";
import React, { useState } from "react";

import Textfield from "../../components/textfield";
import DatePickerMUI from "../../components/datePickerMUI";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import TablePaymentStatus from "@/app/components/paymentStatusComponents/PaymentStatus";

export default function PaymentStatus() {
  function createData(
    payment_status_id,
    invoice_id,
    invoice_recipient,
    policy_period
  ) {
    return { payment_status_id, invoice_id, invoice_recipient, policy_period };
  }

  const PaymentStatus = [
    createData(
      "PS-001",
      "CN-001",
      "PT. Garuda Indonesia",
      "05/07/2024-06/08/2025"
    ),
    createData(
      "PS-002",
      "CN-002",
      "PT. Garuda Indonesia",
      "05/07/2024-06/08/2025"
    ),
  ];

  const handleSearch = (e) => {
    const searchVal = e.target;
  };

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <div className="mb-2 flex">
        <div className="justify-end">
          <h1 className="text-4xl text-green-700 font-bold">Payment Status</h1>
          <p className="flex flex-col ml-1 font-medium text-gray-600">
            View, create, and edit your payment status
          </p>
        </div>
        <div className="ml-[690px] m-auto">
          <Link href={"/SelectInvoicesPS"}>
            <button className="py-3 w-52 border-[3px] drop-shadow-lg font-semibold text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700 ">
              Create Payment Status
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-1/3">
          <Textfield
            id={"search_bar"}
            placeholder={"search Status Number..."}
            onChange={handleSearch}
            icon={<FaSearch />}
          />
        </div>
        <div className="w-1/3 flex justify-between ">
          <DatePickerMUI label={"issued date"} />
          <DatePickerMUI label={"policy period"} />
          <select
            id="currency"
            name="currency"
            className="drop-shadow-md focus:border-green-700 focus:border-[3px] border-[2.5px] border-gray-500 rounded-lg  h-[40px]  text-gray-700  focus:outline-none focus:shadow-outline mt-2"
            placeholder="sort"
          >
            <option value="" selected disabled>
              Sort
            </option>
            <option value="invoice_id">Payment Status Number</option>
            <option value="issued_date">Issued Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 h-[900px] overflow-y-auto">
        <TablePaymentStatus tableData={PaymentStatus} />
      </div>
    </div>
  );
}
