import React, { useState } from "react";
import SelectFields from "../SelectedFields";
import Button from "../Button.js/page";

const Modal = ({ isVisible, onClose }) => {
  const [Role, setRole] = useState();

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Role submitted:", Role);
    onClose();
  };

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-1/3 h-1/2 bg-white rounded-md p-8">
        <button
          className="flex justify-end mb-3 text-black text-xl place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className=" flex mb-3 text-2xl p-2 rounded font-semibold items-center justify-center">
          Change Role
        </div>
        <SelectFields
          value={Role}
          label="Change Role"
          onChange={handleChange}
          className="mb-3"
        ></SelectFields>
        <div className="m-auto">
          <button
            className="justify-center text-lg py-3 border-[3px] drop-shadow-lg font-semibold w-full text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700 mr-5"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
