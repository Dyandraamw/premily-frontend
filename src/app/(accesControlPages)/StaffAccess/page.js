"use client";
import React, { useEffect, useState } from "react";
import TableUser from "@/app/components/StaffAccessComponents/index";
import TableStaff from "@/app/components/StaffAccessComponents/TableAccessRequest";
import DeleteStaffAccessModal from "@/app/components/StaffAccessComponents/Modal";
import ChangeRole from "@/app/components/StaffAccessComponents/ModalRole";
import {
  fetchUnroleUser,
  fetchUnverifyUser,
} from "@/app/utils/api/roleApi/role";
// import DeleteChangeRoleModal from "@/app/components/StaffAccessComponents/RoleModal";

export default function StaffAcces() {
  const [showModal, setShowModal] = useState(false);
  const [unrole, setUnrole] = useState([]);
  const [unverifyUser, setUnverifyUser] = useState([]);

  useEffect(() => {
    const fetchunrole = async () => {
      const fetchUnrole = await fetchUnroleUser();
      // console.log(fetchUnrole);
      setUnrole(fetchUnrole);
    };
    fetchunrole();

    const fetchunverify = async () => {
      const fetchUnverif = await fetchUnverifyUser();
      // console.log(fetchUnverif);
      setUnverifyUser(fetchUnverif);
    };
    fetchunverify();
  },[]);

  const [accessRequests, setAccessRequests] = useState();

  const [userList, setUserList] = useState();

  const [modalState, setModalState] = useState(false);
  const handleOpenModal = () => {setModalState(true);}
  const handleCloseModal = () => setModalState(false);

  const [detailStaffAccess, setdetailStaffAccess] = useState([{
    username: "",
    email: "",
    phone: "",
    role: "",
    soa_id: "",
  }]);

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
          tableData={unverifyUser}
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
          tableData={unrole}
          // handleOpenDetailCRModal={handleOpenCRModal}
          // handleOpenEditCRModal={handleOpenEditCRModal}
        />
      </div>
    </div>
  );
}
