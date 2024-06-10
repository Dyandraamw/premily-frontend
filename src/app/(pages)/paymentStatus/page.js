"use client";
import React, { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";

import { FaSearch } from "react-icons/fa";
import Textfield from "../../components/textfield";
import DatePickerMUI from "../../components/datePickerMUI";
import TablePaymentStatus from "@/app/components/paymentStatusComponents/PaymentStatus";
import DeletePsModal from "@/app/components/paymentStatusComponents/modalDelete/page";

function createData(
  payment_status_id,
  invoice_id,
  invoice_recipient,
  period_start,
  period_end
) {
  return {
    payment_status_id,
    invoice_id,
    invoice_recipient,
    period_start,
    period_end,
  };
}

const psData = [
  createData(
    "PS-001",
    "CN-001",
    "PT. Garuda Indonesia",
    dayjs("2024-05-07").toISOString(),
    dayjs("2026-06-08").toISOString()
  ),
  createData(
    "PS-002",
    "CN-002",
    "PT. Sriwijaya",
    dayjs("2024-04-10").toISOString(),
    dayjs("2025-05-05").toISOString()
  ),
  createData(
    "PS-003",
    "CN-003",
    "PT. Alda Air",
    dayjs("2024-12-30").toISOString(),
    dayjs("2026-07-12").toISOString()
  ),
  createData(
    "PS-004",
    "CN-004",
    "PT. Citilink",
    dayjs("2023-02-05").toISOString(),
    dayjs("2024-06-11").toISOString()
  ),
  createData(
    "PS-005",
    "CN-005",
    "PT. Air Asia",
    dayjs("2022-02-02").toISOString(),
    dayjs("2023-03-03").toISOString()
  ),
  createData(
    "PS-006",
    "CN-006",
    "PT. Lion Air",
    dayjs("2024-11-20").toISOString(),
    dayjs("2026-10-19").toISOString()
  ),
  createData(
    "PS-007",
    "CN-007",
    "PT. Garuda Indonesia",
    dayjs("2024-04-04").toISOString(),
    dayjs("2026-06-06").toISOString()
  ),
  createData(
    "PS-008",
    "CN-008",
    "PT. Garuda Indonesia",
    dayjs("2024-09-16").toISOString(),
    dayjs("2026-11-20").toISOString()
  ),
];

export default function PaymentStatus() {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(psData);
  const [sortQuery, setSortQuery] = useState("");

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    //console.log(e.target.value)
    setQuery(searchQuery);

    const filteredData = psData.filter(
      (data) =>
        data.payment_status_id
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        data.invoice_recipient.toLowerCase().includes(searchQuery.toLowerCase())
      // data.period_start.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // data.period_end.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const handleSortQuery = (e) => {
    const sortValue = e.target.value;
    setSortQuery(sortValue);
  };

  const handleSort = (data) => {
    console.log(data[0].payment_status_id.slice(3, 6));
    if (sortQuery == "asc_ps_id") {
      data.sort(
        (a, b) =>
          parseInt(a.payment_status_id.slice(3, 6)) -
          parseInt(b.payment_status_id.slice(3, 6))
      );
    } else if (sortQuery == "desc_ps_id") {
      data.sort(
        (a, b) =>
          parseInt(b.payment_status_id.slice(3, 6)) -
          parseInt(a.payment_status_id.slice(3, 6))
      );
    } else if (sortQuery == "asc_invoice_id") {
      data.sort(
        (a, b) =>
          parseInt(a.invoice_id.slice(3, 6)) -
          parseInt(b.invoice_id.slice(3, 6))
      );
    } else if (sortQuery == "desc_invoice_id") {
      data.sort(
        (a, b) =>
          parseInt(b.invoice_id.slice(3, 6)) -
          parseInt(a.invoice_id.slice(3, 6))
      );
    } else if (sortQuery == "asc_recipient") {
      data.sort((a, b) =>
        a.invoice_recipient.localeCompare(b.invoice_recipient)
      );
    } else if (sortQuery == "desc_recipient") {
      data.sort((a, b) =>
        b.invoice_recipient.localeCompare(a.invoice_recipient)
      );
    } else if (sortQuery == "new_start") {
      data.sort((a, b) => -a.period_start.localeCompare(b.period_start));
    } else if (sortQuery == "old_start") {
      data.sort((a, b) => a.period_start.localeCompare(b.period_start));
    }
  };

  handleSort(filteredData);

  // modal control
  const [modalState, setModalState] = useState(false);
  const handleOpenModal = () => setModalState(true);
  const handleCloseModal = () => setModalState(false);

  const [detailPaymentStatus, setDetailPaymentStatus] = useState({
    payment_status_id: "",
    invoice_id: "",
    invoice_recipient: "",
    period_start: null,
    period_end: null,
  });

  const [detailPsModal, setDetailPsModal] = useState(false);
  const handleOpenDetailPsModal = (data) => {
    setDetailPsModal(true);
    setDetailPaymentStatus({
      ...detailPaymentStatus,
      payment_status_id: [0],
      invoice_id: [1],
      invoice_recipient: [2],
      period_start: data[3],
      period_end: data[4],
    });
  };
  const handleCloseDetailPsModal = () => setDetailPsModal(false);

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <DeletePsModal
        detailSoaModal={detailPsModal}
        handleCloseModal={handleCloseDetailPsModal}
        detailStatementOfAccount={detailPaymentStatus}
        setDetailStatementOfAccount={setDetailPaymentStatus}
      />
      <div className="flex justify-between mb-2">
        <div className="">
          <h1 className="text-4xl text-green-700 font-bold">Payment Status</h1>
          <p className="ml-1 font-medium text-gray-600">
            View, create, and edit your payment status
          </p>
        </div>
        <div>
          <Link href={"/SelectInvoicesPS"}>
            <button
              href={"/SelectInvoicesPS"}
              className="p-2 px-4 border-[3px] mt-2 drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700 "
            >
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
        <div className="w-1/3 flex justify-end ">
          {/* <DatePickerMUI label={"issued date"} />
          <DatePickerMUI label={"policy period"} /> */}
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
            <option value="asc_ps_id">Ascending Payment Status Number</option>
            <option value="desc_ps_id">Descending Payment Status Number</option>
            <option value="asc_invoice_id">
              Ascending Invoice Number Company
            </option>
            <option value="desc_invoice_id">
              Descending Invoice Number Company
            </option>
            <option value="desc_recipient">Asccending Invoice recipient</option>
            <option value="desc_recipient">Descending Invoice recipient</option>
            <option value="new_start">Newest Period Start</option>
            <option value="old_start">Oldest Period Start</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 h-[900px] overflow-y-auto">
        <TablePaymentStatus
          tableData={filteredData}
          handleOpenDetailPsModal={handleOpenDetailPsModal}
        />
      </div>
    </div>
  );
}
