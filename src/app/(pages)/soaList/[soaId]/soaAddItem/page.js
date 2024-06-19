"use client";
import React, { useEffect, useState } from "react";
import AddItem from "../../../../components/soaComponents/addItem";
import dayjs from "dayjs";
import Link from "next/link";
import AddItemModal from "../../../../components/soaComponents/addItemModal";
import { fetchInvoiceDetail, fetchInvoiceList } from "@/app/utils/api/invApi";
import { fetchSoaDetails } from "@/app/utils/api/soaApi";



export default function soaAddItem({ params }) {
  const [invoiceList, setInvoiceList] = useState([]);
  const [insDetail, setInsDetail] = useState([{
    Installment_ID: "",
    Invoice_ID: "",
    Due_Date: null,
    Ins_Amount: 0,
    Payment_Details: "",
  },]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedIns, setSelectedIns] = useState(0);
  const [soaDetails, setSoaDetails] = useState([])
  const [statementOfAccount, setStatementOfAccount] = useState({
    invoice_id: "",
    // instalment_id: "",
    installment_standing: 0,
    payment_date: "",
    payment_amount: 0,
    // payment_currency: "",
  });
  
  useEffect(() => {
    const fetchinv = async () => {
      const invList = await fetchInvoiceList();
      setInvoiceList(invList);

    };
    fetchinv();


  }, []);

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
    setStatementOfAccount({
      ...statementOfAccount,
      invoice_id: e.target.value,
    });
  };

  const handleModalRadio = (e) => {
    setSelectedIns(e.target.value);
    setStatementOfAccount({
      ...statementOfAccount,
      installment_standing: parseInt(e.target.value),
    });
  };

  const handleCurrency = (e) => {
    //const sortValue = e.target.value;
    setStatementOfAccount({
      ...statementOfAccount,
      payment_currency: e.target.value,
    });
  };

  const [modalState, setModalState] = useState(false);
  const handleOpenModal = () => {
    if (selectedValue!= "") {
      const fetchinvDet = async (Invoice_ID) => {
        const insList = await fetchInvoiceDetail(Invoice_ID);
        setInsDetail(insList.Installment);
  
        //console.log(insList);
      };
  
      fetchinvDet(selectedValue);
      setModalState(true);
    }
    }
  const handleCloseModal = () => setModalState(false);
    console.log(statementOfAccount)
  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <AddItemModal
        modalState={modalState}
        handleCloseModal={handleCloseModal}
        statementOfAccount={statementOfAccount}
        setStatementOfAccount={setStatementOfAccount}
        selectedValue={selectedIns}
        handleModalRadio={handleModalRadio}
        setSelectedValue={setSelectedIns}
        insDetail={insDetail}
        // handleCurrency={handleCurrency}
        soa_id={params.soaId}
      />
      <div className="flex justify-between mb-2">
        <div className="">
          <h1 className="text-4xl text-green-700 font-bold">
            Statement of Account {">"} Add Item
          </h1>
          <p className="ml-1 font-medium text-gray-600">
            Add Invoice and Installment into Statement of Account
          </p>
        </div>
      </div>
      <div className="bg-white drop-shadow-lg rounded-xl w-min-[1500px] w-max-full mt-5 p-5 h-[900px] overflow-y-auto">
        <p className="ml-1 text-lg font-semibold text-black">Select Invoice</p>
        <AddItem
          tableData={invoiceList}
          selectedValue={selectedValue}
          handleRadioChange={handleRadioChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleOpenModal}
          className="p-2 px-4 border-[3px] mt-2 drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
