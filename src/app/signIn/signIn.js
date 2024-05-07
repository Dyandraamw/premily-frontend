import React from "react";

export default function signIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-800">
      <div className="w-96 p-8 h-full shadow-lg bg-white rounded-md">
        <h1 className="text-3xl block text-center font-semibold">Sign In</h1>
        <hr className="mt-3"/>
        <div className="mt-3">
          <label htmlFor="Email" className="block text-base mb-2">Email</label>
          <input type="text" id="Email" className="border w-full text-base px-2 py-1 rounded-sm focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter Email"></input>
        </div>
        <div className="mt-3">
          <label htmlFor="Password" className="block text-base mb-2">Password</label>
          <input type="Password" id="Password" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter Password"></input>
        </div>
        <div className="mt-3 flex justify-between items-center ">
          <div className="mr-3">
            <input className="mr-2" type="checkbox"></input>
            <label >Remember me</label>
          </div>
          <div>
            <a href="#" className="text-gray-500 hover:text-green-800">Forgot Password?</a>
          </div>
        </div>
        <div className="mt-14">
          <button type="submit" className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold">Sign In</button>
        </div>
        <div className="mt-3">
          <p className="flex justify-center text-black text-sm">Don't have an account?<a href="#" className="text-gray-500 hover:text-indigo-700 font-semibold">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}
