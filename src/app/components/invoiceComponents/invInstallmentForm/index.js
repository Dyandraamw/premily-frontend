"use client";
import React, { useState } from "react";
import Textfield from "../../textfield";
import DatePickerMUI from "../../datePickerMUI";
import dayjs from "dayjs";

export default function invInstallmentForm({
  insData,
  setInsData,
  setInsDueDate,
  insDueDate,
  setInsAmount,
  insAmount,
}) {
  // const [insData, setInsData] = useState([{ due_date: null, amount: "" }]);

  const handleClick = () => {
    setInsData([...insData, { due_date: null, amount: "" }]);
  };

  const handleInsDueDate = (data) => {
    setInsDueDate(dueDateArr);
  };

  const handleInsArr = (data) => {
    let amountArr = data.map((a) => a.amount);
    setInsAmount(amountArr);
  };

  const handleChange = (e, i) => {
    e.preventDefault();
    const { value } = e.target;
    const changeValue = [...insData];
    changeValue[i]["amount"] = value;
    setInsData(changeValue);

    const changedValue2 = [...insAmount];
    changedValue2[i] = value;
    setInsAmount(changedValue2);
  };

  const handleDateChange = (e, i) => {
    const dvalue = dayjs(e.$d).format("YYYY-MM-DD");
    // console.log(e)
    const changedValue = [...insData];
    changedValue[i]["due_date"] = dvalue;
    // console.log(changedValue)
    setInsData(changedValue);
    const changedValue2 = [...insDueDate];
    changedValue2[i] = dvalue;
    setInsDueDate(changedValue2);
  };

  const handleDeleteRow = (i) => {
    const delRow = [...insData];
    delRow.splice(i, 1);
    setInsData(delRow);
  };
  //console.log(insData)
  return (
    <div>
      {insData.map((val, i) => (
        <div className="flex items-center" key={i}>
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
                // dateValue={dayjs(val.due_date)}
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
              type="button"
              onClick={() => handleDeleteRow(i)}
              className="flex text-red-600 hover:text-red-500 ml-2 text-md font-bold "
            >
              Delete
            </button>
          ) : null}
        </div>
      ))}
      <button
        type="button"
        onClick={handleClick}
        className="text-black hover:text-green-700 text-md font-bold"
      >
        + add new installment
      </button>
      {/* <p>{JSON.stringify(insData)}</p> */}
    </div>
  );
}
