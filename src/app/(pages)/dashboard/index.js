import React from "react";
import Sidebar from "../../components/sidebar";
import Link from "next/link";


export default function Dashboard() {
  return (
      <div className="flex flex-grow flex-col px-10 py-5">
        <div className="mb-5">
          <h1 className="text-4xl text-blue-600 font-bold">Dashboard</h1>
          <p className="font-medium text-gray-500">
            View your total summary from your invoices
          </p>
        </div>

        <div className="flex">
          <Link href={"/creditNote"}>
            <div className="flex border-[3px] border-blue-400 text-md w-64 justify-center py-3 bg-white hover:bg-gray-100 rounded-lg drop-shadow-md font-semibold mr-5">
              Create New Credit Note{" "}
            </div>
          </Link>

          <Link href={"/debitNote"}>
            <div className="flex border-[3px] border-blue-400 text-md w-64 justify-center py-3 bg-white hover:bg-gray-100 rounded-lg drop-shadow-md font-semibold mr-5">
              Create New Debit Note{" "}
            </div>
          </Link>
        </div>

        {/* Insured Data */}
        <div className="h-80 bg-white my-10 rounded-lg drop-shadow-lg">
          <h2 className="px-5 pt-5 text-2xl text-blue-600 font-semibold">
            Insured
          </h2>
          <p className="text-gray-500 pl-5 mb-3 ">
            Total transaction amount from insured company based on invoice
          </p>
          <div className="grid grid-cols-3 gap-4 mx-5 h-[65%]">
            <div className="drop-shadow-md border-[3px] border-green-600 border-opacity-50 rounded-2xl h-full p-2 mr-4">
              <h3 className=" text-lg font-semibold mt-3 text-green-700 ml-2">
                Paid
              </h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total amount paid by insured in invoice
              </p>
              <p className="flex justify-center  text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>

            <div className="drop-shadow-md border-[3px] border-yellow-500 border-opacity-60 rounded-2xl h-full p-2 mr-2 ml-2">
              <h3 className=" text-lg font-semibold mt-3 text-yellow-600 ml-2">
                Outstanding
              </h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total outstanding by insured in invoice
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>

            <div className="drop-shadow-md border-[3px] border-red-500 border-opacity-60 rounded-2xl h-full p-2 ml-3">
              <h3 className=" text-lg font-semibold mt-3 ml-2 text-red-600">
                Overdue
              </h3>
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
        <div className="h-80 bg-white  rounded-lg drop-shadow-lg">
          <h2 className="px-5 pt-5 text-2xl text-blue-600 font-semibold">
            Insurance
          </h2>
          <p className="text-gray-500 pl-5 mb-3 ">
            Total transaction amount from insurance based on invoice
          </p>
          <div className="grid grid-cols-3 gap-4 mx-5 h-[65%]">
            <div className="drop-shadow-md border-[3px] border-green-600 border-opacity-50 rounded-2xl h-full p-2 mr-4">
              <h3 className=" text-lg font-semibold mt-3 text-green-700 ml-2">
                Paid
              </h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total amount paid by insurance in invoice
              </p>
              <p className="flex justify-center  text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>

            <div className="drop-shadow-md border-[3px] border-yellow-500 border-opacity-60 rounded-2xl h-full p-2 mr-2 ml-2">
              <h3 className=" text-lg font-semibold mt-3 text-yellow-600 ml-2">
                Outstanding
              </h3>
              <p className="text-gray-500 mt-1 ml-2">
                Total outstanding by insurance in invoice
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>

            <div className="drop-shadow-md border-[3px] border-red-500 border-opacity-60 rounded-2xl h-full p-2 ml-3">
              <h3 className=" text-lg font-semibold mt-3 ml-2 text-red-600">
                Overdue
              </h3>
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
  );
}
