"use client";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import TableSelectInvoice from "@/app/components/paymentStatusComponents/TableSelectInvoice/index";
import AddInvoice from "@/app/components/paymentStatusComponents/TableSelectInvoice/index";
import { createPaymentStatusApi } from "@/app/utils/api/psApi";
import { fetchInvoiceList } from "@/app/utils/api/invApi";
import LoadingModal from "@/app/components/loadingModal";


export default function PaymentStatusDetail() {
  const [spinner,setSpinner] = useState(true)
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [invoiceList, setInvoiceList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    const fetchinv = async () => {
      const invList = await fetchInvoiceList();
      setSpinner(false)
      setInvoiceList(invList);

    };
    fetchinv();


  }, []);



  const handleSubmit = async(e) => {
    e.preventDefault();
    let psForm = new FormData();
    psForm.append("invoice_id", selectedValue);
    const response = await createPaymentStatusApi(psForm);

    window.location.replace("/paymentStatus/"+response.payment_status_id);
  };



  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
    // set({
    //   ...statementOfAccount,
    //   invoice_id: e.target.value,
    // });
  };


  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <LoadingModal modalState={spinner} />
      <div className="mb-2 flex">
        <div className="justify-end">
          <h1 className="text-4xl text-green-800 font-bold">
            Payment Status {">"} Add Invoice
          </h1>
          <p className="flex flex-col ml-1 font-medium text-gray-600">
            Select invoice to make payment status
          </p>
        </div>
        {/* <div className="ml-[660px] m-auto">
          <Button></Button>
        </div> */}
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 h-[900px] overflow-y-auto mb-5">
      <AddInvoice
          tableData={invoiceList}
          selectedValue={selectedValue}
          handleRadioChange={handleRadioChange}
        />
      </div>

      <div className="flex justify-end ">
        <Link href={"/paymentStatus"}>
          <button
            className={`py-3 border-[3px] drop-shadow-lg font-semibold w-28 rounded-lg ${
              selectedValue!=""
                ? "bg-green-700 text-white border-green-700 hover:bg-white hover:text-black"
                : "bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed"
            }`}
            disabled={ selectedValue==""?true:false}
            // className="py-3 border-[3px] drop-shadow-lg font-semibold w-28 text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
}
