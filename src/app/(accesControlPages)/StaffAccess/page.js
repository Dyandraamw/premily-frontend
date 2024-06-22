"use client";
import React, { useState } from "react";
import TableUser from "@/app/components/StaffAccessComponents/page";
import TableStaff from "@/app/components/StaffAccessComponents/TableAccessRequest/page";
import DeleteStaffAccessModal from "@/app/components/StaffAccessComponents/Modal";
import ChangeRole from "@/app/components/StaffAccessComponents/ModalRole";
// import DeleteChangeRoleModal from "@/app/components/StaffAccessComponents/RoleModal";

function createData(user_id, username, email, phone, role) {
  return { user_id, username, email, phone, role };
}

const dataAccess = [
  createData("John_Williams", "John.williams@gmail.com", "081234218765"),
  createData("John_Williams", "John.williams@gmail.com", "081234218765"),
  createData("John_Williams", "John.williams@gmail.com", "081234218765"),
  createData("John_Williams", "John.williams@gmail.com", "081234218765"),
  createData("John_Williams", "John.williams@gmail.com", "081234218765"),
];

const dataUser = [
  createData(
    "USR-001",
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

export default function StaffAcces() {
  const [showModal, setShowModal] = useState(false);

  const [accessRequests, setAccessRequests] = useState(dataAccess);

  const [userList, setUserList] = useState(dataUser);

  const [modalState, setModalState] = useState(false);
  const handleOpenModal = () => setModalState(true);
  const handleCloseModal = () => setModalState(false);

  const [detailStaffAccess, setdetailStaffAccess] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
    soa_id: "",
  });

  const [detailSAModal, setDetailSAModal] = useState(false);
  const handleOpenDetailStaffAccessModal = (data) => {
    setDetailSAModal(true);
    setdetailStaffAccess({
      ...detailStaffAccess,
      username: data[0],
      email: data[1],
      phone: data[2],
      role: data[3],
    });
  };
  const handleCloseDetailSAModal = () => setDetailSAModal(false);

  // const [changeRoleModalState, setchangeRoleModalState] = useState(false);
  // const handleOpenCRModal = () => setchangeRoleModalState(true);
  // const handleCloseCRModal = () => setchangeRoleModalState(false);

  // const [editCRModal, setEditCRModal] = useState(false);
  // const [editCR, setEditCR] = useState({
  //   user_id: "",
  //   role: "",
  // });

  // const handleOpenEditCRModal = (data) => {
  //   setEditCRModal(true);
  //   // console.log(data)
  //   setEditCR({
  //     ...editCR,
  //     user_id: data[0],
  //     role: data[4],
  //   });
  // };

  // const handleCloseEditCRModal = () => setEditCRModal(false);

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

  return (
    <div className="flex flex-grow flex-col px-10 py-5">
      <DeleteStaffAccessModal
        detailSAModal={detailSAModal}
        handleCloseModal={handleCloseDetailSAModal}
        detailStaffAccess={detailStaffAccess}
        setdetailStaffAccess={setdetailStaffAccess}
      />
      {/* <ChangeRole
        modalState={changeRoleModalState}
        handleCloseModal={handleCloseCRModal}
        role={dataUser}
      /> */}
      {/* <DeleteChangeRoleModal
        detailCRModal={detailCRModal}
        handleCloseModal={handleCloseDetailCRModal}
        detailChangeRole={detailChangeRole}
        handleOpenDetailChangeRoleModal={setDetailChangeRole}
      /> */}

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
          tableData={dataAccess}
          handleOpenDetailStaffAccessModal={handleOpenDetailStaffAccessModal}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      </div>
      <div className="bg-white rounded-lg w-min-[1500px] w-max-full mt-5 p-5 h-[350px] overflow-y-auto">
        <h1 className="ml-4 text-[34px] font-semibold text-green-700 ">
          User List
        </h1>
        <TableUser
          onClick={() => setShowModal(true)}
          tableData={dataUser}
          // handleOpenDetailCRModal={handleOpenCRModal}
          // handleOpenEditCRModal={handleOpenEditCRModal}
        />
      </div>
    </div>
  );
}
