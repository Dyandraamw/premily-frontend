"use client";
import Button from "@/app/components/Button.js/page";
import TablePaymentStatusDetail from "@/app/components/SelectInvoice/page";
import React, { useState } from "react";
import dayjs from "dayjs";

export default function PaymentStatusDetail() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleInvoiceSelect = (invoice_id) => {
    setSelectedInvoice(invoice_id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedInvoice) {
      console.log("Selected Invoice:", selectedInvoice);
      // Lakukan sesuatu dengan invoice yang dipilih, misalnya mengirim data ke server
    } else {
      console.log("No invoice selected");
    }
  };

  function createData(
    invoice_id,
    recipient,
    issued_date,
    policy_period,
    amount
  ) {
    return { invoice_id, recipient, issued_date, policy_period, amount };
  }

  const row = [
    createData(
      "CN-001",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      "05/07/2024-06/08/2025",
      "$100,00"
    ),
    createData(
      "CN-002",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      "05/07/2024-06/08/2025",
      "$100,00"
    ),
    createData(
      "CN-003",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      "05/07/2024-06/08/2025",
      "$100,00"
    ),
  ];

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <div className="mb-2 flex">
        <div className="justify-end">
          <h1 className="text-4xl text-green-800 font-bold">
            Payment Status Detail {">"}
          </h1>
          <p className="flex flex-col ml-1 font-medium text-gray-600">
            Select invoice to make payment status
          </p>
        </div>
        {/* <div className="ml-[660px] m-auto">
          <Button></Button>
        </div> */}
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 h-[900px] overflow-y-auto mb-5">
        <TablePaymentStatusDetail tableData={row} />
      </div>

      <div className="flex justify-end ">
        <button
          className="py-3 border-[3px] drop-shadow-lg font-semibold w-28 text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
