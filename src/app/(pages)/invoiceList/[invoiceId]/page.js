"use client";
import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import PdfButton from '../../../components/pdfButton'


export default function invoiceDetail({ params }) {
  const invoice_data = {
    invoice_id: params.invoice_id,
    invoice_type: "credit",
    company_name: "PT. Lead Insurance Broker",
    company_address:
      "AD Premier Office Park 17th Floor Suite 6 Jl.TB Simatupang No. 5, Jakarta Selatan 12550, Indonesia",
    company_number: "+62 821809246",
    recipient: "PT. Garuda Indonesia",
    recipient_address:
      "Jl. Dewi Sartika, Sentani Kota Sentani, Cawang,Jakarta 99352, Indonesia",
    invoice_id: params.invoiceId,
    currency: "USD",
    net_premium: 100000,
    brokerage: 100,
    discount: 50,
    pph: 50,
    risk_management: 10,
    admin_cost: 3,
    total_premium_due: 90000,
    policy_number: "70.301.50.2023.0011-0",
    name_of_insured: "PT. Alda Air",
    address_of_insured:
      "Jl. Telkom, Sentani Kota Sentani, Jayapura Regency,Papua 99352, Indonesia",
    insurance_type:
      "AVIATION HULL & SPARES ALL RISKS, THIRDPARTY AND PASSENGER LIABILITY, HULL WAR, PERSONAL ACCIDENT",
    start_date: dayjs("05/31/2024").format("DD/MM/YYYY"),
    end_date: dayjs("12/31/2024").format("DD/MM/YYYY"),
    sum_insured_detail: [
      { item: "Cessna Grand Caravan EX", sum_insured: 2580, note: "PK DLT" },
      { item: "Cessna Grand Caravan EX", sum_insured: 2700, note: "PK DLY" },
      { item: "Cessna Grand Caravan EX", sum_insured: 2600, note: "PK DLA" },
    ],

    terms_of_payment: "based on AVN 6A.",
    remarks: "sample of remarks",
    instalments_detail: [
      {
        instalment_id: "INS-001",
        instalment_number: 1,
        due_date: dayjs("2024-07-31").toISOString(),
        amount: 30000,
      },
      {
        instalment_id: "INS-002",
        instalment_number: 2,
        due_date: dayjs("2024-10-31").toISOString(),
        amount: 30000,
      },
      {
        instalment_id: "INS-003",
        instalment_number: 3,
        due_date: dayjs("2024-12-31").toISOString(),
        amount: 30000,
      },
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      {/* <PdfTemplate data={invoice_data} ref={pdfRef} /> */}
      <div className="mb-2">
        <h1 className="text-4xl text-green-700 font-bold">
          {params.invoiceId}
        </h1>
        <p className="ml-1 font-medium text-gray-600">View Invoice Details</p>
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 ">
        
          {/* top half */}
          <div>
            <h1 className="text-3xl text-black font-bold mb-2">
              {invoice_data.invoice_id.includes("CN") ? "Credit " : "Debit "}Note
            </h1>
            {/* company details */}
            <div className="flex justify-between">
              <div className="w-[200px] border-2 border-black h-[200px]">
                {" "}
                image sementara
              </div>
            </div>
            {/* invoice details */}
            <div className="border-[3px] border-black rounded-lg mt-2 p-2 grid grid-cols-2 gap-4 ">
              <div className="">
                <div className="flex">
                  <b>FROM:&emsp;</b>
                  <div>
                    <p className="font-semibold">{invoice_data.company_name}</p>
                    <p className="text-justify">
                      {invoice_data.company_address}
                    </p>
                    <p className="text-justify">
                      {invoice_data.company_number}
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <p className="flex">
                  <b>NO:&emsp;</b>
                  {invoice_data.invoice_id}
                </p>
                <div className="flex">
                  <b>TO:&emsp;</b>
                  <div>
                    <p className="font-semibold">{invoice_data.recipient}</p>
                    <p className="text-justify">
                      {invoice_data.recipient_address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* description */}
            <div class="rounded-t-lg mt-5 grid grid-cols-7 divide-x-[2.5px] border-[3px] border-black divide-black">
              <div class="grid grid-cols-1 divide-y-[2.5px]  divide-black">
                <div className="flex justify-center font-bold py-2">NO</div>
                <div className="flex flex-col items-center">
                  <p>1</p>
                  <p>2</p>
                  <p>3</p>
                  <p>4</p>
                  <p>5</p>
                  <p>6</p>
                </div>
              </div>
              <div class="col-span-4 grid grid-cols-1 divide-y-[2.5px]  divide-black">
                <div className="flex justify-center font-bold py-2">
                  DESCRIPTION
                </div>
                <div className="px-3">
                  <p>Net Premium</p>
                  <p>Brokerage</p>
                  <p>Discount</p>
                  <p>PPH</p>
                  <p>Risk Management</p>
                  <p>Admin Cost</p>
                </div>
              </div>
              <div class="col-span-2 grid grid-cols-1 divide-y-[2.5px] divide-black">
                <div className="flex justify-center font-bold py-2">AMOUNT</div>
                <div className="px-3">
                  <div className="flex items-center">
                    <b>{invoice_data.currency}</b>
                    <p className="text-right">
                      &emsp;{invoice_data.net_premium.toLocaleString()}
                    </p>
                  </div>
                  <p>
                    {invoice_data.currency} &emsp;
                    {invoice_data.brokerage.toLocaleString()}
                  </p>
                  <p>
                    {invoice_data.currency} &emsp;
                    {invoice_data.discount.toLocaleString()}
                  </p>
                  <p>
                    {invoice_data.currency} &emsp;
                    {invoice_data.pph.toLocaleString()}
                  </p>
                  <p>
                    {invoice_data.currency} &emsp;
                    {invoice_data.risk_management.toLocaleString()}
                  </p>
                  <p>
                    {invoice_data.currency} &emsp;
                    {invoice_data.admin_cost.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* premium due */}
            <div class="grid grid-cols-7 divide-x-[2.5px] rounded-b-lg mb-2 border-t-0 border-[3px] border-black divide-black">
              <div class="col-span-5 grid grid-cols-1 divide-y-[2.5px]  divide-black">
                <div className="flex justify-center font-bold py-2">
                  {invoice_data.invoice_id.includes("CN")
                    ? "TOTAL PREMIUM DUE TO YOU"
                    : "TOTAL PREMIUM DUE TO US"}
                </div>
              </div>
              <div class="col-span-2 grid grid-cols-1 divide-y-[2.5px] divide-black">
                <div className="font-bold py-2 px-3">
                  <b>
                    {invoice_data.currency} &emsp;
                    {invoice_data.total_premium_due.toLocaleString()}
                  </b>
                </div>
              </div>
            </div>
          </div>

          {/* content */}
          <div className=" rounded-lg mt-5 border-[3px] border-black p-3">
            <div className="grid grid-cols-7 p-2 ">
              <b className="col-span-2">Policy No</b>
              <p className="col-span-5">: &emsp;{invoice_data.policy_number}</p>
            </div>

            <div className="grid grid-cols-7 p-2">
              <b className="col-span-2 ">Name of Insured</b>
              <p className="col-span-5">
                : &emsp;{invoice_data.name_of_insured}
              </p>
            </div>

            <div className="grid grid-cols-7 p-2">
              <b className="col-span-2 ">Address of Insured</b>
              <div className="col-span-5 flex">
                : &emsp;<p>{invoice_data.address_of_insured}</p>
              </div>
            </div>

            <div className="grid grid-cols-7 p-2">
              <b className="col-span-2 ">Type of insurance</b>
              <div className="col-span-5 flex">
                : &emsp;<b>{invoice_data.insurance_type}</b>
              </div>
            </div>

            <div className="grid grid-cols-7 p-2">
              <b className="col-span-2 ">Period of Policy</b>
              <div className="col-span-5 flex">
                : &emsp;
                <p>
                  {invoice_data.start_date} up to {invoice_data.end_date}
                </p>
              </div>
            </div>

            {/* sum insured */}
            <div className="grid grid-cols-7 p-2">
              <b className="col-span-2 ">Sum Insured</b>
              <div className="col-span-5 flex">
                : &emsp;
                <table className="border-2 border-black w-full">
                  <tbody>
                    <tr className="border-2 border-black ">
                      <th className="border-2 border-black ">Item</th>
                      <th className="border-2 border-black ">Sum Insured</th>
                      <th className="border-2 border-black ">Notes</th>
                    </tr>
                  </tbody>
                  <tbody>
                    {invoice_data.sum_insured_detail.map((data, key) => {
                      return (
                        <tr key={key}>
                          <td className="border-2 border-black px-1 ">
                            {data.item}
                          </td>
                          <td className="border-2 border-black px-1 ">
                            {invoice_data.currency}&emsp;
                            {data.sum_insured.toLocaleString()}
                          </td>
                          <td className="border-2 border-black px-1 ">
                            {data.note}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* remarks */}
            <div className="grid grid-cols-7 p-2">
              <b className="col-span-2 ">Remarks</b>
              <div className="col-span-5 flex">
                : &emsp;
                <div className="w-full">
                  <p>{invoice_data.remarks}</p>
                  <p>Terms of Payment {invoice_data.terms_of_payment}</p>
                  <table className="border-2 border-black w-full">
                    <tbody>
                      <tr className="border-2 border-black ">
                        <th colSpan="2" className="border-2 border-black ">
                          INSTALMENT
                        </th>
                        <th className="border-2 border-black ">Due Date</th>
                      </tr>
                    </tbody>
                    <tbody>
                      {invoice_data.instalments_detail.map((data, key) => {
                        return (
                          <tr key={key}>
                            <td className="border-2 border-black px-1 font-semibold ">
                              {key + 1}
                            </td>
                            <td className="border-2 border-black px-1 ">
                              {invoice_data.currency}&emsp;
                              {data.amount.toLocaleString()}
                            </td>
                            <td className="border-2 border-black px-1 font-semibold">
                              {dayjs(data.due_date).format('DD/MM/YYYY')}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="border-2 border-black ">
                        <td className="border-2 border-black font-bold ">
                          TOTAL
                        </td>
                        <td className="border-2 border-black font-bold">
                          {invoice_data.currency}&emsp;
                          {invoice_data.total_premium_due}
                        </td>
                        <td className="border-2 border-black "></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* bottom half */}
          
            <div className="flex justify-end mt-5 p-2 ">
              <button className="p-2 border-[3px] mr-3 drop-shadow-lg font-bold text-white hover:bg-white hover:text-black rounded-lg bg-yellow-600 border-yellow-600">
                <Link
                  href={params.invoiceId + "/editInvoice"}
                  state={invoice_data}
                >
                  Edit
                </Link>
              </button>
              <div className="w-[130px]"><PdfButton invoice_data={invoice_data} /></div>
              
            </div>
          
      </div>
    </div>
  );
}

