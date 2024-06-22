export default function middleware(req) {
  let token = req.cookies.getAll();
  let url = req.url;
  const baseUrl = "http://localhost:3000/";

  if (!token && url.includes("/dashboard")) {
    return res.redirect(baseUrl + "SignIn");
  }

  let role = req.cookies.get("userRole");

  if (role === "admin" || role === "staff") && url.includes("/profile") || url.includes("/StaffAccess") {
    return res.redirect(baseUrl + "dashboard");
  }
}
