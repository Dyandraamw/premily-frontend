"use client";
import React, { useState } from "react";
import AddItem from "../../../../components/soaComponents/addItem";
import dayjs from "dayjs";
import Link from "next/link";
import AddItemModal from "../../../../components/soaComponents/addItemModal";

const tableData = [
  {
    invoice_id: "CN-001",
    recipient: "PT.Garuda Indonesia",
    issued_date: dayjs("05/07/2024").format("DD/MM/YYYY"),
    start_date: dayjs("05/07/2024").format("DD/MM/YYYY"),
    end_date: dayjs("10/08/2025").format("DD/MM/YYYY"),
    amount: 1000,
  },
  {
    invoice_id: "CN-002",
    recipient: "PT.Sriwijaya",
    issued_date: dayjs("05/07/2024").format("DD/MM/YYYY"),
    start_date: dayjs("05/07/2024").format("DD/MM/YYYY"),
    end_date: dayjs("10/08/2025").format("DD/MM/YYYY"),
    amount: 1000,
  },
  {
    invoice_id: "CN-003",
    recipient: "PT.KLM",
    issued_date: dayjs("05/07/2024").format("DD/MM/YYYY"),
    start_date: dayjs("05/07/2024").format("DD/MM/YYYY"),
    end_date: dayjs("10/08/2025").format("DD/MM/YYYY"),
    amount: 1000,
  },
  {
    invoice_id: "DN-005",
    recipient: "PT.Citilink",
    issued_date: dayjs("05/07/2024").format("DD/MM/YYYY"),
    start_date: dayjs("05/07/2024").format("DD/MM/YYYY"),
    end_date: dayjs("10/08/2025").format("DD/MM/YYYY"),
    amount: 1000,
  },
  {
    invoice_id: "DN-006",
    recipient: "PT.Lion Air",
    issued_date: dayjs("05/07/2024").format("DD/MM/YYYY"),
    start_date: dayjs("05/07/2024").format("DD/MM/YYYY"),
    end_date: dayjs("10/08/2025").format("DD/MM/YYYY"),
    amount: 1000,
  },
];

export default function soaAddItem() {
  const [selectedValue, setSelectedValue] = useState(0);
  const [statementOfAccount, setStatementOfAccount] = useState({
    invoice_id: "",
    instalment_id: "",
    payment_date: "",
    payment_amount: 0,
  });

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
    setStatementOfAccount({
      ...statementOfAccount,
      invoice_id: e.target.value,
    });
  };

  const [modalState, setModalState] = useState(false);
  const handleOpenModal = () => setModalState(true);
  const handleCloseModal = () => setModalState(false);

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <AddItemModal
        modalState={modalState}
        handleCloseModal={handleCloseModal}
        statementOfAccount={statementOfAccount}
        setStatementOfAccount={setStatementOfAccount}
      />
      <div className="flex justify-between mb-2">
        <div className="">
          <h1 className="text-4xl text-green-700 font-bold">
            Statement of Account {">"} Add Item
          </h1>
          <p className="ml-1 font-medium text-gray-600">
            Add Invoice and Installment into Statement of Account
          </p>
        </div>
      </div>
      <div className="bg-white drop-shadow-lg rounded-xl w-min-[1500px] w-max-full mt-5 p-5 h-[900px] overflow-y-auto">
        <p className="ml-1 text-lg font-semibold text-black">Select Invoice</p>
        <AddItem
          tableData={tableData}
          selectedValue={selectedValue}
          handleRadioChange={handleRadioChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleOpenModal}
          className="p-2 px-4 border-[3px] mt-2 drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
