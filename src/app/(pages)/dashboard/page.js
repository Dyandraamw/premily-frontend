"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPaymentStatusList } from "@/app/utils/api/psApi";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [creditSummary, setCreditSummary] = useState([
    {
      paid: 0,
      outstanding: 0,
      overdue: 0,
    },
  ]);
  const [debitSummary, setDebitSummary] = useState([
    {
      paid: 0,
      outstanding: 0,
      overdue: 0,
    },
  ]);

  useEffect(() => {
    const fetchList = async () => {
      const psList = await fetchPaymentStatusList();
      // setPaymentStatusList(psList);
      //console.log(psList)
      calcData(psList);
    };
    fetchList();

    const calcData = (psList) => {
      //calc summary
      const cnFilter = handleFilter("CN", psList);
      let cnPaidSum = 0;
      let cnOutstandingSum = 0;
      let cnOverdueSum = 0;

      cnFilter.map((cn) => {
        cnPaidSum += parseInt(cn.payment_sum);
        cnOutstandingSum += parseInt(cn.outstanding_sum);
        cnOverdueSum += parseInt(cn.overdue_sum);
      });

      setCreditSummary({
        ...creditSummary,
        paid: cnPaidSum,
        outstanding: cnOutstandingSum,
        overdue: cnOverdueSum,
      });
      const dnFilter = handleFilter("DN", psList);

      let dnPaidSum = 0;
      let dnOutstandingSum = 0;
      let dnOverdueSum = 0;

      dnFilter.map((dn) => {
        dnPaidSum += parseInt(dn.payment_sum);
        dnOutstandingSum += parseInt(dn.outstanding_sum);
        dnOverdueSum += parseInt(dn.overdue_sum);
      });

      setDebitSummary({
        ...debitSummary,
        paid: dnPaidSum,
        outstanding: dnOutstandingSum,
        overdue: dnOverdueSum,
      });
    };
  }, []);

  const handleFilter = (query, psList) => {
    // const searchQuery = e.target.value;
    // //console.log(e.target.value)
    // setQuery(searchQuery);

    const filteredData = psList.filter((data) =>
      data.invoice_id.toLowerCase().includes(query.toLowerCase())
    );
    // console.log(paymentStatusList)
    return filteredData;
  };

  // console.log(creditSummary);
  // console.log(debitSummary);
  // console.log(Cookies.get("userRole"))
  return (
    <div className="flex flex-grow flex-col px-10 py-5 min-h-screen w-full">
      <div className="mb-5">
        <h1 className="text-4xl text-green-800 font-bold">Dashboard</h1>
        <p className="font-medium text-gray-500">
          View your total summary of transaction
        </p>
      </div>

      <div className="flex mt-5">
        <Link href={"/creditNote"}>
          <button className="justify-center py-3 border-[3px] drop-shadow-lg font-semibold w-64 text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700 mr-5">
            Create New Credit Note
          </button>
        </Link>

        <Link href={"/debitNote"}>
          <button className="justify-center py-3 border-[3px] drop-shadow-lg font-semibold w-64 text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700 mr-5">
            Create New Debit Note
          </button>
        </Link>
      </div>

      <div className="bg-white mt-10 p-5 rounded-xl drop-shadow-lg">
        {/* Insured Data */}
        <div className="h-[400px]   rounded-xl divide-y divide-gray-500 divide-solid  ">
          <div className="">
            <h2 className=" pt-5 text-2xl text-black font-semibold">
              Credit Note Summary
            </h2>
            <p className="text-gray-700 ">
              Total transaction amount from credit notes based on existing
              payment statuses
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4  mt-5 pt-5 h-[60%]">
            <div className="drop-shadow-xl  border-b-[6px] bg-white  border-b-green-600 border-opacity-60 rounded-2xl h-full p-2 mr-4">
              <h3 className=" text-lg font-semibold mt-3  ml-2">Paid (IDR)</h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total paid amount for credit note in
              </p>
              <p className="flex justify-center  text-3xl font-semibold mt-10">
                {parseInt(creditSummary.paid).toLocaleString()}
              </p>
            </div>

            <div className="drop-shadow-xl border-b-[6px] bg-white border-b-yellow-500 border-opacity-60 rounded-2xl h-full p-2 mr-2 ml-2">
              <h3 className=" text-lg font-semibold mt-3  ml-2">
                Outstanding (IDR)
              </h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total outstanding amount for credit note
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                {parseInt(creditSummary.outstanding).toLocaleString()}
              </p>
            </div>

            <div className="drop-shadow-xl bg-white border-b-[6px]  border-b-red-500  border-opacity-60 rounded-2xl h-full p-2 ml-3">
              <h3 className=" text-lg font-semibold mt-3 ml-2 ">
                Overdue (IDR)
              </h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total overdue amount for credit note
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                {parseInt(creditSummary.overdue).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Insurance Data */}
        <div className="h-[400px]   rounded-xl divide-y divide-gray-500 divide-solid  ">
          <div className="">
            <h2 className=" pt-5 text-2xl text-black font-semibold">
              Debit Note Summary
            </h2>
            <p className="text-gray-700 ">
              Total transaction amount from debit notes based on existing
              payment statuses
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4  mt-5 pt-5 h-[60%]">
            <div className="drop-shadow-xl  border-b-[6px] bg-white  border-b-green-600 border-opacity-60 rounded-2xl h-full p-2 mr-4">
              <h3 className=" text-lg font-semibold mt-3  ml-2">Paid (IDR)</h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total paid amount for debit note
              </p>
              <p className="flex justify-center  text-3xl font-semibold mt-10">
                {parseInt(debitSummary.paid).toLocaleString()}
              </p>
            </div>

            <div className="drop-shadow-xl border-b-[6px] bg-white border-b-yellow-500 border-opacity-60 rounded-2xl h-full p-2 mr-2 ml-2">
              <h3 className=" text-lg font-semibold mt-3  ml-2">
                Outstanding (IDR)
              </h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total outstanding amount for debit note
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                {parseInt(debitSummary.outstanding).toLocaleString()}
              </p>
            </div>

            <div className="drop-shadow-xl bg-white border-b-[6px]  border-b-red-500  border-opacity-60 rounded-2xl h-full p-2 ml-3">
              <h3 className=" text-lg font-semibold mt-3 ml-2 ">
                Overdue (IDR)
              </h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total overdue amount for debit note
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                {parseInt(debitSummary.overdue).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
