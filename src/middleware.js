import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { NextResponse,  NextRequest } from "next/server"

export default function middleware(req) {
    let token = req.cookies.get("jwtToken")
    
    let url = req.url

    //console.log(token)
    if(!token && url.includes('/dashboard')){
        return NextResponse.redirect("http://localhost:3000/SignIn")
    }

    // let role = Cookies.get("userRole")
    // // const tokenVal = jwtDecode(token)
    // if( role=="admin" && url.includes('/invoiceList')){
    //      return NextResponse.redirect("http://localhost:3000/dashboard")
    //     // console.log(true)
    // }
}

