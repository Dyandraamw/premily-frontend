export default function middleware(req) {
  let verify = req.cookies.get("jwtToken");
  let url = req.url;

  if (!verify && url.includes("/dashboard")) {
    return res.redirect("http://localhost:3000/");
  }

  if (verify && url ==== "http://localhost:3000/" && userRole === "admin") {
    return res.redirect("http://localhost:3000/dashboard");
  }

  if (verify && url ==== "http://localhost:3000/" && userRole === "staff") {
    return res.redirect("http://localhost:3000/dashboard");
  }
}
