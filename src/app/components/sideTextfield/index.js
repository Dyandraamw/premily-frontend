import React from "react";

export default function sideTextfield({
  id,
  placeholder,
  label,
  onChange,
  value,
}) {
  return (
    <div className="flex mb-4 w-full items-center">
      <label className="block text-black text-lg w-2/4 font-bold " htmlFor={id}>
        {label} 
      </label>
      <input
        className="drop-shadow-md appearance-none focus:border-[3px] focus:border-green-700 border-[2.5px] border-gray-500 rounded-lg w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
