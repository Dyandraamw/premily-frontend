"use client";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";



export default function datePickerMUI({ id, bigLabel, label, onChange, dateValue }) {
  return (
    <div>
      <label className="block text-black text-lg font-bold mb-2">
        {bigLabel}
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="bg-white mr-2">
        <DatePicker
          id={id}
          format="DD/MM/YYYY"
          label={label}
          slotProps={{
            openPickerIcon: { fontSize: "small", color: 'success' },
            textField: {
              size: "small",
              color: "success",
              
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "1px solid gray",
              borderRadius: "8px",
              boxShadow: "1",
            }, // page load style
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: "1px solid gray",
            }, //hover style
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { border: "3px solid green" }, //focus style
          }}
          value={dateValue}
          onChange={onChange}
          
        />  
        </div>
      </LocalizationProvider>
    </div>
  );
}

// MuiTextField-root
