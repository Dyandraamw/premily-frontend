"use client";
import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { FaFileInvoiceDollar, FaUserGear, FaCircleUser } from "react-icons/fa6";
import { IoMdListBox } from "react-icons/io";
import { MdFactCheck } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function listMenu() {
  const router = useRouter();
  const handleSignOut = () => {
    Cookies.remove("jwtToken");
    router.push("/SignIn");
  };
  return (
    <div className="h-full w-5/6 flex flex-col justify-between">
      <div className="w-full">
        {/* Dashboard button */}
        <Link href={"/dashboard"}>
          <div className="flex items-center w-full hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg">
            <BiSolidDashboard className="mx-5 text-3xl" />
            Dashboard
          </div>
        </Link>

        {/* Invoice List button */}
        {/* <Link href={"/invoiceList"}> */}
          <button onClick={()=>{router.push('/invoiceList')}} className="flex items-center w-full hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg">
            <FaFileInvoiceDollar className="mx-5 text-3xl" />
            Invoice List
          </button>
        {/* </Link> */}

        {/* Statement of Account button */}
        <Link href={"/soaList"}>
          <div className="flex items-center w-full  hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg">
            <IoMdListBox className="mx-5 text-3xl" />
            Statement of Account
          </div>
        </Link>

        {/* Payment Status button */}
        <Link href={"/paymentStatus"}>
          <div className="flex items-center w-full  hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg">
            <MdFactCheck className="mx-5 text-3xl" />
            Payment Status
          </div>
        </Link>
      </div>

      <div className="w-full">
        {/* Staff Access button */}
        <Link href={"/StaffAccess"}>
          <div className="flex items-center w-full  hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg">
            <FaUserGear className="mx-5 text-3xl" />
            Staff Access
          </div>
        </Link>

        {/* Profile button */}
        <Link href={"/Profile"}>
          <div className="flex items-center w-full  hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg">
            <FaCircleUser className="mx-5 text-3xl" />
            Profile
          </div>
        </Link>

        {/* Sign Out button */}
        <button
          onClick={handleSignOut}
          className="flex items-center w-full  hover:bg-green-700 hover:text-white text-green-800 p-3 mb-5 text-lg font-semibold rounded-lg"
        >
          <IoLogOut className="mx-5 text-3xl" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
