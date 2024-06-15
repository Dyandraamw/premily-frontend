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

import { Alert } from "@mui/material";
import { FaInfoCircle } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z)(?=.*[0-9])(?=.*[!@#%]).{8,24}$/;

export default function SignUp(company) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState("");

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState("");
  const [matchFocus, setMatcFocus] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    // console.log(result);
    // console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PASS_REGEX.test(user);
    // console.log(result);
    // console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [user, password, matchPassword]);

  // useEffect(async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://premily-app-test-premily-7f5a9b07.koyeb.app/sign-up"
  //     );
  //     setFetchData(response.data);
  //   } catch (err) {
  //     console.log("error fetch data", err);
  //   }
  // });

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
      <Alert className="mb-5 w-96 rounded-md tracking-widest font-semibold hidden">
        Your Account Already Sign Up!
      </Alert>
      <div className="w-96 p-6 shadow-lg border-2 border-green-800 bg-white rounded-md">
        <h1 className="text-xl block text-center font-semibold mb-8 mt-5">
          Sign Up To Your Account
        </h1>
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
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                {validName ? (
                  <FaCheckCircle color="green" />
                ) : !user ? (
                  <FaRegTimesCircle color="red" />
                ) : null}
              </IconButton>
              {/* <icon>
                {validName ? (
                  <FaCheckCircle color="green" />
                ) : !user ? null : (
                  <FaRegTimesCircle color="red" />
                )}
              </icon> */}
            </InputAdornment>
          }
          className="w-full mb-5 border-green-500"
        />
        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instruction" : "offscreen"
          }
        >
          <FaInfoCircle>
            4 to 24 characters.
            <br /> Must begin with a letter.
            <br /> Letters, numbers, underscores, hyphens allowed.
          </FaInfoCircle>
        </p>
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
        <FormControl
          sx={{ width: "25ch" }}
          variant="outlined"
          required
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
          variant="outlined"
          required
          className="w-full mb-5"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
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
        <div className="mt-8 mb-3">
          <button
            href="/SignIn"
            type="submit"
            className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold"
          >
            <Link href="/SignIn">Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
