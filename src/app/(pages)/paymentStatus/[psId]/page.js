"use client";
import React, { useEffect, useState } from "react";

import TableMUI from "../../../components/paymentStatusComponents/paymentStatusDetailTable";
import dayjs from "dayjs";
import AddPaymentModal from "../../../components/paymentStatusComponents/addPaymentModal";
import AddAdjustmentModal from "../../../components/paymentStatusComponents/addAdjustmentModal";
import EditPaymentModal from "../../../components/paymentStatusComponents/editPaymentModal";
import EditAdjustmentModal from "../../../components/paymentStatusComponents/editAdjustmentModal";
import { fetchPaymentStatusDetail } from "@/app/utils/api/psApi";
import Cookies from "js-cookie";
import useMounted from "@/app/utils/hooks/useMounted";

const userRole = Cookies.get("userRole");

export default function paymentStatusDetail({ params }) {
  const mounted = useMounted();
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [adjustmentData, setAdjustmentData] = useState([]);
  const [invoiceDet, setInvoiceDet] = useState([]);
  const [payments, setPayments] = useState([]);
  const [instalments, setInstalments] = useState([]);
  useEffect(() => {
    const fetchList = async () => {
      const ps = await fetchPaymentStatusDetail(params.psId);
      setPaymentStatus(ps);
      // setAdjustmentData(ps.adjustment_detail)
      setInvoiceDet(ps.invoice);
      setPayments(ps.payment_details);
      setInstalments(ps.installments);

      const adj = ps.adjustment_detail;
      const insLen = ps.installments.length;
      const loopLen = ps.adjustment_detail.length / insLen;
      let adjArr = [];
      for (let i = 0, ctr = 0; i < loopLen; i++) {
        let adjItr = i + 1;
        let adjTitle;
        let adjID = [];
        let adjAmount = [];
        for (let x = 0; x < insLen; x++) {
          adjTitle = adj[ctr].adjustment_title;
          adjID.push(adj[ctr].adjustment_id);
          adjAmount.push(adj[ctr].adjustment_amount);
          ctr++;
        }
        adjArr.push({
          adjustment_itr: adjItr,
          adjustment_title: adjTitle,
          adjustment_id: adjID,
          adjustment_amount: adjAmount,
        });
      }
      //console.log(adjArr)
      setAdjustmentData(adjArr);
    };
    fetchList();
  }, []);

  const [paymentModalState, setPaymentModalState] = useState(false);
  const handleOpenPaymentModal = () => setPaymentModalState(true);
  const handleClosePaymentModal = () => setPaymentModalState(false);

  const [editPaymentModal, setEditPaymentModal] = useState(false);
  const [editPayment, setEditPayment] = useState({
    payment_id: "",
    instalment_id: "",
    payment_date: null,
    payment_amount: "",
  });

  const handleOpenEditPaymentModal = (data) => {
    setEditPaymentModal(true);
    // console.log(data)
    setEditPayment({
      ...editPayment,
      payment_id: data[0],
      instalment_id: data[1],
      payment_date: data[2],
      payment_amount: data[3],
    });
  };
  const handleCloseEditPaymentModal = () => setEditPaymentModal(false);

  const [adjustmentModalState, setAdjustmentModalState] = useState(false);
  const handleOpenAdjustmentModal = () => setAdjustmentModalState(true);
  const handleCloseAdjustmentModal = () => setAdjustmentModalState(false);

  const [editAdjustmentModal, setEditAdjustmentModal] = useState(false);
  const [editAdjustment, setEditAdjustment] = useState({
    adjustment_itr: 0,
    adjustment_id: new Array(instalments.length).fill(""),
    adjustment_title: "",
    adjustment_amount: new Array(instalments.length).fill(0),
  });

  const handleOpenEditAdjustmentModal = (data) => {
    setEditAdjustmentModal(true);
    console.log(data);
    setEditAdjustment({
      ...editAdjustment,
      adjustment_itr: data[0],
      adjustment_id: data[1],
      adjustment_title: data[2],
      adjustment_amount: data[3],
    });
  };
  const handleCloseEditAdjustmentModal = () => setEditAdjustmentModal(false);
  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <AddPaymentModal
        psId={params.psId}
        modalState={paymentModalState}
        handleCloseModal={handleClosePaymentModal}
        instalment_data={instalments}
      />
      <EditPaymentModal
        psId={params.psId}
        modalState={editPaymentModal}
        handleCloseModal={handleCloseEditPaymentModal}
        instalment_data={instalments}
        editPayment={editPayment}
        setEditPayment={setEditPayment}
      />
      <AddAdjustmentModal
        psId={params.psId}
        modalState={adjustmentModalState}
        handleCloseModal={handleCloseAdjustmentModal}
        instalment_data={instalments}
      />
      <EditAdjustmentModal
        psId={params.psId}
        modalState={editAdjustmentModal}
        handleCloseModal={handleCloseEditAdjustmentModal}
        instalment_data={instalments}
        editAdjustment={editAdjustment}
        setEditAdjustment={setEditAdjustment}
      />
      <div className="flex justify-between mb-2">
        <div className="">
          <h1 className="text-4xl text-green-700 font-bold">Payment Status</h1>
          <p className="ml-1 font-medium text-gray-600">
            View payment status of payment number {params.psId} details
          </p>
        </div>
        <div>
          {mounted && userRole == "staff" ? null : (
            <div>
              <button
                onClick={handleOpenPaymentModal}
                className="p-2 px-4 border-[3px] mt-2 mr-5 drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
              >
                Add Payment
              </button>
              <button
                onClick={handleOpenAdjustmentModal}
                className="p-2 px-4 border-[3px] mt-2 drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
              >
                Add Adjustment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* table */}
      <div className="bg-white rounded-lg w-full mt-5 p-5 drop-shadow-xl">
        <div className="ml-3 my-5">
          <div className="flex">
            <p className="font-semibold">Name of Insured&nbsp;</p>
            <p>:&emsp;{invoiceDet.name_of_insured}</p>
          </div>
          <div className="flex">
            <p className="font-semibold">Policy Period&nbsp;</p>
            <p>
              :&emsp;
              {dayjs(invoiceDet.period_start).format("DD MMM YYYY")} -{" "}
              {dayjs(invoiceDet.period_end).format("DD MMM YYYY")}
            </p>
          </div>
          <div className="flex">
            <p className="font-semibold">Current Date&nbsp;</p>
            <p>:&emsp;{dayjs().format("DD MMM YYYY")}</p>
          </div>
        </div>
        <p className="text-xl font-semibold mb-5">Billed Payment Terms</p>
        <TableMUI
          paymentStatus={paymentStatus}
          instalment_data={instalments}
          payment_data={payments}
          adjustment_data={adjustmentData}
          handleOpenEditPaymentModal={handleOpenEditPaymentModal}
          handleOpenEditAdjustmentModal={handleOpenEditAdjustmentModal}
        />
      </div>

      {/* summary */}
      <div className="bg-white rounded-lg w-full mt-5  px-5 drop-shadow-xl ">
        <div className="grid grid-cols-4 gap-2 pb-5 mt-5 pt-5 h-[60%]">
          <div className="drop-shadow-xl border-2 border-gray-500 border-b-[6px] bg-white  border-b-blue-600 border-opacity-60 rounded-2xl h-full p-2 mr-4">
            <h3 className="flex justify-center text-center text-lg font-bold mt-3  ">
              Premium Inception Sum (IDR)
            </h3>
            <p className="flex justify-center text-center text-gray-500 mt-1 ">
              Sum of the premium at inception
            </p>
            <p className="flex justify-center mb-2 text-3xl font-semibold mt-5">
              {parseInt(paymentStatus.inception_sum).toLocaleString()}
            </p>
          </div>

          <div className="drop-shadow-xl border-2 border-gray-500 border-b-[6px] bg-white  border-b-pink-600 border-opacity-60 rounded-2xl h-full p-2 mr-4">
            <h3 className="flex justify-center text-center text-lg font-bold mt-3  ">
              Total Sum (IDR)
            </h3>
            <p className="flex justify-center text-center text-gray-500 mt-1 ">
              Sum of total after adjustments
            </p>
            <p className="flex justify-center mb-2 text-3xl font-semibold mt-5">
              {parseInt(paymentStatus.total_sum).toLocaleString()}
            </p>
          </div>
          <div className="drop-shadow-xl border-2 border-gray-500 border-b-[6px] bg-white  border-b-green-600 border-opacity-60 rounded-2xl h-full p-2 mr-4">
            <h3 className="flex justify-center text-center text-lg font-bold mt-3  ">
              Payment Amount Sum (IDR)
            </h3>
            <p className="flex justify-center text-center text-gray-500 mt-1 ">
              Sum of all payments
            </p>
            <p className="flex justify-center mb-2 text-3xl font-semibold mt-5">
              {parseInt(paymentStatus.payment_sum).toLocaleString()}
            </p>
          </div>
          <div className="drop-shadow-xl border-2 border-gray-500 border-b-[6px] bg-white  border-b-yellow-600 border-opacity-60 rounded-2xl h-full p-2 mr-4">
            <h3 className="flex justify-center text-center text-lg font-bold mt-3  ">
              Outstanding Premium Sum (IDR)
            </h3>
            <p className="flex justify-center text-center text-gray-500 mt-1 ">
              Sum unpaid balance
            </p>
            <p className="flex justify-center mb-2 text-3xl font-semibold mt-5">
              {parseInt(paymentStatus.outstanding_sum).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
