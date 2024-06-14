"use client";
import React, { useState, useEffect } from "react";
import TableMUI from "../../components/invoiceComponents/invoiceTable";
import Textfield from "../../components/textfield";
import DeleteInvoiceModal from "../../components/invoiceComponents/deleteInvoiceModal";
import { FaSearch } from "react-icons/fa";
import dayjs from "dayjs";
import axios from "axios";

export default function invoiceList() {
  // fetch data ////////////////////////////////////////////
  const [invoiceList, setInvoiceList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const url = "/api/invoice-list";
  const authToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzI0ZTdiODEtMzQ0MS00MGI2LThiZjgtZTU0NDFlMjNlZTVlIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzE4NjM3MjI2fQ.-Bq4dPdBWjUa9cB-2IlF8W6oKieB0SCC_PXx0IcRh-Y";

  useEffect(() => {
    const fetchInvoiceList = () => {
      axios.get(url, {
          headers: {
            Authorization: authToken,
          },
        })
        .then((response) => {
          setInvoiceList(response.data)
          setFilteredData(response.data)
          //console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchInvoiceList();
  }, []);


  ///////////////////////////////////////////////////
  // filters ///////////////////////////////////////////////
  const [query, setQuery] = useState("");
  
  const [sortQuery, setSortQuery] = useState("");

  const handleStartPeriod = (data) => {
    if (data!=null) {
      const start = dayjs(data.slice(0,10)).format('DD/MM/YYYY')
      return start
    }
    return
  };

  const handleEndPeriod = (data) => {
    if (data!=null) {
      const end = dayjs(data.slice(13,23)).format('DD/MM/YYYY')
      return end
    }
    return
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    //console.log(e.target.value)
    setQuery(searchQuery);

    const filteredInvoice = invoiceList.filter(
      (data) =>
        data.Invoice_ID.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        data.Recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.Created_At.toLowerCase().includes(searchQuery.toLowerCase()) ||
        handleStartPeriod(data.Period).toLowerCase().includes(searchQuery.toLowerCase()) ||
        handleEndPeriod(data.Period).toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.Total_Premium_Due.toLowerCase().includes(searchQuery.toLowerCase())
    );
    //console.log(filteredInvoice)
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
          parseInt(a.Invoice_ID.slice(3, 8)) -
          parseInt(b.Invoice_ID.slice(3, 8))
      );
    } else if (sortQuery == "desc_id") {
      data.sort(
        (a, b) =>
          parseInt(b.Invoice_ID.slice(3, 8)) -
          parseInt(a.Invoice_ID.slice(3, 8))
      );
    } else if (sortQuery == "asc_recipient") {
      data.sort((a, b) => a.Recipient.localeCompare(b.Recipient));
    } else if (sortQuery == "desc_recipient") {
      data.sort((a, b) => b.Recipient.localeCompare(a.Recipient));
    } else if (sortQuery == "new_issued") {
      data.sort((a, b) => -a.Created_At.localeCompare(b.Created_At));
    } else if (sortQuery == "old_issued") {
      data.sort((a, b) => a.Created_At.localeCompare(b.Created_At));
    } else if (sortQuery == "new_start") {
      data.sort((a, b) => -handleStartPeriod(a.Period).localeCompare(handleStartPeriod(b.Period)));
    } else if (sortQuery == "old_start") {
      data.sort((a, b) => handleStartPeriod(a.Period).localeCompare(handleStartPeriod(b.Period)));
    }
  };
  handleSort(filteredData);
  // console.log(filteredData)
  ///////////////////////////////////////////////////

  // modal handler /////////////////////////////////////////
  const [modalState, setModalState] = useState(false);
  const [delInvoice, setDelInvoice] = useState("");
  const handleOpenModal = (data) => {
    setModalState(true);
    setDelInvoice(data);
  };
  const handleCloseModal = () => setModalState(false);
  ///////////////////////////////////////////////////
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
            id="sort_invoice"
            name="sort_invoice"
            className="drop-shadow-md focus:border-green-700 focus:border-[3px] border-[2.5px] border-gray-500 rounded-lg  h-[40px]  text-gray-700  focus:outline-none focus:shadow-outline mt-2"
            placeholder="sort"
            onChange={handleSortQuery}
            defaultValue="sortHeader"
          >
            <option value="sortHeader"  disabled>
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
