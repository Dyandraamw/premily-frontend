import React from "react";
import ListMenu from "./listMenu";
import { FaCircleUser } from "react-icons/fa6";

export default function sidebar() {
  return (
    <div className="w-96 drop-shadow-xl ">
      <div className="flex flex-col bg-white h-screen p-5 w-full items-center">
        {/* logo sementara */}
        <h1 className="font-bold text-2xl bg-gray-400 p-3 mb-5 rounded-lg">
          LOGO
        </h1>

        <div className="flex flex-col items-center my-5">
          <FaCircleUser className="size-24" />
          <p className="font-semibold mt-3">Welcome,</p>
          <p>John Williams</p>
        </div>
        <ListMenu />
      </div>
    </div>
  );
}
