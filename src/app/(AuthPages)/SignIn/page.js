"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import { TokenSignIn } from "@/app/utils/api/AuthToken/refreshToken";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function SignIn() {
  Cookies.set("userRole", null);
  Cookies.set("userID", null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(null);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FormData = require("form-data");
    let data = new FormData();
    data.append("email", user);
    data.append("password", password);
    data.append("remember_me", rememberMe);

    const tokenRes = await TokenSignIn(data);
    if (tokenRes != null) {
      const tokenDecoded = jwtDecode(tokenRes.token);
      Cookies.set("userRole", tokenDecoded.role);
      Cookies.set("userID", tokenDecoded.user_id);
      Cookies.set("jwtToken", tokenRes.token);
      // location.reload("/dashboard")
      router.push("/dashboard");
    }
    // console.log(Cookies.get("jwtToken"))
    // console.log(Cookies.get("userRole"))
    // console.log(Cookies.get("userID"))
    // setToken(token);
  };

  const handleCheckBox = () => {
    var checkValidate = document.getElementById("remember");
    if (checkValidate.checked == true) {
      setRememberMe(true);
    } else {
      setRememberMe(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //console.log(user)

  return (
    <>
      {success ? (
        <section>
          <Link href="/dashboard" />
        </section>
      ) : (
        <div className="flex justify-center min-h-screen flex-col items-center w-full p-16">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="w-96 p-8 shadow-lg border-2 border-green-800 bg-white rounded-md">
            <form onSubmit={handleSubmit}>
              <h1 className="text-xl block text-center font-semibold mb-8 mt-5 tracking-wide">
                Sign In To Your Account!
              </h1>
              <TextField
                required
                id="outlined-Email"
                label="Email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                color="success"
                error={!!userError}
                helperText={userError}
                className="w-full mt-3 mb-5"
              />
              <FormControl
                sx={{ width: "25ch" }}
                required
                variant="outlined"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                color="success"
                className="w-full mb-5"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  error={!!passwordError}
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
                <FormHelperText>{passwordError}</FormHelperText>
              </FormControl>

              <div className="mt-3 flex justify-between items-center ">
                <div className="mr-3">
                  <input
                    onClick={handleCheckBox}
                    id="remember"
                    className="mr-2"
                    type="checkbox"
                  ></input>
                  <label>Remember me</label>
                </div>
                <div>
                  <Link
                    href="/ForgotPassword"
                    className="text-gray-500 font-semibold hover:text-green-800"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="mt-14">
                <button
                  href="/#"
                  type="submit"
                  className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="mt-3">
              <p className="flex justify-center text-black text-sm">
                Don't have an account?
                <Link
                  href="/SignUp"
                  className="text-gray-500 hover:text-green-800 font-semibold"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
