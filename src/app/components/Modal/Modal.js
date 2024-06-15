import React, { useState } from "react";
import Button from "../Button.js/page";
import SelectFields from "../SelectedFields";

const Modal = ({ isVisible, onClose }) => {
  const [modal, setModal] = useState();

  const handleChange = (e) => {
    setModal(e.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Role submitted:", modal);
    onClose();
  };

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-1/3 bg-white rounded-md p-8">
        <button
          className="flex justify-end w-full mb-2 hover:text-red-700 text-black text-xl"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className=" flex flex-col w-full mb-3 items-center justify-center">
          <h1 className="text-2xl p-2 rounded font-semibold">Change Role</h1>
          <p>Change your role to control your access</p>
        </div>
        {/* <p className="font-semibold mt-5 mb-3 text-xl">Change Role</p> */}
        <SelectFields
          value={modal}
          label="Change Role"
          onChange={handleChange}
        ></SelectFields>
        <div className="">
          <button
            className="w-full my-5 mb-5 p-2 px-4 border-[3px] drop-shadow-lg font-medium text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
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
