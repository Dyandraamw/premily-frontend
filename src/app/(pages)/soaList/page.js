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

function createData(soa_id, name_of_insured, period_start, period_end) {
    return { soa_id, name_of_insured, period_start, period_end };
  }

  const soaData = [
    createData(
      "SOA-001",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      dayjs("06/07/2026").format("DD/MM/YYYY")
    ),
    createData(
      "SOA-002",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      dayjs("06/07/2026").format("DD/MM/YYYY")
    ),
    createData(
      "SOA-003",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      dayjs("06/07/2026").format("DD/MM/YYYY")
    ),
    createData(
      "SOA-004",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      dayjs("06/07/2026").format("DD/MM/YYYY")
    ),
    createData(
      "SOA-005",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      dayjs("06/07/2026").format("DD/MM/YYYY")
    ),
    createData(
      "SOA-001",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      dayjs("06/07/2026").format("DD/MM/YYYY")
    ),
    createData(
      "SOA-001",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      dayjs("06/07/2026").format("DD/MM/YYYY")
    ),
    createData(
      "SOA-001",
      "PT. Garuda Indonesia",
      dayjs("05/07/2024").format("DD/MM/YYYY"),
      dayjs("06/07/2026").format("DD/MM/YYYY")
    ),
  ];
export default function soaList() {
  

  const handleSearch = (e) => {
    const searchVal = e.target;
  };

  const [modalState, setModalState] = useState(false);
  const handleOpenModal = () => setModalState(true);
  const handleCloseModal = () => setModalState(false);

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
      <CreateSoaModal modalState={modalState} handleCloseModal={handleCloseModal} />
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
          <button onClick={handleOpenModal} className="p-2 px-4 border-[3px] mt-2 drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700">
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
            <option value="invoice_id">Invoice Number</option>
            <option value="issued_date">Issued Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 h-[900px] overflow-y-auto">
        <TableMUI tableData={soaData} />
      </div>
    </div>
  );
}
