"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";

import { FaSearch } from "react-icons/fa";

import Textfield from "../../components/textfield";
import DatePickerMUI from "../../components/datePickerMUI";
import TablePaymentStatus from "@/app/components/paymentStatusComponents/PaymentStatus";
import DeletePsModal from "@/app/components/paymentStatusComponents/modalDelete";
import { fetchPaymentStatusList } from "@/app/utils/api/psApi";
import Cookies from "js-cookie";
import useMounted from "@/app/utils/hooks/useMounted";
import LoadingModal from "@/app/components/loadingModal";

const userRole = Cookies.get("userRole");

export default function PaymentStatus() {
  const [spinner,setSpinner] = useState(true)
  const mounted = useMounted();
  const [query, setQuery] = useState("");
  const [paymentStatusList, setPaymentStatusList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortQuery, setSortQuery] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      const psList = await fetchPaymentStatusList();
      setSpinner(false)
      setPaymentStatusList(psList);
      setFilteredData(psList);
      // console.log(invList)
    };
    fetchList();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    //console.log(e.target.value)
    setQuery(searchQuery);

    const filteredData = paymentStatusList.filter(
      (data) =>
        data.payment_status_id
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        data.invoice.toLowerCase().includes(searchQuery.toLowerCase())
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
    if (sortQuery == "asc_ps_id") {
      data.sort(
        (a, b) =>
          parseInt(a.payment_status_id.slice(8, 13)) -
          parseInt(b.payment_status_id.slice(8, 13))
      );
    } else if (sortQuery == "desc_ps_id") {
      data.sort(
        (a, b) =>
          parseInt(b.payment_status_id.slice(8, 13)) -
          parseInt(a.payment_status_id.slice(8, 13))
      );
    } else if (sortQuery == "asc_invoice_id") {
      data.sort(
        (a, b) =>
          parseInt(a.invoice_id.slice(4, 9)) -
          parseInt(b.invoice_id.slice(4, 9))
      );
    } else if (sortQuery == "desc_invoice_id") {
      data.sort(
        (a, b) =>
          parseInt(b.invoice_id.slice(4, 9)) -
          parseInt(a.invoice_id.slice(4, 9))
      );
    } else if (sortQuery == "asc_recipient") {
      data.sort((a, b) => a.invoice.localeCompare(b.invoice));
    } else if (sortQuery == "desc_recipient") {
      data.sort((a, b) => b.invoice.localeCompare(a.invoice));
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
    // console.log(data);
    setDetailPsModal(true);
    setDetailPaymentStatus({
      ...detailPaymentStatus,
      payment_status_id: data[0],
      invoice_id: data[1],
      invoice_recipient: data[2],
      period_start: data[3],
      period_end: data[4],
    });
  };

  const handleCloseDetailPsModal = () => setDetailPsModal(false);
  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <LoadingModal modalState={spinner} />
      <DeletePsModal
        detailPsModal={detailPsModal}
        handleCloseModal={handleCloseDetailPsModal}
        detailPaymentStatus={detailPaymentStatus}
        setDetailPaymentStatus={setDetailPaymentStatus}
      />
      <div className="flex justify-between mb-2">
        <div className="">
          <h1 className="text-4xl text-green-700 font-bold">Payment Status</h1>
          <p className="ml-1 font-medium text-gray-600">
            View, create, and edit your payment status
          </p>
        </div>
        <div>
          {mounted && userRole == "staff" ? null : (
            <Link href={"/SelectInvoicesPS"}>
              <button
                href={"/SelectInvoicesPS"}
                className="p-2 px-4 border-[3px] mt-2 drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700 "
              >
                Create Payment Status
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-1/3">
          <Textfield
            id={"search_bar"}
            placeholder={
              "search payment status number, invoice number, invoice recipient, policy period..."
            }
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
            defaultValue="header"
          >
            <option value="header" disabled>
              Sort
            </option>
            <option value="asc_ps_id">Ascending Payment Status Number</option>
            <option value="desc_ps_id">Descending Payment Status Number</option>
            <option value="asc_invoice_id">Ascending Invoice Number</option>
            <option value="desc_invoice_id">Descending Invoice Number</option>
            <option value="asc_recipient">Asccending Invoice recipient</option>
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
