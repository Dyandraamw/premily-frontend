
import React, { useState } from "react";
import Textfield from "../../textfield";

export default function EditSumInsuredForm({ invoiceData  }) {
    const [siData, setSiData] = useState(invoiceData);
    
      const handleClick = () => {
        setSiData([...siData,{item: "", sum_insured: "", notes: ""}])
      };
    
      const handleChange = (e,i) => {
        const {id,value} = e.target
        const changeValue = [...siData]
        changeValue[i][id] = value
        setSiData(changeValue)
      };
    
      const handleDeleteRow = (i) => {
        const delRow = [...siData]
        delRow.splice(i,1)
        setSiData(delRow)
      };
  return (
    <div>
      {siData.map((val, i) => (
        <div className="flex items-center">
          <div className="grid grid-cols-3 gap-6 w-[90%]">
            <Textfield
              label={i==0?"Item":""}
              id={"item"}
              placeholder={"insert item name..."}
              onChange={(e) => handleChange(e, i)}
              value={val.item}
            />
            <Textfield
              label={i==0?"Sum Insured":""}
              id={"sum_insured"}
              placeholder={"insert amount..."}
              onChange={(e) => handleChange(e, i)}
              value={val.sum_insured}
            />
            <Textfield
              label={i==0?"Notes":""}
              id={"notes"}
              placeholder={"insert notes..."}
              onChange={(e) => handleChange(e, i)}
              value={val.note}
            />
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
        + add new item
      </button>
    </div>
  );
}
