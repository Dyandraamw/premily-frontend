import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { FaFileInvoiceDollar, FaUserGear, FaCircleUser } from "react-icons/fa6";
import { IoMdListBox } from "react-icons/io";
import { MdFactCheck } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import Link from "next/link";

export default function listMenu() {
  return (
    <div className="h-full w-5/6 flex flex-col justify-between">
      <div className="w-full">
        {/* Dashboard button */}
        <div className="flex items-center w-full hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg">
          <BiSolidDashboard className="mx-5 text-2xl" />
          <Link href={"/"}>Dashboard</Link>
        </div>

        {/* Invoice List button */}
        <div className="flex items-center w-full hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg">
          <FaFileInvoiceDollar className="mx-5 text-2xl" />
          <Link href={"/invoiceList"}>Invoice List</Link>
        </div>

        {/* Statement of Account button */}
        <div className="flex items-center w-full  hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg">
          <IoMdListBox className="mx-5 text-3xl" />
          <Link href={"/soaList"}>Statement of Account</Link>
        </div>

        {/* Payment Status button */}
        <div className="flex items-center w-full  hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg">
          <MdFactCheck className="mx-5 text-2xl" />
          <Link href={"/paymentStatus"}>Payment Status</Link>
        </div>
      </div>

      <div className="w-full">
        {/* Staff Access button */}
        <div className="flex items-center w-full  hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg">
          <FaUserGear className="mx-5 text-2xl" />
          <Link href={"/StaffAccess"}>Staff Access</Link>
        </div>

        {/* Profile button */}
        <div className="flex items-center w-full  hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg">
          <FaCircleUser className="mx-5 text-2xl" />
          <Link href={"/Profile"}>Profile</Link>
        </div>

        {/* Sign Out button */}
        <div className="flex items-center w-full  hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg">
          <IoLogOut className="mx-5 text-3xl" />
          Sign Out
        </div>
      </div>
    </div>
  );
}
