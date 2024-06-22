"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { FetchSignUp } from "@/app/utils/api/AuthToken/refreshToken";
import ImgDragDrop from "../../components/imgDragDrop/index";
import Cookies from "js-cookie";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z)(?=.*[0-9])(?=.*[!@#%]).{8,24}$/;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [image, setImageValue] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("username", user);
    data.append("email", email);
    data.append("name", name);
    data.append("phone", phoneNumber);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);
    data.append("company", "PT Garuda Indonesia");
    data.append("image", image);

    const response = await FetchSignUp(data);
    console.log("api ada", response.data);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPasswordd = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full p-16">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      {/* <Alert className="mb-5 w-96 rounded-md tracking-widest font-semibold hidden">
        Your Account Already Sign Up!
      </Alert> */}
      <div className="w-96 p-6 shadow-lg border-2 border-green-800 bg-white rounded-md">
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl block text-center font-semibold mb-8 mt-5">
            Sign Up To Your Account
          </h1>
          <TextField
            required
            id="outlined-Email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full mt-3 mb-5"
          />
          <TextField
            required
            id="outlined-username"
            label="Username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            aria-invalid={validName ? "false" : "true"}
            className="w-full mb-5 border-green-500"
          />
          <TextField
            id="outlined-name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full mb-5"
          />
          <TextField
            id="outlined-phone"
            label="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            className="w-full mb-5"
          />
          <FormControl
            sx={{ width: "25ch" }}
            variant="outlined-password"
            required
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full mb-5"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
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
          <FormControl
            sx={{ width: "25ch" }}
            variant="outlined=confirm-password"
            required
            autoComplete="off"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="w-full mb-5"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              type={showConfirmPassword ? "text" : "ConfirmPassword"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPasswordd}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
          <ImgDragDrop
            setImgValue={setImageValue}
            imgValue={image}
            className="w-30 h-30 "
          />
          <div className="mt-3">
              <p className="flex justify-center text-black text-sm">
                Already have an account?
                <Link
                  href="/SignIn"
                  className="text-gray-500 hover:text-green-800 font-semibold"
                >
                  Sign In
                </Link>
              </p>
            </div>
          <div className="mt-8 mb-3">
            <button
              href="/SignIn"
              type="submit"
              className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold"
            >
              <Link href="/SignIn">Sign Up</Link>
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
