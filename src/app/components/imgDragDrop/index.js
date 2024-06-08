import Image from "next/image";
import React, { useRef, useState } from "react";

export default function imgDragDrop({ className }) {
  const fileRef = useRef(null);
  const [dragState, setDragState] = useState(false);
  const [imgValue, setImgValue] = useState(null);

  const uploadImg = (e, data) => {
    e.preventDefault();
    const file = data;
    const imgUrl = URL.createObjectURL(file);
    document.querySelector("img").src = imgUrl;
    setImgValue(imgUrl);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragState(true);
    } else if (e.type === "dragleave") {
      setDragState(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragState(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadImg(e, e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      uploadImg(e, e.target.files[0]);
    }
  };

  const handleClick = (e) => {
    fileRef.current.click();
  };

  console.log("imgvalue " + imgValue);
  return (
    <div
      className={
        className +
        " mt-[22px] px-5 py-5 rounded-lg outline-dashed outline-[3px]  outline-gray-500 " +
        (dragState ? "bg-gray-100" : "bg-white")
      }
    >
      <div
        className="grid grid-cols-1 justify-items-center"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="w-full h-full"
          id="invoice_logo_upload"
          accepts="image/*"
          multiple={true}
          onChange={handleChange}
          ref={fileRef}
          hidden
        />
        <label htmlFor="invoice_logo_upload">
          <img
            className={
              "w-full h-[100px] outline-0 border-0 border-white" +
              (imgValue == null ? " invisible" : " ")
            }
          />
          <div id="img-area" className="grid grid-cols-1 justify-items-center">
            <p className="text-md font-semibold text-gray-500 mb-5">
              Drag to upload image, or
            </p>
            <button
              onClick={handleClick}
              className="p-2 border-[3px] drop-shadow-lg font-semibold text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700"
            >
              Select Image
            </button>
          </div>
        </label>
      </div>
    </div>
  );
}
