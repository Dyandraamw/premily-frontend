"use client";
import React, { useEffect, useState } from "react";
import Textfield from "../../../../components/textfield";
import SideTextfield from "../../../../components/sideTextfield";
import DatePickerMUI from "../../../../components/datePickerMUI";
import SumInsuredForm from "../../../../components/invoiceComponents/editSumInsuredForm";
import InvInstallmentForm from "../../../../components/invoiceComponents/editInvInstallmentForm";
import dayjs from "dayjs";
import { fetchInvoiceDetail, updateInvoiceApi } from "@/app/utils/api/invApi";
import LoadingModal from "@/app/components/loadingModal";

export default function editInvoice({ params }) {
  const [spinner,setSpinner] = useState(true)
  const [invoiceData, setinvoiceData] = useState({
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

  useEffect(() => {
    const fetchinv = async () => {
      const invList = await fetchInvoiceDetail(params.invoiceId);
      setSpinner(false)

      setinvoiceData({
        ...invoiceData,
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
      console.log(invList);
    };
    fetchinv();
  }, []);

  const [insData, setInsData] = useState(invoiceData.instalments_detail);
  const [siData, setSiData] = useState(invoiceData.sum_insured_detail);

  const handleTextChange = (e) => {
    setinvoiceData({ ...invoiceData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
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

    invForm.append(
      "periode_start",
      dayjs(invoiceData.start_date).format("YYYY-MM-DD")
    );
    invForm.append(
      "periode_end",
      dayjs(invoiceData.end_date).format("YYYY-MM-DD")
    );

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

    setSpinner(true)
    await updateInvoiceApi(invForm, params.invoiceId,setSpinner);
  };

  const handleStartDate = (e) => {
    const dateformat = dayjs(e.$d).format("YYYY-MM-DD");
    setinvoiceData({ ...invoiceData, start_date: dateformat });
  };

  const handleEndDate = (e) => {
    const dateformat = dayjs(e.$d).format("YYYY-MM-DD");
    setinvoiceData({ ...invoiceData, end_date: dateformat });
  };

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <LoadingModal modalState={spinner} />
      <div className="mb-2">
        <h1 className="text-4xl text-green-700 font-bold">
          {params.invoiceId.startsWith("CN") ? "Credit" : "Debit"} Note
        </h1>
        <p className="ml-1 font-medium text-gray-600">
          Edit a {params.invoiceId.startsWith("CN") ? "Credit" : "Debit"} Note
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
              <div className="w-[200px] mt-10 ml-5 h-[200px]">
                <img
                  className="w-[200px] h-[200px]"
                  src={invoiceData.company_pict}
                  alt="company logo"
                />
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
            <div className="grid grid-cols-3 gap-6 mt-5">
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
                  siData={siData}
                  setSiData={setSiData}
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
                  value={invoiceData.remarks}
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
