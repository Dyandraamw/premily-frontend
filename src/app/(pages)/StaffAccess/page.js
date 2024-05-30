"use client";
import React, { useState } from "react";

import TableStaff from "@/app/components/StaffAccessTable/page";
import TableUser from "@/app/components/StaffAccessTable";

export default function StaffAcces() {
  const [showModal, setShowModal] = useState(false);

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

  // const [siData, setSiData] = useState([
  //   { item: "", sum_insured: "", notes: "" },
  // ]);

  // const handleAddSiRow = () => {
  //   setSiData([...siData,{item: "", sum_insured: "", notes: ""}])
  // };

  // const handleSiChange = (e,i) => {
  //   const {id,value} = e.target
  //   const changeValue = [...siData]
  //   changeValue[i][id] = value
  //   setSiData(changeValue)
  // };

  // const handleDeleteSiRow = () => {};
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
        <TableStaff tableData={StaffAcces} />
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 h-[350px] overflow-y-auto">
        <h1 className="ml-4 text-[34px] font-semibold text-green-700 ">
          User List
        </h1>
        <TableUser onClick={() => setShowModal(true)} tableData={UserLists} />
      </div>

      {/* <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="py-6 px-6 lg:px-8 text-left">
          <h1 className="mb-3 text-xl font-medium text-gray-600">
            Change Role
          </h1>
          <form className="space-y-6" action="#">
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              />
            </div>
          </form>
          <Textfield />
        </div>
      </Modal> */}
    </div>
  );
}
