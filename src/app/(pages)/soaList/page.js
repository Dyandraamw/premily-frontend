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
import EditSoaModal from "../../components/soaComponents/deleteSoaModal";
import axios from "axios";

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
  //////////////////////////////////////////////////////////////////////////
  const [soaList, setSoaList] = useState([]);
//   const cors = require("cors");
// app.use(cors());
  //const axios = require("axios").default;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://premily-premily-d67f7a97.koyeb.app/api/retrive-soa",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzliYWY4MDMtODkxYy00N2ZiLWFhYjEtYWNjNzE4ZmYzZGFlIiwiZXhwIjoxNzE4MjY4NDc3fQ.JV-CPgivJYHv0WUS91Xtne14ILfphb_yZT5cgydiuxI",
    },
  };

  //fetch data
  useEffect(() => {
    const fetchSoaList = () => {
      // axios.get("https://premily-premily-d67f7a97.koyeb.app/api/retrive-soa",{ headers:
      //     {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzliYWY4MDMtODkxYy00N2ZiLWFhYjEtYWNjNzE4ZmYzZGFlIiwiZXhwIjoxNzE4MjY4NDc3fQ.JV-CPgivJYHv0WUS91Xtne14ILfphb_yZT5cgydiuxI'}
      //   })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // api
      //   .get(`${API_URL}/api`, {
      //     params: {
      //     },
      //   })
      //   .then((response) => {
      //     {
      //       response.data.data !== null
      //         ? setSoaList(response.data.data)
      //         : setSoaList([]);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   });
    };
    fetchSoaList();

    async function fetchDummy() {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/books',
          {headers:{
            "Content-Type":"application/json"
        }}
          // {
          //   headers: {
          //     Authorization:
          //       // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWZlZTQ2ZWYtZDc4OC00OTAxLTg5YTktZmVkZTczNDZmNGQyIiwiZXhwIjoxNzE4MzY1NTI5fQ.2zn1dLxc4jvXnO2NS6ffdh3z_Zf5aXqmEmQhjeKse8A",

          //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzliYWY4MDMtODkxYy00N2ZiLWFhYjEtYWNjNzE4ZmYzZGFlIiwiZXhwIjoxNzE4MzY2MDU1fQ.Z_Zv51sg0W-ouakQSBuZJS7JO4WgiqWszWJ0TltQ4JA",
          //     },

            
          // }
        );
        console.log( response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDummy();

    async function fetchDummy2() {
      try {
        const response = await axios.get(
          'http://localhost:2024/api/retrive-soa',
          {headers:{
            "Content-Type":"application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWZlZTQ2ZWYtZDc4OC00OTAxLTg5YTktZmVkZTczNDZmNGQyIiwiZXhwIjoxNzE4MzY1NTI5fQ.2zn1dLxc4jvXnO2NS6ffdh3z_Zf5aXqmEmQhjeKse8A",
            "Credentials": false
            
        }}
          // {
          //   headers: {
          //     Authorization:
          //       // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWZlZTQ2ZWYtZDc4OC00OTAxLTg5YTktZmVkZTczNDZmNGQyIiwiZXhwIjoxNzE4MzY1NTI5fQ.2zn1dLxc4jvXnO2NS6ffdh3z_Zf5aXqmEmQhjeKse8A",

          //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzliYWY4MDMtODkxYy00N2ZiLWFhYjEtYWNjNzE4ZmYzZGFlIiwiZXhwIjoxNzE4MzY2MDU1fQ.Z_Zv51sg0W-ouakQSBuZJS7JO4WgiqWszWJ0TltQ4JA",
          //     },

            
          // }
        );
        console.log( response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDummy2();
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
  //////////////////////////////////////////////////////////////////////////
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(soaData);
  const [sortQuery, setSortQuery] = useState("");

  // filter control
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

  const handleSortQuery = (e) => {
    const sortValue = e.target.value;
    setSortQuery(sortValue);
  };

  const handleSort = (data) => {
    if (sortQuery == "asc_id") {
      data.sort(
        (a, b) =>
          parseInt(a.soa_id.slice(4, 7)) - parseInt(b.soa_id.slice(4, 7))
      );
    } else if (sortQuery == "desc_id") {
      data.sort(
        (a, b) =>
          parseInt(b.soa_id.slice(4, 7)) - parseInt(a.soa_id.slice(4, 7))
      );
    } else if (sortQuery == "asc_company") {
      data.sort((a, b) => a.name_of_insured.localeCompare(b.name_of_insured));
    } else if (sortQuery == "desc_company") {
      data.sort((a, b) => b.name_of_insured.localeCompare(a.name_of_insured));
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

  const [detailStatementOfAccount, setDetailStatementOfAccount] = useState({
    soa_id: "",
    name_of_insured: "",
    period_start: null,
    period_end: null,
  });
  const [detailSoaModal, setDetailSoaModal] = useState(false);
  const handleOpenDetailSoaModal = (data) => {
    setDetailSoaModal(true);
    setDetailStatementOfAccount({
      ...detailStatementOfAccount,
      soa_id: data[0],
      name_of_insured: data[1],
      period_start: data[2],
      period_end: data[3],
    });
  };
  const handleCloseDetailSoaModal = () => setDetailSoaModal(false);

  //console.log(filteredData);
  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <CreateSoaModal
        modalState={modalState}
        handleCloseModal={handleCloseModal}
      />
      <EditSoaModal
        detailSoaModal={detailSoaModal}
        handleCloseModal={handleCloseDetailSoaModal}
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
            id="currency"
            name="currency"
            className="drop-shadow-md focus:border-green-700 focus:border-[3px] border-[2.5px] border-gray-500 rounded-lg  h-[40px]  text-gray-700  focus:outline-none focus:shadow-outline mt-2"
            placeholder="sort"
            onChange={handleSortQuery}
          >
            <option value="" selected disabled>
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
          handleOpenDetailSoaModal={handleOpenDetailSoaModal}
        />
      </div>
    </div>
  );
}
