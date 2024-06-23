"use client";
import dayjs from "dayjs";
import React from "react";

export default function invoicePdfTemplate({ invoice_data }) {
  return (
    <div className="bg-white w-full h-full p-0">
      <div className="bg-white ">
        {/* top half */}
        <div>
          <h1 className="text-3xl text-black font-bold mb-2">
            {invoice_data.invoice_id.includes("CN") ? "Credit " : "Debit "}Note
          </h1>
          {/* company details */}
          <div className="flex justify-between">
            <div className="">
              <img
                className="w-[130px] h-[130px]"
                src={invoice_data.company_pict}
                alt="company logo"
              />
            </div>
          </div>
          {/* invoice details */}
          <div className="border-[3px] border-black rounded-lg mt-2 p-2 grid grid-cols-2 gap-4 ">
            <div className="">
              <div className="flex">
                <b>FROM:&emsp;</b>
                <div>
                  <p className="font-semibold">{invoice_data.company_name}</p>
                  <p className="text-justify">{invoice_data.company_address}</p>
                  <p className="text-justify">{invoice_data.company_number}</p>
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
          <div class="rounded-t-lg mt-2 grid grid-cols-7 divide-x-[2.5px] border-[3px] border-black divide-black">
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
                    &emsp;{parseInt(invoice_data.net_premium).toLocaleString()}
                  </p>
                </div>
                <p>
                  {invoice_data.currency} &emsp;
                  {parseInt(invoice_data.brokerage).toLocaleString()}
                </p>
                <p>
                  {invoice_data.currency} &emsp;
                  {parseInt(invoice_data.discount).toLocaleString()}
                </p>
                <p>
                  {invoice_data.currency} &emsp;
                  {parseInt(invoice_data.pph).toLocaleString()}
                </p>
                <p>
                  {invoice_data.currency} &emsp;
                  {parseInt(invoice_data.risk_management).toLocaleString()}
                </p>
                <p>
                  {invoice_data.currency} &emsp;
                  {parseInt(invoice_data.admin_cost).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* premium due */}
          <div class="grid grid-cols-7 divide-x-[2.5px] rounded-b-lg mb-1 border-t-0 border-[3px] border-black divide-black">
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
                  {parseInt(invoice_data.total_premium_due).toLocaleString()}
                </b>
              </div>
            </div>
          </div>
        </div>

        {/* content */}
        <div className=" rounded-lg mt-2 mb-1 border-[3px] border-black p-3">
          <div className="grid grid-cols-7 p-2 ">
            <b className="col-span-2">Policy No</b>
            <p className="col-span-5">: &emsp;{invoice_data.policy_number}</p>
          </div>

          <div className="grid grid-cols-7 px-2">
            <b className="col-span-2 ">Name of Insured</b>
            <p className="col-span-5">: &emsp;{invoice_data.name_of_insured}</p>
          </div>

          <div className="grid grid-cols-7 px-2">
            <b className="col-span-2 ">Address of Insured</b>
            <div className="col-span-5 flex">
              : &emsp;<p>{invoice_data.address_of_insured}</p>
            </div>
          </div>

          <div className="grid grid-cols-7 px-2">
            <b className="col-span-2 ">Type of insurance</b>
            <div className="col-span-5 flex">
              : &emsp;<b>{invoice_data.insurance_type}</b>
            </div>
          </div>
        </div>
        <div className=" rounded-lg mt-1 border-[3px] border-black p-3">
          <div className="grid grid-cols-7 p-2">
            <b className="col-span-2 ">Period of Policy</b>
            <div className="col-span-5 flex">
              : &emsp;
              <p>
                {dayjs(invoice_data.start_date).format("DD/MM/YYYY")} up to{" "}
                {dayjs(invoice_data.end_date).format("DD/MM/YYYY")}
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
                          {data.Items_Name}
                        </td>
                        <td className="border-2 border-black px-1 ">
                          {invoice_data.currency}&emsp;
                          {parseInt(data.Sum_Insured_Amount).toLocaleString()}
                        </td>
                        <td className="border-2 border-black px-1 ">
                          {data.Notes}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* remarks */}
          <div className="grid grid-cols-7 p-2 bg-white">
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
                            {parseInt(data.Ins_Amount).toLocaleString()}
                          </td>
                          <td className="border-2 border-black px-1 font-semibold">
                            {dayjs(data.Due_Date).format("DD/MM/YYYY")}
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
                        {parseInt(
                          invoice_data.total_premium_due
                        ).toLocaleString()}
                      </td>
                      <td className="border-2 border-black "></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
