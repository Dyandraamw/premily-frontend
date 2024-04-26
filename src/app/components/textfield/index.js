import React from 'react'

export default function index({id,placeholder,label}) {
  return (
    <div className="mb-4 w-full">
      <label className="block text-black text-lg font-bold mb-2" for={id}>
        {label}
      </label>
      <input className="drop-shadow-md appearance-none border-[2.5px] border-gray-500 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={id} type="text" placeholder={placeholder}/>
    </div>
  )
}
