"use client";
import React, { useState } from "react";

import TableMUI from "../../components/soaComponents/soaListTable";
import Textfield from "../../components/textfield";
import SideTextfield from "../../components/sideTextfield";
import DatePickerMUI from "../../components/datePickerMUI";
import { FaSearch } from "react-icons/fa";
import dayjs from "dayjs";
import Link from "next/link";
import CreateSoaModal from "../../components/soaComponents/createSoaModal";
import EditSoaModal from "../../components/soaComponents/editSoaModal";

function createData(soa_id, name_of_insured, period_start, period_end) {
  return { soa_id, name_of_insured, period_start, period_end };
}

const soaData = [
  createData(
    "SOA-001",
    "PT. Garuda Indonesia",
    dayjs("2024-05-07").toISOString(),
    dayjs("2026-06-08").toISOString()
  ),
  createData(
    "SOA-002",
    "PT. Sriwijaya",
    dayjs("2024-04-10").toISOString(),
    dayjs("2025-05-05").toISOString()
  ),
  createData(
    "SOA-003",
    "PT. Alda Air",
    dayjs("2024-12-30").toISOString(),
    dayjs("2026-07-12").toISOString()
  ),
  createData(
    "SOA-004",
    "PT. Citilink",
    dayjs("2023-02-05").toISOString(),
    dayjs("2024-06-11").toISOString()
  ),
  createData(
    "SOA-005",
    "PT. Air Asia",
    dayjs("2022-02-02").toISOString(),
    dayjs("2023-03-03").toISOString()
  ),
  createData(
    "SOA-006",
    "PT. Lion Air",
    dayjs("2024-11-20").toISOString(),
    dayjs("2026-10-19").toISOString()
  ),
  createData(
    "SOA-007",
    "PT. Garuda Indonesia",
    dayjs("2024-04-04").toISOString(),
    dayjs("2026-06-06").toISOString()
  ),
  createData(
    "SOA-008",
    "PT. Garuda Indonesia",
    dayjs("2024-09-16").toISOString(),
    dayjs("2026-11-20").toISOString()
  ),
];
export default function soaList() {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(soaData);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    //console.log(e.target.value)
    setQuery(searchQuery);

    const filteredSoa = soaData.filter(
      (data) =>
        data.soa_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.name_of_insured.toLowerCase().includes(searchQuery.toLowerCase())
      // data.period_start.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // data.period_end.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredSoa);
  };

  const [modalState, setModalState] = useState(false);
  const handleOpenModal = () => setModalState(true);
  const handleCloseModal = () => setModalState(false);

  const [editStatementOfAccount, setEditStatementOfAccount] = useState({
    soa_id: "",
    name_of_insured: "",
    period_start: null,
    period_end: null,
  });
  const [editSoaModal, setEditSoaModal] = useState(false);
  const handleOpenEditSoaModal = (data) => {
    setEditSoaModal(true);
    setEditStatementOfAccount({
      ...editStatementOfAccount,
      soa_id: data[0],
      name_of_insured: data[1],
      period_start: data[2],
      period_end: data[3],
    });
  };
  const handleCloseEditSoaModal = () => setEditSoaModal(false);

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <CreateSoaModal
        modalState={modalState}
        handleCloseModal={handleCloseModal}
      />
      <EditSoaModal
        editSoaModal={editSoaModal}
        handleCloseModal={handleCloseEditSoaModal}
        editStatementOfAccount={editStatementOfAccount}
        setEditStatementOfAccount={setEditStatementOfAccount}
      />
      <div className="flex justify-between mb-2">
        <div className="">
          <h1 className="text-4xl text-green-700 font-bold">
            List of Statement of Account
          </h1>
          <p className="ml-1 font-medium text-gray-600">
            View , create, and edit statement of accounts
          </p>
        </div>
        <div>
          <button
            onClick={handleOpenModal}
            className="p-2 px-4 border-[3px] mt-2 drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
          >
            Create Statement of Account
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-1/3">
          <Textfield
            id={"search_bar"}
            placeholder={"search soa number, insured company..."}
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
            <option value="invoice_id">Invoice Number</option>
            <option value="issued_date">Issued Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 h-[900px] overflow-y-auto">
        <TableMUI
          tableData={filteredData}
          handleOpenEditSoaModal={handleOpenEditSoaModal}
        />
      </div>
    </div>
  );
}
