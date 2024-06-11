"use client";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectFields() {
  const [company, setCompany] = useState("");

  const handleChange = (event) => {
    setCompany(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 120 }} className="w-full mb-5">
        <InputLabel id="demo-simple-select-helper-label">Company</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={company}
          label="Company"
          onChange={handleChange}
        >
          <MenuItem value={10}>Admin</MenuItem>
          <MenuItem value={20}>Staff</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
