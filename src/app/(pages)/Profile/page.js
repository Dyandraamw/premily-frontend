"use client"
import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  const [profile, setProfile] = useState({
    username: "John William",
    Email: "J.William1293@gmail.com",
    PhoneNumber: "0812432132",
    Role: "Admin"
  });

  const handleEdit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <div className="mb-2">
        <h1 className="text-4xl outline0greee text-green-700 font-bold">Profile</h1>
        <p className="ml-1 font-medium text-gray-600">
          View and edit your profile
        </p>
        <div className='flex flex-col justify-center items-center rounded-md bg-white w-5/12 h-full text-white mx-auto border-2 border-green-800 outline-green-700 mt-28'>
            <FaUserCircle className="size-24 mt-14 mb-14 bg-black" />
            <div className='flex justify-evenly w-5/6 mb-14 '>
                <div className='mb-3 text-black font-semibold'>
                    <p className='mt-3 mb-3'>Username</p>
                    <p className='mt-3 mb-3'>Email</p>
                    <p className='mt-3 mb-3'>PhoneNumber</p>
                    <p className='mt-3 mb-3'>Role</p>
                </div>
                <div className='mb-3 text-black font-semibold'>
                <p className='mt-3 mb-3'>:{profile.username}</p>
                <p className='mt-3 mb-3'>:{profile.Email}</p>
                <p className='mt-3 mb-3'>:{profile.PhoneNumber}</p>
                <p className='mt-3 mb-3'>:{profile.Role}</p>
                </div>
            </div>
        </div>
        <button href="/" onClick={handleEdit} className='flex justify-center items-center w-5/12 h-10 rounded-md bg-green-800 text-white mt-5 mx-auto hover:bg-white hover:text-green-800 hover:border-2 font-semibold'>Edit</button>
      </div>
      
    </div>

  )
}

export default Profile