"use client";
import React, { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import ImgDragDrop from "../../components/imgDragDrop";
import ProfileDragDrop from "@/app/components/uploadPhoto/page";

function Profile({ value, onChange, defaultSrc, click }) {
  const fileInputRef = useRef(null);
  const [src, setSrc] = useState(defaultSrc || null);
  const [file, setFile] = useState(null);

  const browse = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      // onChange(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setSrc(e.target.result);
      };
    }
  };

  const handleRemove = () => {
    setFile(null);
    setSrc(defaultSrc);
    // onChange(null);
  };

  const [profile, setProfile] = useState({
    username: "John William",
    Email: "J.William1293@gmail.com",
    PhoneNumber: "0812432132",
    Role: "Admin",
  });

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
        <div className="flex flex-col justify-center items-center rounded-md bg-white w-5/12 h-full text-white mx-auto border-2 border-green-800 outline-green-700 mt-28">
          <div className="relative inline-block">
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
            <FaUserCircle className="size-32 mt-12 mb-6 text-black "></FaUserCircle>
            <div className="absolute top-[55px]  w-28 h-28 bg-black rounded-full bg-opacity-35  flex items-center justify-center">
              <button
                onClick={browse}
                className="rounded-full hover:bg-white hover:bg-opacity-25 p-2 focus:outline-none text-gray-300 transition duration-300"
              >
                <CiCamera className="h-6 w-6" />
              </button>
              <button
                v-if="file"
                onClick={handleRemove}
                className="rounded-full hover:bg-white hover:bg-opacity-25 p-2 focus:outline-none text-gray-300 transition duration-300"
              >
                <icon className="h-6 w-6">x</icon>
              </button>
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
              <p className="mt-3 mb-3">: {profile.username}</p>
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
