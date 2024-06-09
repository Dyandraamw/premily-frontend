import React, { useState } from "react";

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
    console.log("Rejected", modal);
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
          <h1 className="text-2xl p-2 rounded font-semibold">
            Reject Access Request
          </h1>
          <p>Are you sure want to reject the access request?</p>
        </div>
        <div className="flex justify-around w-full m-auto">
          <button
            onClick={handleSubmit}
            className="p-2 px-4 border-[3px] mr-3 drop-shadow-lg font-semibold text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
          >
            Accept
          </button>
          <button
            onClick={() => onClose()}
            className="p-2 px-4 border-[3px] drop-shadow-lg font-semibold text-white hover:bg-white hover:text-black rounded-lg bg-red-600 border-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
