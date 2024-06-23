"use client";
import React, { useEffect, useState } from "react";
import ListMenu from "./listMenu";
import { FaCircleUser } from "react-icons/fa6";
import Image from "next/image";
import Cookies from "js-cookie";
import { fetchUserApi } from "@/app/utils/api/AuthToken/refreshToken";
import useMounted from "@/app/utils/hooks/useMounted";
const userid = Cookies.get("userID");

export default function sidebar() {
  const mounted =useMounted()
  const [sidebar, setSidebar] = useState([]);
  useEffect(() => {
    const fetchsidebar = async () => {
      const res = await fetchUserApi(userid);
      setSidebar(res);
      // setInvoiceList(invList)
      // setFilteredData(invList)
      console.log(res);
    };
    // fetchsidebar();
    if(userid=="null"){
      location.reload("/StaffAccess")
      
    }else{
      fetchsidebar();
    }
  }, []);
  return (
    <div className="w-96 drop-shadow-xl ">
      <div className="flex flex-col bg-white h-screen p-5 w-full items-center">
        {/* logo sementara */}
        <Image src={"/Premily-Logo.png"} height={"130"} width={"130"} alt="logo"></Image>

        <div className="flex flex-col items-center my-5">
          {mounted && sidebar.Image == ""? 
            <FaCircleUser className="size-24" /> :<img
            className="w-[100px] h-[100px] rounded-full"
            src={sidebar.Image}
            alt="profile pic"
          />
          }
          
          <p className="font-semibold mt-3">Welcome,</p>
          {sidebar.username}
        </div>
        <ListMenu />
      </div>
    </div>
  );
}
