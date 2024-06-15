"use client";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectFields() {
  const [role, setRole] = useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 120 }} className="w-full mb-5">
        <InputLabel id="demo-simple-select-helper-label" />
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={role}
          label="Role"
          onChange={handleChange}
          // helperText="Incorrect entry"
        >
          <MenuItem value={role}>Admin</MenuItem>
          <MenuItem value={role}>Staff</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
