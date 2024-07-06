"use client";
import React, { useState } from "react";
import Textfield from "../../components/textfield";
import SideTextfield from "../../components/sideTextfield";
import DatePickerMUI from "../../components/datePickerMUI";
import SumInsuredForm from "@/app/components/invoiceComponents/sumInsuredForm";
import InvInstallmentForm from "../../components/invoiceComponents/invInstallmentForm";
import ImgDragDrop from "../../components/imgDragDrop";
import axios from "axios";
import dayjs from "dayjs";
import { createInvoiceApi } from "@/app/utils/api/invApi";

export default function debitNote() {
  const [imgValue, setImgValue] = useState(null);
  const [siData, setSiData] = useState([
    { item: "", sum_insured: "", notes: "" },
  ]);
  const [insData, setInsData] = useState([{ due_date: null, amount: "" }]);
  const [debitNote, setDebitNote] = useState({
    typeInvoice: "debit",
    recipient: "",
    recipient_address: "",
    net_premium: "",
    discount: "",
    admin_cost: "",
    risk_management: "",
    brokerage: "",
    pph: "",
    total_premium_due: "",
    policy_number: "",
    name_of_insured: "",
    address_of_insured: "",
    insurance_type: "",
    //////
    company_pict: "",
    company_name: "",
    company_number: "",
    company_address: "",
    company_contact: "",
    currency: "IDR",
    terms_of_period: "",
    remarks: "",
    end_date: null,
    start_date: null,
  });

  ///////////////////////////////////////////////////

  const [insDueDate, setInsDueDate] = useState([]);
  const [insAmount, setInsAmount] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let invForm = new FormData();
    invForm.append("typeInvoice", "debit");
    invForm.append("recipient", debitNote.recipient);
    invForm.append("address", debitNote.recipient_address);
    invForm.append("desc_premium", debitNote.net_premium);
    invForm.append("desc_discount", debitNote.discount);
    invForm.append("desc_admin_cost", debitNote.admin_cost);
    invForm.append("desc_risk_management", debitNote.risk_management);
    invForm.append("desc_brokage", debitNote.brokerage);
    invForm.append("desc_pph", debitNote.pph);
    invForm.append("total_premium_due", debitNote.total_premium_due);
    invForm.append("policy_number", debitNote.policy_number);
    invForm.append("name_of_insured", debitNote.name_of_insured);
    invForm.append("address_of_insured", debitNote.address_of_insured);
    invForm.append("type_of_insurance", debitNote.insurance_type);
    invForm.append("periode_start", debitNote.start_date);
    invForm.append("periode_end", debitNote.end_date);
    invForm.append("terms_of_period", debitNote.terms_of_period);
    invForm.append("remarks", "1st Instalment has to be paid before Inception");
    insData.map((data) => {
      invForm.append("due_date", data.due_date);
      invForm.append("ins_amount", data.amount);
    });

    invForm.append("company_pict", imgValue);
    invForm.append("comp_name", debitNote.company_name);
    invForm.append("comp_address", debitNote.company_address);
    invForm.append("comp_contact", debitNote.company_number);

    siData.map((data) => {
      invForm.append("items_name", data.item);
      invForm.append("sum_ins_amount", data.sum_insured);
      invForm.append("notes", data.notes);
    });

    await createInvoiceApi(invForm);
  };
  ///////////////////////////////////////////////////

  const handleTextChange = (e) => {
    setDebitNote({ ...debitNote, [e.target.id]: e.target.value });
  };

  const handleStartDate = (e) => {
    const dateformat = dayjs(e.$d).format("YYYY-MM-DD");
    setDebitNote({ ...debitNote, start_date: dateformat });
  };

  const handleEndDate = (e) => {
    const dateformat = dayjs(e.$d).format("YYYY-MM-DD");
    setDebitNote({ ...debitNote, end_date: dateformat });
    // console.log(dateformat)
  };

  console.log(debitNote);
  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <div className="mb-2">
        <h1 className="text-4xl text-green-700 font-bold">Debit Note</h1>
        <p className="ml-1 font-medium text-gray-600">
          Create a new Debit Note
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
              <div>
                <ImgDragDrop
                  className={"w-[250px]  h-[260px]"}
                  imgValue={imgValue}
                  setImgValue={setImgValue}
                />
              </div>
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
            <div className="grid grid-cols-3 gap-6 mt-5">
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
              {/* <div>
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
              </div> */}
            </div>

            {/* Description */}
            <div className="my-2">
              <label
                className="block text-black text-xl font-bold mb-2"
                htmlFor="desription"
              >
                Description
              </label>

              <div className="grid grid-cols-2 gap-6 mt-5 p-4 border-[3px] border-green-700 rounded-xl">
                <SideTextfield
                  label={`Premium (${debitNote.currency}) :`}
                  id={"net_premium"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={debitNote.net_premium}
                />
                <SideTextfield
                  label={`Brokerage (${debitNote.currency}) :`}
                  id={"brokerage"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={debitNote.brokerage}
                />
                <SideTextfield
                  label={`Discount (${debitNote.currency}) :`}
                  id={"discount"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={debitNote.discount}
                />
                <SideTextfield
                  label={`PPH (${debitNote.currency}) :`}
                  id={"pph"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={debitNote.pph}
                />
                <SideTextfield
                  label={`Risk Management (${debitNote.currency}) :`}
                  id={"risk_management"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={debitNote.risk_management}
                />
                <SideTextfield
                  label={`Admin Cost (${debitNote.currency}) :`}
                  id={"admin_cost"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={debitNote.admin_cost}
                />
              </div>
            </div>

            {/* premium due */}
            <div className="w-[30%] my-4">
              <Textfield
                label={`Total Premium Due (${debitNote.currency}) :`}
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
                  onChange={handleStartDate}
                />

                <p className="flex justify-center mt-10 text-black text-lg font-bold w-1/3">
                  to
                </p>
                <DatePickerMUI
                  bigLabel={<p>&nbsp;</p>}
                  label={"end date"}
                  onChange={handleEndDate}
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
                  siData={siData}
                  setSiData={setSiData}
                  // handleChange={handleSiChange}
                  // handleClick={handleAddSiRow}
                  // handleDeleteRow={handleDeleteSiRow}
                />
              </div>
            </div>

            {/* premium due */}
            <div className="w-[30%] my-4">
              <Textfield
                label={"Terms of Payment"}
                id={"terms_of_period"}
                placeholder={"insert terms of payment..."}
                onChange={handleTextChange}
                value={debitNote.terms_of_period}
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
                    insAmount={insAmount}
                    setInsAmount={setInsAmount}
                    setInsDueDate={setInsDueDate}
                    insDueDate={insDueDate}
                    insData={insData}
                    setInsData={setInsData}
                  />
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
              <button
                type="submit"
                className="p-2 border-[3px] drop-shadow-lg font-bold text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
