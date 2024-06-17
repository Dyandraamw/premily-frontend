"use client";
import React, { useState } from "react";
import Textfield from "../../components/textfield";
import SideTextfield from "../../components/sideTextfield";
import DatePickerMUI from "../../components/datePickerMUI";
import SumInsuredForm from "@/app/components/invoiceComponents/sumInsuredForm";
import InvInstallmentForm from "../../components/invoiceComponents/invInstallmentForm";
import ImgDragDrop from "../../components/imgDragDrop";
import axios from "axios";

export default function creditNote() {
  const [imgValue, setImgValue] = useState(null);
  const [siData, setSiData] = useState([
    { item: "", sum_insured: "", notes: "" },
  ]);
  const [insData, setInsData] = useState([{ due_date: null, amount: "" }]);
  const [creditNote, setCreditNote] = useState({
    typeInvoice: "credit",
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
    currency: "USD",
    terms_of_period: "",
    remarks: "",
  });

  ///////////////////////////////////////////////////
  const url = "/api/create-invoices";
  const authToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzI0ZTdiODEtMzQ0MS00MGI2LThiZjgtZTU0NDFlMjNlZTVlIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzE4NjM3MjI2fQ.-Bq4dPdBWjUa9cB-2IlF8W6oKieB0SCC_PXx0IcRh-Y";

  const FormData = require("form-data");
  const [insDueDate,setInsDueDate] = useState([])
  const [insAmount,setInsAmount] = useState([])

  // const handleInsDueDate = (data) => {
  //   let dueDateArr = data.map(a=>a.due_date)
  //   return(dueDateArr)
  //   //setInsDueDate(dueDateArr)
  // };

  // const handleInsAmount = (data) => {
  //   let amountArr = data.map(a=>a.amount)
  //   return(amountArr)
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    let invForm = new FormData();
    invForm.append("typeInvoice", "debit");
    invForm.append("recipient", "PT. Malaysia Air");
    invForm.append("address", "Jakarta barat");
    invForm.append("desc_premium", "4000");
    invForm.append("desc_discount", "1234");
    invForm.append("desc_admin_cost", "45678");
    invForm.append("desc_risk_management", "43567");
    invForm.append("desc_brokage", "5678");
    invForm.append("desc_pph", "0");
    invForm.append("total_premium_due", "12000");
    invForm.append("policy_number", "01.401.50.2023.0015-0");
    invForm.append("name_of_insured", "PT. Gunung Selatan");
    invForm.append("address_of_insured", "Jakarta, DKI Jakarta");
    invForm.append(
      "type_of_insurance",
      "AVIATION HULL & SPARES ALL RISKS, THIRD PARTY AND PASSENGER LIABILITY, HULL WAR, PERSONAL ACCIDENT"
    );
    invForm.append("periode_start", "2022-09-08");
    invForm.append("periode_end", "2025-09-08");
    invForm.append(
      "terms_of_period",
      "Based on AVN 6A- the premium shall be paid in the following instalments :"
    );
    invForm.append(
      "remarks",
      "1st Instalment has to be paid before Inception"
    );
    invForm.append("due_date", insDueDate);
    invForm.append("ins_amount", insAmount);
    invForm.append("items_name", "Aircrafts");
    invForm.append("sum_ins_amount", "1500000");
    invForm.append("notes", "There's was insurance of .....");
    invForm.append("company_pict", imgValue);
    invForm.append("comp_name", "PT Insurance");
    invForm.append("comp_address", "create address");
    invForm.append("comp_contact", "72417207420");

    axios
      .post(url, invForm, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data
        // handleCloseModal();
        // alert("Statement of Account Sucessfully Created!");
        // location.reload("/soaList");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ///////////////////////////////////////////////////

  const handleTextChange = (e) => {
    setCreditNote({ ...creditNote, [e.target.id]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <div className="mb-2">
        <h1 className="text-4xl text-green-700 font-bold">Credit Note</h1>
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
              <div>
                <ImgDragDrop className={"w-[250px]  h-[260px]"} imgValue={imgValue} setImgValue={setImgValue} />
              </div>
              <div className="flex flex-col w-96 mt-5">
                <Textfield
                  label={"Company Name"}
                  id={"company_name"}
                  placeholder={"insert your company name..."}
                  onChange={handleTextChange}
                  value={creditNote.company_name}
                />
                <Textfield
                  label={"Company Address"}
                  id={"company_address"}
                  placeholder={"insert your company address..."}
                  onChange={handleTextChange}
                  value={creditNote.company_address}
                />
                <Textfield
                  label={"Company Number"}
                  id={"company_number"}
                  placeholder={"insert your company number..."}
                  onChange={handleTextChange}
                  value={creditNote.company_number}
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
                value={creditNote.recipient}
              />
              <Textfield
                label={"Recipient Address"}
                id={"recipient_address"}
                placeholder={"insert address..."}
                onChange={handleTextChange}
                value={creditNote.recipient_address}
              />
              <Textfield
                label={"Invoice Number"}
                id={"invoice_id"}
                placeholder={"insert invoice number..."}
                onChange={handleTextChange}
                value={creditNote.invoice_id}
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
                  value={creditNote.net_premium}
                />
                <SideTextfield
                  label={"Brokerage :"}
                  id={"brokerage"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={creditNote.brokerage}
                />
                <SideTextfield
                  label={"Discount :"}
                  id={"discount"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={creditNote.discount}
                />
                <SideTextfield
                  label={"PPH :"}
                  id={"pph"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={creditNote.pph}
                />
                <SideTextfield
                  label={"Risk Management :"}
                  id={"risk_management"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={creditNote.risk_management}
                />
                <SideTextfield
                  label={"Admin Cost :"}
                  id={"admin_cost"}
                  placeholder={"insert amount..."}
                  onChange={handleTextChange}
                  value={creditNote.admin_cost}
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
                value={creditNote.total_premium_due}
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
                  value={creditNote.policy_number}
                />
                <Textfield
                  label={"Name of Insured"}
                  id={"name_of_insured"}
                  placeholder={"insert name of insured..."}
                  onChange={handleTextChange}
                  value={creditNote.name_of_insured}
                />
              </div>
              <div className="">
                <Textfield
                  label={"Address of Insured"}
                  id={"address_of_insured"}
                  placeholder={"insert address of insured..."}
                  onChange={handleTextChange}
                  value={creditNote.address_of_insured}
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
                  value={creditNote.insurance_type}
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
                value={creditNote.terms_of_payment}
              />
            </div>

            {/* last row */}
            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="w-full">
                <label className="block text-black text-xl font-bold ">
                  Installments
                </label>

                <div className="border-[3px] border-green-700 rounded-xl mt-2 py-4 pl-5">
                  <InvInstallmentForm insAmount={insAmount} setInsAmount={setInsAmount} setInsDueDate={setInsDueDate} insDueDate={insDueDate} insData={insData} setInsData={setInsData} />
                </div>
              </div>
              <div className="w-full">
                <Textfield
                  label={"Remarks"}
                  id={"remarks"}
                  placeholder={"insert remarks..."}
                  onChange={handleTextChange}
                  value={creditNote.remarks}
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
