"use client";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectFields({handleChange, roleValue}) {
  const [role, setRole] = useState("");

  // const handleChange = (event) => {
  //   setRole(event.target.value);
  //   console.log(event)
  // };

  return (
    <div>
      {/* <FormControl sx={{ minWidth: 120 }} className="w-full mb-5"> */}
        <InputLabel sx={{ minWidth: 120 }}  id="demo-simple-select-helper-label" className="w-full mb-5" />
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          // value={roleValue}
          label="Role"
          onChange={handleChange}
          // helperText="Incorrect entry"
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="staff">Staff</MenuItem>
        </Select>
      {/* </FormControl> */}
    </div>
  );
}
