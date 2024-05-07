import React from "react";

export default function SignUp() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
    //    test hello
    //   </div>
    // </main>
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-800">
      <div className="w-96 p-8 h-full shadow-lg bg-white rounded-md">
        <h1 className="text-3xl block text-center font-semibold">Sign Up</h1>
        <hr className="mt-3"/>
        <div className="mt-3">
          <label htmlFor="Email" className="block text-base mb-2">Email</label>
          <input type="text" id="Email" className="border w-full text-base px-2 py-1 rounded-sm focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter Email"></input>
        </div>
        <div className="mt-3">
          <label htmlFor="username" className="block text-base mb-2">Username</label>
          <input type="text" id="username" className="border w-full text-base px-2 py-1 rounded-sm focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter Username"></input>
        </div>
        <div className="mt-3">
          <label htmlFor="phoneNumber" className="block text-base mb-2">Phone Number</label>
          <input type="text" id="phoneNumber" className="border w-full text-base px-2 py-1 rounded-sm focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter Phone Number"></input>
        </div>
        <div className="mt-3">
          <label htmlFor="Company" className="block text-base mb-2">Company</label>
          <input type="text" id="Company" className="border w-full text-base px-2 py-1 rounded-sm focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter Company"></input>
        </div>
        <div className="mt-3">
          <label htmlFor="Password" className="block text-base mb-2">Password</label>
          <input type="Password" id="Password" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter Password"></input>
        </div>
        <div className="mt-3">
          <label htmlFor="CPassword" className="block text-base mb-2">Confirm Password</label>
          <input type="CPassword" id="CPassword" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter Confirm Password"></input>
        </div>
        <div className="mt-24">
          <button type="submit" className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-green-700 font-semibold">Sign Up</button>
        </div>
        <div className="mt-3">
          <p className="flex justify-center text-black text-sm">Don't have an account?<a href="#" className="text-gray-500 hover:text-indigo-700 font-semibold">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}
