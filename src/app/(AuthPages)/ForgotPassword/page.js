"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import { forgotPasswordApi, resetPasswordApi } from "@/app/utils/api/AuthToken/refreshToken";
import useMounted from "@/app/utils/hooks/useMounted";

export default function ForgotPassword() {
  const mounted = useMounted()
  const [sendEmail, setSendEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const emailRef = useRef();
  const errRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(sendEmail);
    await forgotPasswordApi(sendEmail);
    setSuccess(true);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    console.log(resetToken);
    await resetPasswordApi(resetToken,newPassword);
    setSuccess(false);
  };

  return (
    <>
      {mounted && success ? (
        <section className="flex min-h-screen w-full flex-col items-center justify-center p-16">
          <div className="">
            <div className="w-[390px] h-[450px] p-8 shadow-lg border-2 border-green-800 bg-white rounded-md">
              <h1 className="text-xl block text-center font-semibold mb-3 mt-3 tracking-wide">
                Email Sent
              </h1>
              <p className="text-center mb-4">
                Please check your email to receive the token and enter your new
                password below.
              </p>
              <form onSubmit={handleReset}>
                <TextField
                  id="outlined-token"
                  label="Token"
                  // ref={emailRef}
                  onChange={(e) => setResetToken(e.target.value)}
                  value={resetToken}
                  className="w-full mt-3 mb-3 "
                  color="success"
                />
                <TextField
                  id="outlined-newpass"
                  label="New Password"
                  // ref={emailRef}
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  className="w-full mt-3 mb-3 "
                  color="success"
                />
                <Link href="/SignIn">
                  <button
                    type="button"
                    className="flex w-full mb-3 justify-end text-gray-500 hover:text-green-700 font-medium "
                  >
                    go back to sign in
                  </button>
                </Link>
                <div className="mt-3">
                  <button
                    type="submit"
                    className="border-2 border-green-700 bg-green-700 text-white p-2 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-16">
          <div className="w-96 p-8 shadow-lg border-2 border-green-800 bg-white rounded-md">
            <form onSubmit={handleSubmit}>
              <h1 className="text-xl block text-center font-semibold mb-3 mt-3 tracking-wide">
                Forgot Password
              </h1>
              <TextField
                id="outlined-Email"
                label="Email"
                ref={emailRef}
                onChange={(e) => setSendEmail(e.target.value)}
                value={sendEmail}
                className="w-full mt-3 "
                color="success"
              />
              <Link href="/SignIn">
                <button
                  type="button"
                  className="flex w-full mb-3 justify-end text-gray-500 hover:text-green-700 font-medium "
                >
                  go back to sign in
                </button>
              </Link>
              <div className="mt-3">
                <button
                  type="submit"
                  className="border-2 border-green-700 bg-green-700 text-white p-2 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold"
                >
                  Send to My Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
