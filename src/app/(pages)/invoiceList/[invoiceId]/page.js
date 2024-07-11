"use client";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import PdfButton from "../../../components/pdfButton";
import { fetchInvoiceDetail } from "../../../utils/api/invApi";
import Image from "next/image";
import Cookies from "js-cookie";
import useMounted from "@/app/utils/hooks/useMounted";
import LoadingModal from "@/app/components/loadingModal";


const userRole = Cookies.get("userRole");
export default function invoiceDetail({ params }) {
  const [spinner,setSpinner] = useState(true)
  const mounted = useMounted();
  const [invoice_data, setInvDetail] = useState({
    recipient_address: "",
    address_of_insured: "",
    company_address: "",
    company_number: "",
    company_name: "",
    company_pict: "",
    created_at: null,
    admin_cost: 0,
    brokerage: 0,
    discount: 0,
    pph: 0,
    risk_management: 0,
    invoice_id: "",
    name_of_insured: "",
    net_premium: 0,
    end_date: null,
    start_date: null,
    policy_number: "",
    remarks: "",
    recipient: "",
    terms_of_payment: "",
    total_premium_due: 0,
    invoice_type: "",
    insurance_type: "",
    updated_at: null,
    user_id: "",
    instalments_detail: [
      {
        Installment_ID: "",
        Invoice_ID: "",
        Due_Date: null,
        Ins_Amount: 0,
        Payment_Details: "",
      },
    ],
    sum_insured_detail: [
      {
        Sum_Insured_ID: "",
        Invoice_ID: "",
        Items_Name: "",
        Sum_Insured_Amount: 0,
        Notes: "",
      },
    ],
    currency: "",
  });

  const [descData,setDescData] = useState([])

  useEffect(() => {
    const fetchinv = async () => {
      const invList = await fetchInvoiceDetail(params.invoiceId);
      setSpinner(false)
      setInvDetail({
        ...invoice_data,
        recipient_address: invList.Address,
        address_of_insured: invList.Address_Of_Insured,
        company_address: invList.Company_Address,
        company_number: invList.Company_Contact,
        company_name: invList.Company_Name,
        company_pict: invList.Company_Picture,
        created_at: invList.Created_At,
        admin_cost: invList.Desc_Admin_Cost,
        brokerage: invList.Desc_Brokage,
        discount: invList.Desc_Discount,
        pph: invList.Desc_PPH,
        risk_management: invList.Desc_Risk_Management,
        invoice_id: invList.Invoice_ID,
        name_of_insured: invList.Name_Of_Insured,
        net_premium: invList.Net_Premium,
        end_date: invList.Period_End,
        start_date: invList.Period_Start,
        policy_number: invList.Policy_Number,
        remarks: invList.Remarks,
        recipient: invList.Recipient,
        terms_of_payment: invList.Terms_Of_Period,
        total_premium_due: invList.Total_Premium_Due,
        invoice_type: invList.Type,
        insurance_type: invList.Type_Of_Insurance,
        updated_at: invList.Updated_At,
        user_id: invList.UserID,
        sum_insured_detail: invList.Sum_Insured_Details,
        instalments_detail: invList.Installment,
        currency: invList.Currency,
      });
      let descArr = []
      if (invList.Net_Premium !='0') {
        descArr.push({title:'Premium', value : invList.Net_Premium})
      }
      if (invList.Desc_Brokage !='0') {
        descArr.push({title:'Brokerage', value : invList.Desc_Brokage})
      }
      if (invList.Desc_Discount !='0') {
        descArr.push({title:'Discount', value : invList.Desc_Discount})
      }
      if (invList.Desc_PPH !='0') {
        descArr.push({title:'PPH', value : invList.Desc_PPH})
      }
      if (invList.Desc_Risk_Management !='0') {
        descArr.push({title:'Risk Management', value : invList.Desc_Risk_Management})
      }
      if (invList.Desc_Admin_Cost !='0') {
        descArr.push({title:'Admin Cost', value : invList.Desc_Admin_Cost})
      }

      setDescData(descArr)

      console.log(descArr);
    };
    fetchinv();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
  };
  //console.log(invoice_data.company_pict);

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <LoadingModal modalState={spinner} />
      {/* <PdfTemplate data={invoice_data} ref={pdfRef} /> */}
      <div className="mb-2">
        <h1 className="text-4xl text-green-700 font-bold">Invoice Detail</h1>
        <p className="ml-1 font-medium text-gray-600">
          View Invoice Number {params.invoiceId} Details
        </p>
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 drop-shadow-xl ">
        {/* top half */}
        <div>
          <h1 className="text-3xl text-black font-bold mb-2">
            {invoice_data.invoice_type == "credit" ? "Credit " : "Debit "}Note
          </h1>
          {/* company details */}
          <div className="flex justify-between">
            <div className="mb-2">
              <img
                className="w-[130px] h-[130px]"
                src={invoice_data.company_pict}
                alt="company logo"
              />
            </div>
          </div>
          {/* invoice details */}
          <div className="border-[3px] border-black rounded-lg  p-2 grid grid-cols-2 gap-4 ">
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
          <div class="rounded-t-lg mt-5 grid grid-cols-7 divide-x-[2.5px] border-[3px] border-black divide-black">
            <div class="grid grid-cols-1 divide-y-[2.5px]  divide-black">
              <div className="flex justify-center font-bold py-2">NO</div>
              <div className="flex flex-col items-center">
                {descData.map((data,idx)=>(
                  <p>{idx+1}</p>
                ))}
              </div>
            </div>
            <div class="col-span-4 grid grid-cols-1 divide-y-[2.5px]  divide-black">
              <div className="flex justify-center font-bold py-2">
                DESCRIPTION
              </div>
              <div className="px-3">
              {descData.map((data)=>(
                  <p>{data.title}</p>
                ))}
              </div>
            </div>
            <div class="col-span-2 grid grid-cols-1 divide-y-[2.5px] divide-black">
              <div className="flex justify-center font-bold py-2">AMOUNT</div>
              <div className="px-3">
              {descData.map((data)=>(
                  <div>
                    {data.title=='Premium'? <div className="flex items-center">
                  <b>{invoice_data.currency}</b>
                  <p className="text-right">
                    &emsp;{parseInt(data.value).toLocaleString()}
                  </p>
                </div> :<p>
                  {invoice_data.currency} &emsp;
                  {parseInt(data.value).toLocaleString()}
                </p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* premium due */}
          <div class="grid grid-cols-7 divide-x-[2.5px] rounded-b-lg mb-2 border-t-0 border-[3px] border-black divide-black">
            <div class="col-span-5 grid grid-cols-1 divide-y-[2.5px]  divide-black">
              <div className="flex justify-center font-bold py-2">
                {invoice_data.invoice_type == "credit"
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
        <div className=" rounded-lg mt-5 border-[3px] border-black p-3">
          <div className="grid grid-cols-7 p-2 ">
            <b className="col-span-2">Policy No</b>
            <p className="col-span-5">: &emsp;{invoice_data.policy_number}</p>
          </div>

          <div className="grid grid-cols-7 p-2">
            <b className="col-span-2 ">Name of Insured</b>
            <p className="col-span-5">: &emsp;{invoice_data.name_of_insured}</p>
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
                {dayjs(invoice_data.start_date).format("DD MMM YYYY")} up to{" "}
                {dayjs(invoice_data.end_date).format("DD MMM YYYY")}
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
        {/* bottom half */}

        <div className="flex justify-end mt-5 p-2 ">
          {mounted && userRole == "staff" ? null : (
            <button className="p-2 border-[3px] mr-3 drop-shadow-lg font-bold text-white hover:bg-white hover:text-black rounded-lg bg-yellow-600 border-yellow-600">
              <Link
                href={params.invoiceId + "/editInvoice"}
                state={invoice_data}
              >
                Edit
              </Link>
            </button>
          )}

          <div className="w-[130px]">
            <PdfButton invoice_data={invoice_data} descData={descData} />
          </div>
        </div>
      </div>
    </div>
  );
}
