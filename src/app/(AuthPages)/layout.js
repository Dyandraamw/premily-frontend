import { Inter } from "next/font/google";
import "../styles/globals.css";
import Sidebar from "../components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <div className="flex w-screen overflow-hidden h-screen">{children}</div>
  );
}
