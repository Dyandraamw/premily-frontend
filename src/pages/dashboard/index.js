import React from "react";
import Sidebar from "../../app/components/sidebar";

export default function Dashboard() {
  return (
    <main className="flex min-h-screen bg-gray-200">
      <Sidebar />
      <div className="flex flex-grow flex-col px-10 py-5">
        <div className="mb-5">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="font-medium text-gray-500">
            View your total summary from your invoices
          </p>
        </div>

        <div className="flex">
          <div className="flex text-md w-64 justify-center py-3 bg-white hover:bg-gray-100 rounded-lg drop-shadow-md font-semibold mr-5">
            Create New Credit Note{" "}
          </div>
          <div className="flex text-md w-64 justify-center py-3 bg-white hover:bg-gray-100 rounded-lg drop-shadow-md font-semibold ">
            Create New debit Note{" "}
          </div>
        </div>

        {/* Insured Data */}
        <div className="h-80 bg-white my-10 rounded-lg">
          <h2 className="p-5 text-2xl font-semibold">Insured</h2>
          <div className="grid grid-cols-3 gap-4 mx-5 h-[65%]">
            <div className="drop-shadow-md border-2 border-gray-700 rounded-lg h-full p-2">
              <h3 className=" text-lg font-semibold mt-3">Paid</h3>
              <p className="text-gray-500 mt-1">
                Total amount paid by insured in invoice
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>

            <div className="drop-shadow-md border-2 border-gray-700 rounded-lg h-full p-2">
              <h3 className=" text-lg font-semibold mt-3">Outstanding</h3>
              <p className="text-gray-500 mt-1">
                Total outstanding by insured in invoice
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>

            <div className="drop-shadow-md border-2 border-gray-700 rounded-lg h-full p-2">
              <h3 className=" text-lg font-semibold mt-3">Overdue</h3>
              <p className="text-gray-500 mt-1">
                Total overdue by insured in invoice
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>
          </div>
        </div>

        {/* Insurance Data */}
        <div className="h-80 bg-white  rounded-lg">
          <h2 className="p-5 text-2xl font-semibold">Insurance</h2>
          <div className="grid grid-cols-3 gap-4 mx-5 h-[65%]">
            <div className="drop-shadow-md border-2 border-gray-700 rounded-lg h-full p-2">
              <h3 className=" text-lg font-semibold mt-3">Paid</h3>
              <p className="text-gray-500 mt-1">
                Total amount paid by insurance in invoice
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>

            <div className="drop-shadow-md border-2 border-gray-700 rounded-lg h-full p-2">
              <h3 className=" text-lg font-semibold mt-3">Outstanding</h3>
              <p className="text-gray-500 mt-1">
                Total outstanding by insurance in invoice
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>

            <div className="drop-shadow-md border-2 border-gray-700 rounded-lg h-full p-2">
              <h3 className=" text-lg font-semibold mt-3">Overdue</h3>
              <p className="text-gray-500 mt-1">
                Total overdue by insurance in invoice
              </p>
              <p className="flex justify-center text-3xl font-semibold mt-10">
                $100,00
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
