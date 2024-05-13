import React from "react";
import TextField from "@mui/material/TextField";
import { FaSearch } from "react-icons/fa";

export default function textfield({
  id,
  placeholder,
  label,
  onChange,
  value,
  icon,
}) {
  return (
    <div className="mb-4 w-full">
      <label className="block text-black text-lg font-bold mb-2" for={id}>
        {label}
      </label>
      <div className="w-full flex justify-end items-center relative">
        <input
          className="drop-shadow-md border-[2.5px] border-gray-500 focus:border-green-700 focus:border-[3px] rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <div className="absolute bg-white mr-1 px-2">{icon}</div>
      </div>
    </div>
  );
}
