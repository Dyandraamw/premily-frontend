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
import { useRouter } from "next/navigation";
import { FormHelperText } from "@mui/material";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%]).{8,24}$/;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const [image, setImageValue] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setEmailValid(email.includes("@") && email.includes("."));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASS_REGEX.test(password));
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !email || !password || !confirmPassword) {
      setErrMsg("All fields are required");
      return;
    }
    if (!validName || !emailValid || !validPassword || !passwordsMatch) {
      setErrMsg("Invalid Entry");
      return;
    }

    if (!validName || !emailValid || !validPassword || !passwordsMatch) {
      setErrMsg("Invalid Entry");
      return;
    }
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
    router.push("/SignIn");
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
      <div className="w-96 p-6 shadow-lg border-2 border-green-800 bg-white rounded-md">
        <img
          src="/Premily-Logo.png"
          alt="logo"
          className="ml-[110px] w-[100px]"
        />

        <form onSubmit={handleSubmit}>
          <h1 className="text-xl block text-center font-semibold mb-8 mt-5">
            Create a New Account
          </h1>
          <TextField
            required
            id="outlined-Email"
            label="Email"
            color="success"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            error={!emailValid && email.length > 0}
            helperText={
              !emailValid && email.length > 0
                ? "Email should contains symbols @ and (.)"
                : ""
            }
            className="w-full mt-3 mb-5"
          />
          <TextField
            required
            id="outlined-username"
            label="Username"
            color="success"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            aria-invalid={validName ? "false" : "true"}
            error={!validName && user.length > 0}
            helperText={
              !validName && user.length > 0
                ? "Username atleast contains 4 characters"
                : ""
            }
            className="w-full mb-5 border-green-500"
          />
          <TextField
            id="outlined-name"
            label="Name"
            color="success"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full mb-5"
          />
          <TextField
            id="outlined-phone"
            label="Phone Number"
            color="success"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            className="w-full mb-5"
          />
          <FormControl
            sx={{ width: "25ch" }}
            variant="outlined-password"
            required
            autoComplete="off"
            color="success"
            error={!validPassword && password.length > 0}
            className="w-full mb-5"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
            <FormHelperText>
              {!validPassword && password.length > 0
                ? "password must be contains 8 characters uppercase and lowercase, having a number and symbol(!@#)"
                : ""}
            </FormHelperText>
          </FormControl>
          <FormControl
            sx={{ width: "25ch" }}
            variant="outlined=confirm-password"
            required
            autoComplete="off"
            color="success"
            error={!passwordsMatch && confirmPassword.length > 0}
            className="w-full mb-5"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
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
            <FormHelperText>
              {!passwordsMatch && confirmPassword.length > 0
                ? "Passwords didn't match"
                : ""}
            </FormHelperText>
          </FormControl>
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
              type="submit"
              className="border-2 p-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
