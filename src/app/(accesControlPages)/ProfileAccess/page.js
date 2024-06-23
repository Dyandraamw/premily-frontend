"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import ImgDragDrop from "../../components/imgDragDrop";
import ProfileDragDrop from "@/app/components/uploadPhoto/page";
import useMounted from "@/app/utils/hooks/useMounted";
import Cookies from "js-cookie";
import { fetchUserApi, updateUserPic } from "@/app/utils/api/AuthToken/refreshToken";
import { FaCircleUser } from "react-icons/fa6";
const userid = Cookies.get("userID");

function Profile({ value, onChange, defaultSrc, click }) {
  const mounted = useMounted();
  const [profile, setProfile] = useState([
    {
      Username: "",
      Email: "",
      PhoneNumber: "",
      Role: "",
      Image: ""
    },
  ]);
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetchUserApi(userid);
      setProfile({
        ...profile,
        Username: res.username,
        Email: res.email,
        PhoneNumber: res.phone,
        Role: res.role,
        Image: res.Image
      });
      // setInvoiceList(invList)
      // setFilteredData(invList)
      console.log(res);
    };
    // fetchsidebar();
    if (userid != null) {
      fetchProfile();
    }
  }, []);
  const fileInputRef = useRef(null);
  const [src, setSrc] = useState(defaultSrc || null);
  const [file, setFile] = useState(null);

  const browse = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleChange = async(e) => {
    const file = e.target.files[0];
    // console.log(file.name)
    if (file) {
      // setFile(file);
      // // onChange(file);
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = (e) => {
      //   setSrc(e.target.result);
      // };
      const picForm = new FormData()
      picForm.append("image",file)
      await updateUserPic(userid,picForm)
      location.reload("/ProfileUser")
    }
  };


  const handleRemove = () => {
    setFile(null);
    setSrc(defaultSrc);
    // onChange(null);
  };

  // const [profile, setProfile] = useState({
  //   username: "John William",
  //   Email: "J.William1293@gmail.com",
  //   PhoneNumber: "0812432132",
  //   Role: "Admin",
  // });

  // const handleChange = (e) => {
  //   if (e.target.files[0]) {
  //     setFile(e.target.files[0]);
  //   }
  // };

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <div className="mb-2">
        <h1 className="text-4xl outline0greee text-green-700 font-bold">
          Profile
        </h1>
        <p className="ml-1 font-medium text-gray-600">
          View and edit your profile
        </p>
        <div className="flex flex-col justify-center items-center  bg-white w-8/12 h-1/2 text-white mx-auto rounded-lg drop-shadow-xl mt-28 p-10">
          <div className="">
            {/* <ProfileDragDrop
              className={"w-[250px]  h-[260px] rounded-full mb-3 "}
            /> */}

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleChange}
              class="hidden"
            ></input>
            {/* <FaUserCircle className="size-32 mt-12 mb-6 text-black "></FaUserCircle> */}
            {mounted && profile.Image == "" ? (
              <FaCircleUser className="size-28" />
            ) : (
              <img
                className="w-[112px] h-[112px] rounded-full"
                src={profile.Image}
                alt="profile pic"
              />
            )}
            <div className="pl-[32px] pr-[35px] mt-2">
              <button
                onClick={browse}
                className="rounded-full hover:bg-black hover:bg-opacity-25 p-2 focus:outline-none text-green-700 transition duration-300"
              >
                <CiCamera className="h-10 w-10" />
              </button>
              {/* <button
                v-if="file"
                onClick={handleRemove}
                className="rounded-full hover:bg-white hover:bg-opacity-25 p-2 focus:outline-none text-gray-300 transition duration-300"
              >
                <icon className="h-6 w-6">x</icon>
              </button> */}
            </div>
          </div>
          <div className="flex justify-evenly w-5/6 mb-14 ">
            <div className="mb-3 text-black font-semibold">
              <p className="mt-3 mb-3">Username</p>
              <p className="mt-3 mb-3">Email</p>
              <p className="mt-3 mb-3">PhoneNumber</p>
              <p className="mt-3 mb-3">Role</p>
            </div>
            <div className="mb-3 text-black font-semibold">
              <p className="mt-3 mb-3">: {profile.Username}</p>
              <p className="mt-3 mb-3">: {profile.Email}</p>
              <p className="mt-3 mb-3">: {profile.PhoneNumber}</p>
              <p className="mt-3 mb-3">: {profile.Role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
