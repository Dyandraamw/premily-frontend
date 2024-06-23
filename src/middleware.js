import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { NextResponse, NextRequest } from "next/server";

export default function middleware(req) {
  let token = req.cookies.get("jwtToken");
  let roleValid = req.cookies.get("userRole");

  let url = req.url;
  const baseUrl = "https://premily-app.vercel.app/";

  //console.log(token)
  if (
    !token &&
    (url.includes("/dashboard") ||
      url.includes("/invoiceList") ||
      url.includes("/soaList") ||
      url.includes("/paymentStatus") ||
      url.includes("/creditNote") ||
      url.includes("/debitNote") ||
      url.includes(
        "/SelectInvoicesPS" 
          
      )||url.includes("/ProfileUser") ||
      url.includes("/StaffAccess"))
  ) {
    return NextResponse.redirect(baseUrl + "/SignIn");
  } else if (token) {
    let role = req.cookies.get("userRole");

    //admin and staff banned dari access-control
    if (
      (role.value == "admin" || role.value == "staff") &&
      (url.includes("/StaffAccess"))
    ) {
      return NextResponse.redirect(baseUrl + "/dashboard");
    } else if (
      role.value == "access_control" &&
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
      role.value == "staff" &&
      (url.includes("/editInvoice") ||
        url.includes("/soaAddItem") ||
        url.includes("/creditNote") ||
        url.includes("/debitNote") ||
        url.includes("/SelectInvoicesPS"))
    ) {
      return NextResponse.redirect(baseUrl + "/dashboard");
    }
  }
  // else if(!roleValid && url=="http://localhost:3000/"){
  //   return NextResponse.redirect(baseUrl + "/SignIn");
  // }else if (roleValid) {

  // }
}
