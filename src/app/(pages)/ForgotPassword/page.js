"use client"
import React, { useState } from "react";
import TextField from '@mui/material/TextField';

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-16">
      <div className="w-96 p-8 h-full shadow-lg border-2 border-green-800 bg-white rounded-md">
        <h1 className="text-xl block text-center font-semibold mb-3 mt-3 tracking-wide">Forgot Password</h1>
        <TextField 
         id="outlined-Email"
         label="Email"
         placeholder="Masukkan Email Anda"
         className="w-full mt-3 mb-5"
        />
        <div className="mt-3">
          <button type="submit" className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold">Send to My Email</button>
        </div>
        <div className="mt-3">
          <button href='/SignIn' type="submit" className="border-2 border-green-700 text-green-700 py-1 w-full rounded-md hover:bg-transparent hover:text-white hover:bg-green-700 font-semibold">Back to Sign In</button>
        </div>
      </div>
    </div>
  );
}
