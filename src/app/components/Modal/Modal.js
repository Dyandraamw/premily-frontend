import React, { useState } from "react";
import SelectFields from "../SelectedFields";
import Button from "../Button.js/page";

const Modal = ({ isVisible, onClose }) => {
  const [Role, setRole] = useState();

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Role submitted:", Role);
    onClose();
  };

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-1/3 h-1/2 bg-white rounded-md p-8">
        <button
          className="flex justify-end mb-3 text-black text-xl place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className=" flex mb-3 text-2xl p-2 rounded font-semibold items-center justify-center">
          Change Role
        </div>
        <SelectFields
          value={Role}
          label="Change Role"
          onChange={handleChange}
          className="mb-3"
        ></SelectFields>
        <div className="m-auto">
          <button
            className="justify-center text-lg py-3 border-[3px] drop-shadow-lg font-semibold w-full text-white hover:bg-white hover:text-black rounded-lg bg-green-700 border-green-700 mr-5"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// "use client";
// import React, { useState } from "react";
// import IconButton from "@mui/material/IconButton";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
// import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// // import SelectFields from "@/app/element/SelectField";
// import Link from "next/link";

// export default function Modal(isVisible, onClose) {
//   if (!isVisible) return null;

//   // const handleClose = () => setShow(false);
//   const handleClose = (e) => {
//     if (e.target.id === "wrapper") onClose();
//   };

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center p-16">
//       <div
//         className="w-96 p-8 h-full shadow-lg border-2 border-green-800 bg-white rounded-md"
//         onClick={handleClose}
//         id="wrapper"
//       >
//         <h1 className="text-xl block text-center font-semibold mb-8 mt-5 tracking-wide">
//           Sign In To Your Account!
//         </h1>
//         <TextField
//           required
//           id="outlined-Email"
//           label="Email"
//           className="w-full mt-3 mb-5"
//         />
//       </div>
//     </div>
//   );
// }
