"use client";
import React, { useState } from "react";

import TableMUI from "../../components/invoiceComponents/invoiceTable";
import Textfield from "../../components/textfield";
import SideTextfield from "../../components/sideTextfield";
import DatePickerMUI from "../../components/datePickerMUI";
import DeleteInvoiceModal from "../../components/invoiceComponents/deleteInvoiceModal";
import { FaSearch } from "react-icons/fa";
import dayjs from "dayjs";

export default function invoiceList() {
  function createData(
    invoice_id,
    recipient,
    issued_date,
    period_start,
    period_end,
    amount
  ) {
    return {
      invoice_id,
      recipient,
      issued_date,
      period_start,
      period_end,
      amount,
    };
  }

  const invoices = [
    createData(
      "CN-001",
      "PT. Garuda Indonesia",
      dayjs("2024-05-07").toISOString(),
      dayjs("2024-05-07").toISOString(),
      dayjs("2026-06-08").toISOString(),
      "$100,00"
    ),
    createData(
      "DN-001",
      "PT. Garuda Indonesia",
      dayjs("2024-06-07").toISOString(),
      dayjs("2024-04-10").toISOString(),
      dayjs("2025-05-05").toISOString(),
      "$100,00"
    ),
    createData(
      "CN-002",
      "PT. Garuda Indonesia",
      dayjs("2022-07-07").toISOString(),
      dayjs("2024-12-30").toISOString(),
      dayjs("2026-07-12").toISOString(),
      "$100,00"
    ),
    createData(
      "CN-003",
      "PT. Garuda Indonesia",
      dayjs("2023-02-05").toISOString(),
      dayjs("2023-02-05").toISOString(),
      dayjs("2024-06-11").toISOString(),
      "$100,00"
    ),
    createData(
      "DN-002",
      "PT. Garuda Indonesia",
      dayjs("2024-10-10").toISOString(),
      dayjs("2022-02-02").toISOString(),
      dayjs("2023-03-03").toISOString(),
      "$100,00"
    ),
    createData(
      "CN-004",
      "PT. Garuda Indonesia",
      dayjs("2024-05-30").toISOString(),
      dayjs("2024-11-20").toISOString(),
      dayjs("2026-10-19").toISOString(),
      "$100,00"
    ),
    createData(
      "DN-003",
      "PT. Garuda Indonesia",
      dayjs("2024-05-12").toISOString(),
      dayjs("2024-04-04").toISOString(),
      dayjs("2026-06-06").toISOString(),
      "$100,00"
    ),
    createData(
      "DN-004",
      "PT. Garuda Indonesia",
      dayjs("2023-05-11").toISOString(),
      dayjs("2024-09-15").toISOString(),
      dayjs("2026-11-20").toISOString(),
      "$100,00"
    ),
    createData(
      "DN-005",
      "PT. Garuda Indonesia",
      dayjs("2024-12-10").toISOString(),
      dayjs("2024-09-11").toISOString(),
      dayjs("2028-11-20").toISOString(),
      "$100,00"
    ),
    createData(
      "DN-006",
      "PT. Garuda Indonesia",
      dayjs("2024-08-10").toISOString(),
      dayjs("2024-12-16").toISOString(),
      dayjs("2027-11-20").toISOString(),
      "$100,00"
    ),
    createData(
      "CN-005",
      "PT. Air Asia",
      dayjs("2024-06-10").toISOString(),
      dayjs("2024-10-16").toISOString(),
      dayjs("2026-11-23").toISOString(),
      "$100,00"
    ),
  ];

  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(invoices);
  const [sortQuery, setSortQuery] = useState("");

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

  const handleSortQuery = (e) => {
    const sortValue = e.target.value;
    setSortQuery(sortValue);
  };

  //invoice_id, recipient, issued_date, policy_period, amount
  const handleSort = (data) => {
    if (sortQuery == "asc_id") {
      data.sort(
        (a, b) =>
          parseInt(a.invoice_id.slice(4, 7)) -
          parseInt(b.invoice_id.slice(4, 7))
      );
    } else if (sortQuery == "desc_id") {
      data.sort(
        (a, b) =>
          parseInt(b.invoice_id.slice(4, 7)) -
          parseInt(a.invoice_id.slice(4, 7))
      );
    } else if (sortQuery == "asc_recipient") {
      data.sort((a, b) => a.recipient.localeCompare(b.recipient));
    } else if (sortQuery == "desc_recipient") {
      data.sort((a, b) => b.recipient.localeCompare(a.recipient));
    } else if (sortQuery == "new_issued") {
      data.sort((a, b) => -a.issued_date.localeCompare(b.issued_date));
    } else if (sortQuery == "old_issued") {
      data.sort((a, b) => a.issued_date.localeCompare(b.issued_date));
    } else if (sortQuery == "new_start") {
      data.sort((a, b) => -a.period_start.localeCompare(b.period_start));
    } else if (sortQuery == "old_start") {
      data.sort((a, b) => a.period_start.localeCompare(b.period_start));
    }
  };
  handleSort(filteredData)

  const [modalState, setModalState] = useState(false);
  const [delInvoice, setDelInvoice] = useState("");
  const handleOpenModal = (data) => {
    setModalState(true);
    setDelInvoice(data);
  };
  const handleCloseModal = () => setModalState(false);

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <DeleteInvoiceModal
        modalState={modalState}
        delInvoice={delInvoice}
        handleCloseModal={handleCloseModal}
      />
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
        <div className="w-1/3 flex justify-end ">
          <select
            id="currency"
            name="currency"
            className="drop-shadow-md focus:border-green-700 focus:border-[3px] border-[2.5px] border-gray-500 rounded-lg  h-[40px]  text-gray-700  focus:outline-none focus:shadow-outline mt-2"
            placeholder="sort"
            onChange={handleSortQuery}
          >
            <option value="" selected disabled>
              Sort
            </option>
            <option value="asc_id">Ascending Invoice Number</option>
            <option value="desc_id">Descending Invoice Number</option>
            <option value="asc_recipient">Ascending Recipient</option>
            <option value="desc_recipient">Descending Recipient</option>
            <option value="new_issued">Newest Issued Date</option>
            <option value="old_issued">Oldest Issued Date</option>
            <option value="new_start">Newest Period Start</option>
            <option value="old_start">Oldest Period Start</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 h-[900px] overflow-y-auto">
        <TableMUI tableData={filteredData} handleOpenModal={handleOpenModal} />
      </div>
    </div>
  );
}
