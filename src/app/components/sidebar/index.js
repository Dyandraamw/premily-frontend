"use client"
import React, { useEffect, useState } from "react";
import ListMenu from "./listMenu";
import { FaCircleUser } from "react-icons/fa6";

import Image from "next/image";
import Cookies from "js-cookie";
import { fetchUserApi } from "@/app/utils/api/AuthToken/refreshToken";
import useMounted from "@/app/utils/hooks/useMounted";


export default function sidebar() {
  const userid = Cookies.get("userID");
  const mounted =useMounted()
  const [sidebar, setSidebar] = useState({
    Username: "",
    Image: "",
  });
  useEffect(() => {
    const fetchsidebar = async () => {
      const res = await fetchUserApi(userid);
      if (
        res.Image != "" &&
        !res.Image.startsWith(
          "https://experimental-biddie-premily-6e515ebf.koyeb.app/"
        )
      ) {
        setSidebar({
          ...sidebar,
          Username: res.username,
          Image: "",
        });
      }else{
        setSidebar({
          ...sidebar,
          Username: res.username,
          Image: res.Image,
        });
      }
      // setInvoiceList(invList)
      // setFilteredData(invList)
      console.log(res);
    };
    // if (
    //   userid == undefined ||
    //   userid == null ||
    //   userid == "null" ||
    //   userid == ""
    // ) {
    //   console.log(userid);
    //   location.reload("/StaffAccess")
    // } else if(userid!=null) {
    //   console.log(userid);
    //   fetchsidebar();
    // }
    fetchsidebar();
    
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
          {sidebar.Username}
        </div>
        <ListMenu />
      </div>
    </div>
  );
}

