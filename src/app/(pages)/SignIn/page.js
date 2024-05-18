"use client"
import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SelectFields from "@/app/element/SelectField";
import Link from "next/link";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-16">
      <div className="w-96 p-8 h-full shadow-lg border-2 border-green-800 bg-white rounded-md">
        <h1 className="text-xl block text-center font-semibold mb-8 mt-5 tracking-wide">Sign In To Your Account!</h1>
        <TextField 
         required
         id="outlined-Email"
         label="Email"
         className="w-full mt-3 mb-5"
        />
        <FormControl sx={{ width: '25ch' }} variant="outlined" required className="w-full mb-5">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <div className="mt-3 flex justify-between items-center ">
          <div className="mr-3">
            <input className="mr-2" type="checkbox"></input>
            <label >Remember me</label>
          </div>
          <div>
            <Link href="/ForgotPassword" className="text-gray-500 font-semibold hover:text-green-800">Forgot Password?</Link>
          </div>
        </div>
        <div className="mt-14">
          <button href="/dashboard" type="submit" className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold">Sign In</button>
        </div>
        <div className="mt-3">
          <p className="flex justify-center text-black text-sm">Don't have an account?<Link href="/SignUp" className="text-gray-500 hover:text-green-800 font-semibold">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}
