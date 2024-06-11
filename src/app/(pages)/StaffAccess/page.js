"use client";
import React, { useState } from "react";
import TableUser from "@/app/components/StaffAccessComponents/page";
import TableStaff from "@/app/components/StaffAccessComponents/TableAccessRequest/page";
import ChangeRole from "@/app/components/StaffAccessComponents/Modal";

export default function StaffAcces() {
  const [showModal, setShowModal] = useState(false);

  const [accessRequests, setAccessRequests] = useState([
    {
      username: "John_Williams",
      email: "John.williams@gmail.com",
      phone: "081234218765",
      role: "Pending",
    },
    // Add more initial data as needed
  ]);

  const [userList, setUserList] = useState([
    {
      username: "Alexander",
      email: "G.Alex@gmail.com",
      phone: "081234218765",
      role: "Guest",
    },
    // Add more initial data as needed
  ]);

  const handleAccept = (user) => {
    setUserList([...userList, { ...user, role: "User" }]);
    setAccessRequests(
      accessRequests.filter((u) => u.username !== user.username)
    );
  };

  const handleReject = (user) => {
    setAccessRequests(
      accessRequests.filter((u) => u.username !== user.username)
    );
  };

  function createData(username, email, phone, role) {
    return { username, email, phone, role };
  }

  const StaffAcces = [
    createData("John_Williams", "John.williams@gmail.com", "081234218765"),
    createData("John_Williams", "John.williams@gmail.com", "081234218765"),
    createData("John_Williams", "John.williams@gmail.com", "081234218765"),
    createData("John_Williams", "John.williams@gmail.com", "081234218765"),
    createData("John_Williams", "John.williams@gmail.com", "081234218765"),
  ];

  const UserLists = [
    createData(
      "John_Williams",
      "John.williams@gmail.com",
      "081234218765",
      "Admin"
    ),
    createData(
      "John_Williams",
      "John.williams@gmail.com",
      "081234218765",
      "Admin"
    ),
    createData(
      "John_Williams",
      "John.williams@gmail.com",
      "081234218765",
      "Admin"
    ),
    createData(
      "John_Williams",
      "John.williams@gmail.com",
      "081234218765",
      "Admin"
    ),
  ];

  const handleSearch = (e) => {
    const searchVal = e.target;
  };

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <div className="mb-2">
        <h1 className="text-4xl text-green-700 font-bold">Staff Acces</h1>
        <p className="ml-1 font-medium text-gray-600">
          View & edit your staff access
        </p>
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 h-[350px] overflow-y-auto">
        <h1 className="ml-4 text-[34px] font-semibold text-green-700 ">
          Access Request
        </h1>
        <TableStaff
          tableData={accessRequests}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 h-[350px] overflow-y-auto">
        <h1 className="ml-4 text-[34px] font-semibold text-green-700 ">
          User List
        </h1>
        <TableUser onClick={() => setShowModal(true)} tableData={UserLists} />
      </div>
    </div>
  );
}
