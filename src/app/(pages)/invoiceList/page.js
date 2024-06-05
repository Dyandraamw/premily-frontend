"use client";
import React, { useState } from "react";

import TableMUI from "../../components/invoiceComponents/invoiceTable";
import Textfield from "../../components/textfield";
import SideTextfield from "../../components/sideTextfield";
import DatePickerMUI from "../../components/datePickerMUI";
import { FaSearch } from "react-icons/fa";
import dayjs from "dayjs";

export default function invoiceList() {
  function createData(
    invoice_id,
    recipient,
    issued_date,
    policy_period,
    amount
  ) {
    return { invoice_id, recipient, issued_date, policy_period, amount };
  }

  const invoices = [
    createData(
      "CN-001",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      "05/07/2024-06/08/2025",
      "$100,00"
    ),
    createData(
      "DN-001",
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
    createData(
      "DN-002",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      "05/07/2024-06/08/2025",
      "$100,00"
    ),
    createData(
      "CN-004",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      "05/07/2024-06/08/2025",
      "$100,00"
    ),
    createData(
      "DN-003",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      "05/07/2024-06/08/2025",
      "$100,00"
    ),
    createData(
      "DN-004",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      "05/07/2024-06/08/2025",
      "$100,00"
    ),
    createData(
      "DN-005",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      "05/07/2024-06/08/2025",
      "$100,00"
    ),
    createData(
      "DN-006",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      "05/07/2024-06/08/2025",
      "$100,00"
    ),
    createData(
      "CN-005",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      "05/07/2024-06/08/2025",
      "$100,00"
    ),
    createData(
      "CN-006",
      "PT. Alda Air",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      "05/07/2024-06/08/2025",
      "$200,00"
    ),
  ];

  // const handleSearch = (e) => {
  //   const searchVal = e.target;
  // };

  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(invoices);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    //console.log(e.target.value)
    setQuery(searchQuery);

    const filteredInvoice = invoices.filter(
      (data) =>
        data.invoice_id.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        data.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.issued_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.policy_period.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.amount.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredInvoice);
  };

  const handleSort = (e) => {
    const searchQuery = e.target.value;
    //console.log(e.target.value)
    setQuery(searchQuery);

    const filteredInvoice = invoices.filter(
      (data) =>
        data.invoice_id.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        data.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.issued_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.policy_period.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.amount.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredInvoice);
  };

  //const searchedData = handleSearch(invoices)

  // const [siData, setSiData] = useState([
  //   { item: "", sum_insured: "", notes: "" },
  // ]);

  // const handleAddSiRow = () => {
  //   setSiData([...siData,{item: "", sum_insured: "", notes: ""}])
  // };

  // const handleSiChange = (e,i) => {
  //   const {id,value} = e.target
  //   const changeValue = [...siData]
  //   changeValue[i][id] = value
  //   setSiData(changeValue)
  // };

  // const handleDeleteSiRow = () => {};
  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <div className="mb-2">
        <h1 className="text-4xl text-green-700 font-bold">List of Invoices</h1>
        <p className="ml-1 font-medium text-gray-600">
          View invoices you have made
        </p>
      </div>
      <div className="flex justify-between">
        <div className="w-1/3">
          <Textfield
            id={"search_bar"}
            placeholder={"search invoice number, recipient, amount..."}
            onChange={handleSearch}
            icon={<FaSearch />}
          />
        </div>
        <div className="w-1/3 flex justify-between ">
          <select
            id="currency"
            name="currency"
            className="drop-shadow-md focus:border-green-700 focus:border-[3px] border-[2.5px] border-gray-500 rounded-lg  h-[40px]  text-gray-700  focus:outline-none focus:shadow-outline mt-2"
            placeholder="sort"
          >
            <option value="" selected disabled>
              Sort
            </option>
            <option value="invoice_id">Asc Invoice Number</option>
            <option value="invoice_id">Des Invoice Number</option>
            <option value="issued_date">Newest Issued Date</option>
            <option value="issued_date">Oldest Issued Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 h-[900px] overflow-y-auto">
        <TableMUI tableData={filteredData} />
      </div>
    </div>
  );
}
