import React from "react";
import Sidebar from "../../components/sidebar";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-grow flex-col px-10 py-5 min-h-screen w-full">
      <div className="mb-5">
        <h1 className="text-4xl text-green-800 font-bold">Dashboard</h1>
        <p className="font-medium text-gray-500">
          View your total summary from your invoices
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
            <h2 className=" pt-5 text-2xl text-black font-semibold">Insured</h2>
            <p className="text-gray-700 ">
              Total transaction amount from insured company based on invoice
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4  mt-5 pt-5 h-[60%]">
            <div className="drop-shadow-xl  border-b-[6px] bg-white  border-b-green-600 border-opacity-60 rounded-2xl h-full p-2 mr-4">
              <h3 className=" text-lg font-semibold mt-3  ml-2">Paid</h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total amount paid by insured in invoice
              </p>
              <p className="flex justify-center  text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>

            <div className="drop-shadow-xl border-b-[6px] bg-white border-b-yellow-500 border-opacity-60 rounded-2xl h-full p-2 mr-2 ml-2">
              <h3 className=" text-lg font-semibold mt-3  ml-2">Outstanding</h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total outstanding by insured in invoice
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>

            <div className="drop-shadow-xl bg-white border-b-[6px]  border-b-red-500  border-opacity-60 rounded-2xl h-full p-2 ml-3">
              <h3 className=" text-lg font-semibold mt-3 ml-2 ">Overdue</h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total overdue by insured in invoice
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>
          </div>
        </div>

        {/* Insurance Data */}
        <div className="h-[400px]   rounded-xl divide-y divide-gray-500 divide-solid  ">
          <div className="">
            <h2 className=" pt-5 text-2xl text-black font-semibold">Insurance</h2>
            <p className="text-gray-700 ">
              Total transaction amount from insurance company based on invoice
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4  mt-5 pt-5 h-[60%]">
            <div className="drop-shadow-xl  border-b-[6px] bg-white  border-b-green-600 border-opacity-60 rounded-2xl h-full p-2 mr-4">
              <h3 className=" text-lg font-semibold mt-3  ml-2">Paid</h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total amount paid by insurance in invoice
              </p>
              <p className="flex justify-center  text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>

            <div className="drop-shadow-xl border-b-[6px] bg-white border-b-yellow-500 border-opacity-60 rounded-2xl h-full p-2 mr-2 ml-2">
              <h3 className=" text-lg font-semibold mt-3  ml-2">Outstanding</h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total outstanding by insurance in invoice
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>

            <div className="drop-shadow-xl bg-white border-b-[6px]  border-b-red-500  border-opacity-60 rounded-2xl h-full p-2 ml-3">
              <h3 className=" text-lg font-semibold mt-3 ml-2 ">Overdue</h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total overdue by insurance in invoice
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
