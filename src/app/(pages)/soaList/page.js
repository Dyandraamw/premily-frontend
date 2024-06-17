"use client";
import React, { useEffect, useState } from "react";

import TableMUI from "../../components/soaComponents/soaListTable";
import Textfield from "../../components/textfield";
import SideTextfield from "../../components/sideTextfield";
import DatePickerMUI from "../../components/datePickerMUI";
import { FaSearch } from "react-icons/fa";
import dayjs from "dayjs";
import Link from "next/link";
import CreateSoaModal from "../../components/soaComponents/createSoaModal";
import DeleteSoaModal from "../../components/soaComponents/deleteSoaModal";
import axios from "axios";
import { fetchSoaList } from "@/app/utils/api/soaApi";

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
  //fetch data ////////////////////////////////////////////////////////////
  const [soaListData, setSoaListData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchSoa = async () => {
      const soaArr = await fetchSoaList();
      setSoaListData(soaArr);
      setFilteredData(soaArr);
    };
    fetchSoa();
  }, []);

  const headerSoaList = [
    {
      key: "invoice_id",
      title: "Invoice Number",
    },
    {
      key: "recipient",
      title: "Recipient",
    },
    {
      key: "issued_date",
      title: "Issued Date",
    },
    {
      key: "policy_period",
      title: "Policy Period",
    },
    {
      key: "amount",
      title: "Amount",
    },
  ];

  ////////////////////////////////////////////////////////////
  // filter control ////////////////////////////////////////////////////////////
  const [query, setQuery] = useState("");
  //const [filteredData, setFilteredData] = useState(soaData);
  const [sortQuery, setSortQuery] = useState("");

  const handleStartPeriod = (data) => {
    if (data != null) {
      const start = dayjs(data.slice(0, 10)).format("DD/MM/YYYY");
      return start;
    }
    return;
  };

  const handleEndPeriod = (data) => {
    if (data != null) {
      const end = dayjs(data.slice(13, 23)).format("DD/MM/YYYY");
      return end;
    }
    return;
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    //console.log(e.target.value)
    setQuery(searchQuery);

    const filteredSoa = soaListData.filter(
      (data) =>
        data.SOA_ID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.Name_Of_Insured.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        handleStartPeriod(data.Period)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        handleEndPeriod(data.Period)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredSoa);
  };

  const handleSortQuery = (e) => {
    const sortValue = e.target.value;
    setSortQuery(sortValue);
  };

  const handleSort = (data) => {
    if (sortQuery == "asc_id") {
      data.sort(
        (a, b) =>
          parseInt(a.SOA_ID.slice(4, 9)) - parseInt(b.SOA_ID.slice(4, 9))
      );
    } else if (sortQuery == "desc_id") {
      data.sort(
        (a, b) =>
          parseInt(b.SOA_ID.slice(4, 9)) - parseInt(a.SOA_ID.slice(4, 9))
      );
    } else if (sortQuery == "asc_company") {
      data.sort((a, b) => a.Name_Of_Insured.localeCompare(b.Name_Of_Insured));
    } else if (sortQuery == "desc_company") {
      data.sort((a, b) => b.Name_Of_Insured.localeCompare(a.Name_Of_Insured));
    } else if (sortQuery == "new_start") {
      data.sort(
        (a, b) => -a.Period.slice(0, 10).localeCompare(b.Period.slice(0, 10))
      );
    } else if (sortQuery == "old_start") {
      data.sort((a, b) =>
        a.Period.slice(0, 10).localeCompare(b.Period.slice(0, 10))
      );
    }
  };

  handleSort(filteredData);

  ////////////////////////////////////////////////////////////
  // modal control ////////////////////////////////////////////////////////////
  const [modalState, setModalState] = useState(false);
  const handleOpenModal = () => setModalState(true);
  const handleCloseModal = () => setModalState(false);

  const [detailStatementOfAccount, setDetailStatementOfAccount] = useState("");
  const [deleteSoaModal, setDeleteSoaModal] = useState(false);
  const handleOpenDeleteSoaModal = (data) => {
    setDeleteSoaModal(true);
    setDetailStatementOfAccount(data);
  };
  const handleCloseDeleteSoaModal = () => setDeleteSoaModal(false);

  ////////////////////////////////////////////////////////////
  //console.log(filteredData);
  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <CreateSoaModal
        modalState={modalState}
        handleCloseModal={handleCloseModal}
      />
      <DeleteSoaModal
        deleteSoaModal={deleteSoaModal}
        handleCloseModal={handleCloseDeleteSoaModal}
        detailStatementOfAccount={detailStatementOfAccount}
        setDetailStatementOfAccount={setDetailStatementOfAccount}
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
        <div className="w-1/3 flex justify-end ">
          <select
            id="sort_soa"
            name="sort_soa"
            className="drop-shadow-md focus:border-green-700 focus:border-[3px] border-[2.5px] border-gray-500 rounded-lg  h-[40px]  text-gray-700  focus:outline-none focus:shadow-outline mt-2"
            placeholder="sort"
            onChange={handleSortQuery}
            defaultValue="sortHeader"
          >
            <option value="sortHeader" disabled>
              Sort
            </option>
            <option value="asc_id">Ascending SoA Number</option>
            <option value="desc_id">Descending SoA Number</option>
            <option value="asc_company">Ascending Insured Company</option>
            <option value="desc_company">Descending Insured Company</option>
            <option value="new_start">Newest Period Start</option>
            <option value="old_start">Oldest Period Start</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 h-[900px] overflow-y-auto">
        <TableMUI
          tableData={filteredData}
          handleOpenDeleteSoaModal={handleOpenDeleteSoaModal}
        />
      </div>
    </div>
  );
}
