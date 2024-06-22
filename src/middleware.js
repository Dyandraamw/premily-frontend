import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { NextResponse, NextRequest } from "next/server";

export default function middleware(req) {
  let token = req.cookies.getAll();
  //   let role = req.cookies.get("userRole")

  let url = req.url;
  const baseUrl = "http://localhost:3000";

  //console.log(token)
  if (!token && url.includes("/dashboard")) {
    return NextResponse.redirect(baseUrl + "/SignIn");
  }

  let role = req.cookies.get("userRole").value;

  //admin and staff banned dari access-control
  if (
    (role == "admin" || role == "staff") &&
    (url.includes("/Profile") || url.includes("/StaffAccess"))
  ) {
    return NextResponse.redirect(baseUrl + "/dashboard");
  } else if (
    role == "access_control" &&
    (url.includes("/dashboard") ||
      url.includes("/invoiceList") ||
      url.includes("/soaList") ||
      url.includes("/paymentStatus") ||
      url.includes("/creditNote") ||
      url.includes("/debitNote") ||
      url.includes("/SelectInvoicesPS"))
  ) {
    return NextResponse.redirect(baseUrl + "/StaffAccess");
  } else if (
    role == "staff" &&
    (url.includes("/editInvoice") ||
    url.includes("/soaAddItem") ||
      url.includes("/creditNote") ||
      url.includes("/debitNote") ||
      url.includes("/SelectInvoicesPS"))
  ) {
    return NextResponse.redirect(baseUrl + "/dashboard");
  }
}
