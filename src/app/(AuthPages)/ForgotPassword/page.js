"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";

export default function ForgotPassword() {
  const [sendEmail, setSendEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const emailRef = useRef();
  const errRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(emailRef);
    setSendEmail("");
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <div className="flex justify-center w-full items-center min-h-screen flex-col">
            <div className="w-96 h-60 p-8 shadow-lg border-2 border-green-800 bg-white rounded-md">
              <h1 className="text-xl block text-center font-semibold mb-3 mt-3 tracking-wide">
                Email Sent
              </h1>
              <p className="text-center mb-4">
                Please check your email for instructions to reset your password.
              </p>
              <Link href="/SignIn">
                <button className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold">
                  Back to Sign In
                </button>
              </Link>
            </div>
          </div>{" "}
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
                className="w-full mt-3 mb-5"
              />
              <div className="mt-3">
                <button
                  type="submit"
                  className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold"
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
