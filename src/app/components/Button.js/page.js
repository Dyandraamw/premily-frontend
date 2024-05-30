import React from "react";

export default function Button(title) {
  return (
    <div className="m-auto">
      <button className="justify-center py-3 border-[3px] drop-shadow-lg font-semibold w-52 text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700 mr-5">
        {title}
      </button>
    </div>
  );
}
