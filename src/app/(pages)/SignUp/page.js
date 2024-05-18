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
import { Alert } from "@mui/material";
import Link from "next/link";

export default function SignUp(company) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleClickShowConfirmPasswordd = () => setShowConfirmPassword((show) => !show)
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-16">
      <Alert className="mb-5 w-96 rounded-md tracking-widest font-semibold hidden">Your Account Already Sign Up!</Alert>
      <div className="w-96 p-6 h-full shadow-lg border-2 border-green-800 bg-white rounded-md">
        <h1 className="text-xl block text-center font-semibold mb-8 mt-5">Sign Up To Your Account</h1>
        <TextField 
         required
         id="outlined-Email"
         label="Email"
         className="w-full mt-3 mb-5"
        />
        <TextField 
         required
         id="outlined-username"
         label="Username"
         className="w-full mb-5"
        />
        <TextField 
         id="outlined-username"
         label="Name"
         className="w-full mb-5"
        />
        <TextField 
         id="outlined-phone"
         label="Phone Number"
         className="w-full mb-5"
        />
        <SelectFields
         value={company}
         label="Company"
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
        <FormControl sx={{ width: '25ch' }} variant="outlined" required className="w-full mb-5">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'ConfirmPassword'}
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
            label="Confirm Password"
          />
        </FormControl>
        <div className="mt-8 mb-3">
          <button href='/SignIn' type="submit" className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold"><Link href="/SignIn">Sign Up</Link></button>
        </div>
      </div>
    </div>
  );
}
