"use client";
import React, { useEffect, useState } from "react";
import Textfield from "../../textfield";
import DatePickerMUI from "../../datePickerMUI";
import dayjs from "dayjs";

export default function editInvInstallmentForm({
  invoiceData,
  insData,
  setInsData,
}) {
  const [initialLoad, setInitialLoad] = useState(false);
  const handleLoad = (e) => {
    if (initialLoad == false) {
      setInsData(invoiceData);
    }
  };

  //console.log(invoiceData)
  const handleClick = () => {
    setInitialLoad(true);
    setInsData([
      ...insData,
      {
        Due_Date: null,
        Ins_Amount: 0,
      },
    ]);
  };

  const handleChange = (e, i) => {
    setInitialLoad(true);
    const { value } = e.target;
    const changeValue = [...insData];
    changeValue[i]["Ins_Amount"] = value;
    setInsData(changeValue);
  };

  const handleDateChange = (e, i) => {
    setInitialLoad(true);
    const dvalue = dayjs(e.$d).format("YYYY-MM-DD");
    // console.log(e)
    const changedValue = [...insData];
    changedValue[i]["Due_Date"] = dvalue;
    // console.log(changedValue)
    setInsData(changedValue);
  };

  const handleDeleteRow = (i) => {
    setInitialLoad(true);
    const delRow = [...insData];
    delRow.splice(i, 1);
    setInsData(delRow);
  };
  //console.log(insData)
  return (
    <div onLoad={handleLoad()}>
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
                label={"Due_Date"}
                id={"Due_Date"}
                onChange={(e) => handleDateChange(e, i)}
                // value={val.due_date}
                dateValue={dayjs(val.Due_Date)}
              />
            </div>

            <div className="col-span-5">
              <Textfield
                label={i == 0 ? "Amount" : ""}
                id={"Ins_Amount"}
                placeholder={"insert amount..."}
                onChange={(e) => handleChange(e, i)}
                value={val.Ins_Amount}
              />
            </div>
          </div>
          {/* {i != 0 ? (
            <button
              type="button"
              onClick={() => handleDeleteRow(i)}
              className="flex text-red-600 hover:text-red-500 ml-2 text-md font-bold "
            >
              Delete
            </button>
          ) : null} */}
        </div>
      ))}
      {/* <button
        type="button"
        onClick={handleClick}
        className="text-black hover:text-green-700 text-md font-bold"
      >
        + add new installment
      </button>  */}
      {/* <p>{JSON.stringify(insData)}</p> */}
    </div>
  );
}
