"use client";
import React, { useState } from "react";
import Textfield from "../../textfield";

export default function EditSumInsuredForm({ invoiceData, siData, setSiData }) {
  const [initialLoad, setInitialLoad] = useState(false);
  const handleLoad = (e) => {
    if (initialLoad == false) {
      setSiData(invoiceData);
    }
  };

  const handleClick = () => {
    setInitialLoad(true);
    setSiData([
      ...siData,
      {
        Items_Name: "",
        Sum_Insured_Amount: 0,
        Notes: "",
      },
    ]);
  };

  const handleChange = (e, i) => {
    setInitialLoad(true);
    const { id, value } = e.target;
    const changeValue = [...siData];
    changeValue[i][id] = value;
    setSiData(changeValue);
  };

  const handleDeleteRow = (i) => {
    setInitialLoad(true);
    const delRow = [...siData];
    delRow.splice(i, 1);
    setSiData(delRow);
  };
  //console.log(siData)
  return (
    <div onLoad={handleLoad()}>
      {siData.map((val, i) => (
        <div className="flex items-center">
          <div className="grid grid-cols-3 gap-6 w-[90%]">
            <Textfield
              label={i == 0 ? "Item" : ""}
              id={"Items_Name"}
              placeholder={"insert item name..."}
              onChange={(e) => handleChange(e, i)}
              value={val.Items_Name}
            />
            <Textfield
              label={i == 0 ? "Sum Insured" : ""}
              id={"Sum_Insured_Amount"}
              placeholder={"insert amount..."}
              onChange={(e) => handleChange(e, i)}
              value={val.Sum_Insured_Amount}
            />
            <Textfield
              label={i == 0 ? "Notes" : ""}
              id={"Notes"}
              placeholder={"insert notes..."}
              onChange={(e) => handleChange(e, i)}
              value={val.Notes}
            />
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
        + add new item
      </button> */}
    </div>
  );
}
