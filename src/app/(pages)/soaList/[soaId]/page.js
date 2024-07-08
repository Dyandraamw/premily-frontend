"use client";
import React, { useEffect, useMemo, useState } from "react";

import TableMUI from "../../../components/soaComponents/soaDetailTable";
import Textfield from "../../../components/textfield";
import DatePickerMUI from "../../../components/datePickerMUI";
import { FaSearch } from "react-icons/fa";
import dayjs from "dayjs";
import Link from "next/link";
import EditItemModal from "../../../components/soaComponents/editItemModal";
import axios from "axios";
import { fetchSoaDetails, fetchSoaList } from "@/app/utils/api/soaApi";
import Cookies from "js-cookie";
import useMounted from "@/app/utils/hooks/useMounted";

const userRole = Cookies.get("userRole");
export default function statementOfAccount({ params }) {
  const mounted = useMounted();
  const [query, setQuery] = useState("");
  const [soaDetails, setSoaDetails] = useState([]);
  const [soaData, setSoaData] = useState({
    Name_Of_Insured: "",
    Period: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [calcValues, setCalcValues] = useState([]);

  useEffect(() => {
    const fetchSoa = async () => {
      const response = await fetchSoaDetails(params.soaId);
      setSoaDetails(response);
      setFilteredData(response);
      //console.log(response);
    };
    fetchSoa();

    const fetchSoaData = async () => {
      const soaArr = await fetchSoaList();
      const filteredSoa = soaArr.filter(
        (data) => data.SOA_ID.toLowerCase().includes(params.soaId.toLowerCase())
        // data.period_end.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log(filteredSoa);
      setSoaData(filteredSoa[0]);
    };
    fetchSoaData();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    //console.log(e.target.value)
    setQuery(searchQuery);

    const filteredSoa = soaDetails.filter(
      (data) =>
        data.Invoice_ID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.Recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.Status.toLowerCase().includes(searchQuery.toLowerCase())
      // data.period_end.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredSoa);
  };

  const searchPrev = (invID, insNum, currID) => {
    const filteredSoa = soaDetails.filter(
      (data) =>
        data.Invoice_ID.toLowerCase().includes(invID.toLowerCase()) &&
        data.Installment_Standing == insNum
    );
    return filteredSoa;
  };

  const searchCalc = (invID, insNum, currID, searchArr) => {
    const filteredSoa = searchArr.filter(
      (data) =>
        data.Invoice_ID.toLowerCase().includes(invID.toLowerCase()) &&
        data.Installment_Standing == insNum &&
        data.SOA_Details_ID !== currID
      // data.period_end.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredSoa;
  };

  // useEffect(() => {
  const handleCalc = (soaData) => {
    let arr = [];
    soaData.map((data, i) => {
      const prevData = searchPrev(
        data.Invoice_ID,
        data.Installment_Standing,
        data.SOA_Details_ID
      );
      //console.log(prevData);
      if (prevData[0].SOA_Details_ID == data.SOA_Details_ID) {
        const balance =
          parseInt(data.Payment_Amount) - parseInt(data.SOA_Amount);
        {
          balance < 0
            ? arr.push({
                Invoice_ID: data.Invoice_ID,
                Installment_Standing: data.Installment_Standing,
                item_id: data.SOA_Details_ID,
                alocation: data.Payment_Amount,
                balance: balance,
                status: "OUTSTANDING",
              })
            : arr.push({
                Invoice_ID: data.Invoice_ID,
                Installment_Standing: data.Installment_Standing,
                item_id: data.SOA_Details_ID,
                alocation: data.Payment_Amount,
                balance: balance,
                status: "PAID",
              });
        }

        // console.log;
      } else if (prevData[0].SOA_Details_ID != data.SOA_Details_ID) {
        const prevCalc = searchCalc(
          data.Invoice_ID,
          data.Installment_Standing,
          data.SOA_Details_ID,
          arr
        );
        const previdx = prevCalc.length - 1;
        //console.log(prevCalc)
        if (prevCalc[previdx].balance < 0) {
          const alocation = parseInt(data.Payment_Amount);
          const balance = parseInt(prevCalc[previdx].balance) + alocation;
          // console.log(prevCalc[previdx])
          {
            balance < 0
              ? arr.push({
                  Invoice_ID: data.Invoice_ID,
                  Installment_Standing: data.Installment_Standing,
                  item_id: data.SOA_Details_ID,
                  alocation: data.Payment_Amount,
                  balance: balance,
                  status: "OUTSTANDING",
                })
              : arr.push({
                  Invoice_ID: data.Invoice_ID,
                  Installment_Standing: data.Installment_Standing,
                  item_id: data.SOA_Details_ID,
                  alocation: data.Payment_Amount,
                  balance: balance,
                  status: "PAID",
                });
          }
        } else if (prevCalc[previdx].balance >= 0) {
          const alocation =
            parseInt(data.Payment_Amount) + parseInt(arr[previdx].balance);
          const balance = alocation - parseInt(data.SOA_Amount);
          {
            balance < 0
              ? arr.push({
                  Invoice_ID: data.Invoice_ID,
                  Installment_Standing: data.Installment_Standing,
                  item_id: data.SOA_Details_ID,
                  alocation: data.Payment_Amount,
                  balance: balance,
                  status: "OUTSTANDING",
                })
              : arr.push({
                  Invoice_ID: data.Invoice_ID,
                  Installment_Standing: data.Installment_Standing,
                  item_id: data.SOA_Details_ID,
                  alocation: data.Payment_Amount,
                  balance: balance,
                  status: "PAID",
                });
          }
        }
      }

      // console.log(arr)
    });

    setCalcValues(arr);
  };

  const handleStartPeriod = (soaData) => {
    if (soaData != null) {
      const start = dayjs(soaData.slice(0, 10)).format("DD MMM YYYY");
      return start;
    }
    console.log(handleEndPeriod(soaData));
    return;
  };

  const handleEndPeriod = (soaData) => {
    if (soaData != null) {
      const end = dayjs(soaData.slice(13, 23)).format("DD MMM YYYY");
      return end;
    }
    console.log(handleEndPeriod(soaData));
    return;
  };

  // }, []);

  useEffect(() => {
    handleCalc(soaDetails);
  }, [soaDetails]);

  const [modalState, setModalState] = useState(false);
  const [editSoaItem, setEditSoaItem] = useState({
    soa_id_details: "",
    invoice_id: "",
    instalment_id: "",
    payment_date: null,
    payment_amount: 0,
  });
  const handleOpenModal = (data) => {
    setModalState(true);
    setEditSoaItem({
      ...editSoaItem,
      soa_id_details: data[0],
      invoice_id: data[1],
      instalment_id: data[2],
      payment_date: data[3],
      payment_amount: data[4],
    });
  };
  const handleCloseModal = () => setModalState(false);
  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <EditItemModal
        modalState={modalState}
        handleCloseModal={handleCloseModal}
        editSoaItem={editSoaItem}
        setEditSoaItem={setEditSoaItem}
      />
      <div className="flex justify-between mb-2">
        <div className="">
          <h1 className="text-4xl text-green-700 font-bold">
            Statement of Account
          </h1>
          <p className="ml-1 font-medium text-gray-600">
            View statement of account number {params.soaId} details
          </p>
        </div>
        <div>
          {mounted && userRole == "staff" ? null : (
            <button className="p-2 px-4 border-[3px] mt-2 drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700">
              <Link href={params.soaId + "/soaAddItem"}>Add Item</Link>
            </button>
          )}
        </div>
      </div>

      {/* filters */}
      <div className="flex justify-between">
        <div className="w-1/3">
          <Textfield
            id={"search_bar"}
            placeholder={"search invoice number, recipient, status..."}
            onChange={handleSearch}
            icon={<FaSearch />}
          />
        </div>
      </div>

      {/* table */}
      <div className="bg-white rounded-lg w-full mt-5 p-5   overflow-x-auto">
        <div className="ml-3 my-5">
          <div className="flex">
            <p className="font-semibold">Name of Insured&nbsp;</p>
            <p>:&emsp;{soaData.Name_Of_Insured}</p>
          </div>
          <div className="flex">
            <p className="font-semibold">Policy Period&nbsp;</p>
            <p>
              :&emsp;{handleStartPeriod(soaData.Period)} -{" "}
              {handleEndPeriod(soaData.Period)}
            </p>
          </div>
          <div className="flex">
            <p className="font-semibold">Current Date&nbsp;</p>
            <p>:&emsp;{dayjs().format("DD MMM YYYY")}</p>
          </div>
        </div>
        <TableMUI
          tableData={filteredData}
          handleOpenModal={handleOpenModal}
          calcValues={calcValues}
        />
      </div>
    </div>
  );
}
