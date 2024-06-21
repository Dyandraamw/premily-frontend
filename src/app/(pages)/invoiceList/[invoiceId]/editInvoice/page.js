"use client";
import React, { useState } from "react";
import Textfield from "../../../../components/textfield";
import SideTextfield from "../../../../components/sideTextfield";
import DatePickerMUI from "../../../../components/datePickerMUI";
import SumInsuredForm from "../../../../components/invoiceComponents/editSumInsuredForm";
import InvInstallmentForm from "../../../../components/invoiceComponents/editInvInstallmentForm";
import dayjs from "dayjs";
<<<<<<< Updated upstream
=======
import { fetchInvoiceDetail, updateInvoiceApi } from "@/app/utils/api/invApi";
>>>>>>> Stashed changes

export default function editInvoice({ params }) {
  const [invoiceData, setinvoiceData] = useState({
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
    start_date: dayjs("2024-05-31").toISOString(),
    end_date: dayjs("2024-12-314").toISOString(),
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
  });

  const handleTextChange = (e) => {
    setinvoiceData({ ...invoiceData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let invForm = new FormData();
    // invForm.append("typeInvoice", "credit");
    invForm.append("recipient", invoiceData.recipient);
    invForm.append("address", invoiceData.recipient_address);
    invForm.append("net_premium", invoiceData.net_premium);
    invForm.append("desc_discount", invoiceData.discount);
    invForm.append("desc_admin_cost", invoiceData.admin_cost);
    invForm.append("desc_risk_management", invoiceData.risk_management);
    invForm.append("desc_brokage", invoiceData.brokerage);
    invForm.append("desc_pph", invoiceData.pph);
    invForm.append("total_premium_due", invoiceData.total_premium_due);
    invForm.append("policy_number", invoiceData.policy_number);
    invForm.append("name_of_insured", invoiceData.name_of_insured);
    invForm.append("address_of_insured", invoiceData.address_of_insured);
    invForm.append("type_of_insurance", invoiceData.insurance_type);

    invForm.append("periode_start", dayjs(invoiceData.start_date).format("YYYY-MM-DD"));
    invForm.append("periode_end", dayjs(invoiceData.end_date).format("YYYY-MM-DD"));

    invForm.append("terms_of_period", invoiceData.terms_of_payment);
    invForm.append("remarks", invoiceData.remarks);
    insData.map((data) => {
      invForm.append("due_date", dayjs(data.Due_Date).format("YYYY-MM-DD"));
      invForm.append("ins_amount", data.Ins_Amount);
    });

    // invForm.append("company_pict", imgValue);
    invForm.append("comp_name", invoiceData.company_name);
    invForm.append("comp_address", invoiceData.company_address);
    invForm.append("comp_contact", invoiceData.company_number);

    siData.map((data) => {
      invForm.append("items_name", data.Items_Name);
      invForm.append("sum_ins_amount", data.Sum_Insured_Amount);
      invForm.append("notes", data.Notes);
    });
    
    await updateInvoiceApi(invForm,params.invoiceId)
  };

  const handleStartDate = (e) => {
    const dateformat = dayjs(e.$d).format("YYYY-MM-DD");
    setinvoiceData({ ...invoiceData, start_date: dateformat });
  };

  const handleEndDate = (e) => {
    const dateformat = dayjs(e.$d).format("YYYY-MM-DD");
    setinvoiceData({ ...invoiceData, end_date: dateformat });
  };
<<<<<<< Updated upstream
  

=======
  //console.log(invoiceData);
>>>>>>> Stashed changes
  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <div className="mb-2">
        <h1 className="text-4xl text-green-700 font-bold">
          {params.invoiceId.startsWith("CN")?"Credit":"Debit"} Note
        </h1>
        <p className="ml-1 font-medium text-gray-600">
          Create a new Credit Note
        </p>
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-2 h-min-[1700px]">
        <form
          onSubmit={handleSubmit}
          className="p-5 divide-y divide-black divide-solid"
        >
          {/* top half */}
          <div>
            {/* company details */}
            <div className="flex justify-between">
              <div className="w-[300px] border-2 border-black h-[300px]">
                {" "}
                image sementara
              </div>
              <div className="flex flex-col w-96 mt-5">
                <Textfield
                  label={"Company Name"}
                  id={"company_name"}
                  placeholder={"insert your company name..."}
                  onChange={handleTextChange}
                  value={invoiceData.company_name}
                />
                <Textfield
                  label={"Company Address"}
                  id={"company_address"}
                  placeholder={"insert your company address..."}
                  onChange={handleTextChange}
                  value={invoiceData.company_address}
                />
                <Textfield
                  label={"Company Number"}
                  id={"company_number"}
                  placeholder={"insert your company number..."}
                  onChange={handleTextChange}
                  value={invoiceData.company_number}
                />
              </div>
            </div>

            {/* invoice main details */}
            <div className="grid grid-cols-4 gap-6 mt-5">
              <Textfield
                label={"Invoice Recipient"}
                id={"recipient"}
                placeholder={"insert recipient..."}
                onChange={handleTextChange}
                value={invoiceData.recipient}
              />
              <Textfield
                label={"Recipient Address"}
                id={"recipient_address"}
                placeholder={"insert address..."}
                onChange={handleTextChange}
                value={invoiceData.recipient_address}
              />
              <Textfield
                label={"Invoice Number"}
                id={"invoice_id"}
                placeholder={"insert invoice number..."}
                onChange={handleTextChange}
                value={invoiceData.invoice_id}
                disabled={true}
              />
              {/* currency dropdown */}
              <div>
                <label
                  for="currency"
                  className="block text-black text-lg font-bold mb-2"
                >
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="drop-shadow-md  focus:border-green-700 focus:border-[3px]  border-[2.5px] border-gray-500 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="usd">USD</option>
                  <option value="idr">IDR</option>
                  <option value="myr">MYR</option>
                  <option value="SGD">SGD</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="my-2">
              <label
                className="block text-black text-xl font-bold mb-2"
                for="desription"
              >
                Description
              </label>

              <div className="grid grid-cols-2 gap-6 mt-5 p-4 border-[3px] border-green-700 rounded-xl">
                <SideTextfield
                  label={"Net Premium :"}
                  id={"net_premium"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={invoiceData.net_premium}
                />
                <SideTextfield
                  label={"Brokerage :"}
                  id={"brokerage"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={invoiceData.brokerage}
                />
                <SideTextfield
                  label={"Discount :"}
                  id={"discount"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={invoiceData.discount}
                />
                <SideTextfield
                  label={"PPH :"}
                  id={"pph"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={invoiceData.pph}
                />
                <SideTextfield
                  label={"Risk Management :"}
                  id={"risk_management"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={invoiceData.risk_management}
                />
                <SideTextfield
                  label={"Admin Cost :"}
                  id={"admin_cost"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={invoiceData.admin_cost}
                />
              </div>
            </div>

            {/* premium due */}
            <div className="w-1/4 my-4">
              <Textfield
                label={"Total Premium Due"}
                id={"total_premium_due"}
                placeholder={"insert amount..."}
                onChange={handleTextChange}
                value={invoiceData.total_premium_due}
              />
            </div>
          </div>

          {/* bottom half */}
          <div>
            {/* policy details */}
            {/* 1st row */}
            <div className="grid grid-cols-2 gap-4 mb-2 mt-4">
              <div className="grid grid-cols-2 gap-4  ">
                <Textfield
                  label={"Policy Number"}
                  id={"policy_number"}
                  placeholder={"insert policy number..."}
                  onChange={handleTextChange}
                  value={invoiceData.policy_number}
                />
                <Textfield
                  label={"Name of Insured"}
                  id={"name_of_insured"}
                  placeholder={"insert name of insured..."}
                  onChange={handleTextChange}
                  value={invoiceData.name_of_insured}
                />
              </div>
              <div className="">
                <Textfield
                  label={"Address of Insured"}
                  id={"address_of_insured"}
                  placeholder={"insert address of insured..."}
                  onChange={handleTextChange}
                  value={invoiceData.address_of_insured}
                />
              </div>
            </div>

            {/* 2nd row */}
            <div className="grid grid-cols-2 gap-4 mb-2 mt-4">
              <div className="">
                <Textfield
                  label={"Type of Insurance"}
                  id={"insurance_type"}
                  placeholder={"insert type of insurance..."}
                  onChange={handleTextChange}
                  value={invoiceData.insurance_type}
                />
              </div>
              <div className="flex justify-between ">
                <DatePickerMUI
                  bigLabel={"Period of Policy"}
                  label={"start date"}
                  onChange={handleStartDate}
                  dateValue={dayjs(invoiceData.start_date)}
                />

                <p className="flex justify-center mt-10 text-black text-lg font-bold w-1/3">
                  to
                </p>
                <DatePickerMUI
                  bigLabel={<p>&nbsp;</p>}
                  label={"end date"}
                  onChange={handleEndDate}
                  dateValue={dayjs(invoiceData.end_date)}
                />
              </div>
            </div>

            {/* Sum Insured */}
            <div className="my-2">
              <label className="block text-black text-xl font-bold mb-2">
                Sum Insured
              </label>

              <div className="border-[3px] border-green-700 rounded-xl mt-5 py-4 pl-5">
                <SumInsuredForm
                  invoiceData={invoiceData.sum_insured_detail}
                />
              </div>
            </div>

            {/* premium due */}
            <div className="w-1/4 my-4">
              <Textfield
                label={"Terms of Payment"}
                id={"terms_of_payment"}
                placeholder={"insert terms of payment..."}
                onChange={handleTextChange}
                value={invoiceData.terms_of_payment}
              />
            </div>

            {/* last row */}
            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="w-full">
                <label className="block text-black text-xl font-bold ">
                  Installments
                </label>

                <div className="border-[3px] border-green-700 rounded-xl mt-2 py-4 pl-5">
                  <InvInstallmentForm
                    invoiceData={invoiceData.instalments_detail}
                  />
                </div>
              </div>
              <div className="w-full">
                <Textfield
                  label={"Remarks"}
                  id={"remarks"}
                  placeholder={"insert remarks..."}
                  onChange={handleTextChange}
                  value={invoiceData.remarks}
                />
              </div>
            </div>

            <div className="flex w-full justify-end mt-5">
              <button className="p-2 border-[3px] drop-shadow-lg font-bold text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
