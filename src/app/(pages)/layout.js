import { Inter } from "next/font/google";
import "../styles/globals.css";
import Sidebar from "../components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <div className="flex w-screen overflow-hidden h-screen">
      <Sidebar />
      <div className=" w-[82%] bg-[#F3F4F8] overflow-y-auto ">{children}</div>
    </div>
  );
}
