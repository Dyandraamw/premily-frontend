"use client";
import React, { useState } from "react";
import Textfield from "../../textfield";
import DatePickerMUI from "../../datePickerMUI";
import dayjs from "dayjs";

export default function editInvInstallmentForm({ invoiceData }) {
  const [insData, setInsData] = useState(invoiceData);

  const handleClick = () => {
    setInsData([
      ...insData,
      { due_date: null, amount: "" },
    ]);
  };

  const handleChange = (e, i) => {
    const { value } = e.target;
    const changeValue = [...insData];
    changeValue[i]["amount"] = value;
    setInsData(changeValue);
  };

  const handleDateChange = (e, i) => {
    const dvalue =dayjs(e.$d).format('YYYY-MM-DD')
    // console.log(e)
    const changedValue = [...insData];
    changedValue[i]["due_date"] = dvalue;
    // console.log(changedValue)
    setInsData(changedValue);
  };

  const handleDeleteRow = (i) => {
    const delRow = [...insData];
    delRow.splice(i, 1);
    setInsData(delRow);
  };
  console.log(insData)
  return (
    <div>
      {insData.map((val, i) => (
        <div className="flex items-center">
          <div className="grid grid-cols-11 gap-2 w-[85%]">
            <div>
              {i == 0 ? (
                <label className="block text-black text-lg font-bold mb-2 mr-2">
                  No.
                </label>
              ) : null}
              <p className="text-md mt-5 font-bold">{i + 1}</p>
            </div>

            <div className="col-span-5">
              <DatePickerMUI
                bigLabel={i == 0 ? "Due Date" : ""}
                label={"due date"}
                id={"due_date"}
                onChange={(e) => handleDateChange(e, i)}
                // value={val.due_date}
                dateValue={dayjs(val.due_date)}
              />
            </div>

            <div className="col-span-5">
              <Textfield
                label={i == 0 ? "Amount" : ""}
                id={"amount"}
                placeholder={"insert amount..."}
                onChange={(e) => handleChange(e, i)}
                value={val.amount}
              />
            </div>
          </div>
          {i != 0 ? (
            <button
              onClick={() => handleDeleteRow(i)}
              className="flex text-red-600 hover:text-red-500 ml-2 text-md font-bold "
            >
              Delete
            </button>
          ) : null}
        </div>
      ))}
      <button
        onClick={handleClick}
        className="text-black hover:text-green-700 text-md font-bold"
      >
        + add new installment
      </button>
      {/* <p>{JSON.stringify(insData)}</p> */}
    </div>
  );
}
