"use client";
import React, { useState } from "react";
import Textfield from "../../components/textfield";
import SideTextfield from "../../components/sideTextfield";
import DatePickerMUI from "../../components/datePickerMUI";
import SumInsuredForm from "@/app/components/invoiceComponents/sumInsuredForm";
import InvInstallmentForm from "../../components/invoiceComponents/invInstallmentForm";
import ImgDragDrop from "../../components/imgDragDrop";

export default function debitNote() {
  const [debitNote, setDebitNote] = useState({
    company_name: "",
    company_address: "",
    company_number: "",
    recipient: "",
    recipient_address: "",
    invoice_id: "DN-001",
    currency: "",
    net_premium: "",
    brokerage: "",
    discount: "",
    pph: "",
    risk_management: "",
    admin_cost: "",
    total_premium_due: "",
    policy_number: "",
    name_of_insured: "",
    address_of_insured: "",
    insurance_type: "",
    // start_date:"",
    // end_date:"",
    // sum_insured_form:[],
    terms_of_payment: "",
    remarks: "",
  });

  const handleTextChange = (e) => {
    setDebitNote({ ...debitNote, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <div className="mb-2">
        <h1 className="text-4xl text-green-800 font-bold">Debit Note</h1>
        <p className="ml-1 font-medium text-gray-600">
          Create a new Debit Note
        </p>
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-2 h-[1700px]">
        <form
          onSubmit={handleSubmit}
          className="p-5 divide-y divide-black divide-solid"
        >
          {/* top half */}
          <div>
            {/* company details */}
            <div className="flex justify-between">
            <ImgDragDrop className={'w-[250px]  h-[260px]'}/>
              <div className="flex flex-col w-96 mt-5">
                <Textfield
                  label={"Company Name"}
                  id={"company_name"}
                  placeholder={"insert your company name..."}
                  onChange={handleTextChange}
                  value={debitNote.company_name}
                />
                <Textfield
                  label={"Company Address"}
                  id={"company_address"}
                  placeholder={"insert your company address..."}
                  onChange={handleTextChange}
                  value={debitNote.company_address}
                />
                <Textfield
                  label={"Company Number"}
                  id={"company_number"}
                  placeholder={"insert your company number..."}
                  onChange={handleTextChange}
                  value={debitNote.company_number}
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
                value={debitNote.recipient}
              />
              <Textfield
                label={"Recipient Address"}
                id={"recipient_address"}
                placeholder={"insert address..."}
                onChange={handleTextChange}
                value={debitNote.recipient_address}
              />
              <Textfield
                label={"Invoice Number"}
                id={"invoice_id"}
                placeholder={"insert invoice number..."}
                onChange={handleTextChange}
                value={debitNote.invoice_id}
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
                  value={debitNote.net_premium}
                />
                <SideTextfield
                  label={"Brokerage :"}
                  id={"brokerage"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={debitNote.brokerage}
                />
                <SideTextfield
                  label={"Discount :"}
                  id={"discount"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={debitNote.discount}
                />
                <SideTextfield
                  label={"PPH :"}
                  id={"pph"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={debitNote.pph}
                />
                <SideTextfield
                  label={"Risk Management :"}
                  id={"risk_management"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={debitNote.risk_management}
                />
                <SideTextfield
                  label={"Admin Cost :"}
                  id={"admin_cost"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={debitNote.admin_cost}
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
                value={debitNote.total_premium_due}
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
                  value={debitNote.policy_number}
                />
                <Textfield
                  label={"Name of Insured"}
                  id={"name_of_insured"}
                  placeholder={"insert name of insured..."}
                  onChange={handleTextChange}
                  value={debitNote.name_of_insured}
                />
              </div>
              <div className="">
                <Textfield
                  label={"Address of Insured"}
                  id={"address_of_insured"}
                  placeholder={"insert address of insured..."}
                  onChange={handleTextChange}
                  value={debitNote.address_of_insured}
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
                  value={debitNote.insurance_type}
                />
              </div>
              <div className="flex justify-between ">
                <DatePickerMUI
                  bigLabel={"Period of Policy"}
                  label={"start date"}
                />

                <p className="flex justify-center mt-10 text-black text-lg font-bold w-1/3">
                  to
                </p>
                <DatePickerMUI bigLabel={<p>&nbsp;</p>} label={"end date"} />
              </div>
            </div>

            {/* Sum Insured */}
            <div className="my-2">
              <label className="block text-black text-xl font-bold mb-2">
                Sum Insured
              </label>

              <div className="border-[3px] border-green-700 rounded-xl mt-5 py-4 pl-5">
                <SumInsuredForm
                // siData={siData}
                // handleChange={handleSiChange}
                // handleClick={handleAddSiRow}
                // handleDeleteRow={handleDeleteSiRow}
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
                value={debitNote.terms_of_payment}
              />
            </div>

            {/* last row */}
            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="w-full">
                <label className="block text-black text-xl font-bold ">
                  Installments
                </label>

                <div className="border-[3px] border-green-700 rounded-xl mt-2 py-4 pl-5">
                  <InvInstallmentForm />
                </div>
              </div>
              <div className="w-full">
                <Textfield
                  label={"Remarks"}
                  id={"remarks"}
                  placeholder={"insert remarks..."}
                  onChange={handleTextChange}
                  value={debitNote.remarks}
                />
              </div>
            </div>

            <div className="flex w-full justify-end mt-5">
              <button className="p-2 border-[3px] drop-shadow-lg font-semibold text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
