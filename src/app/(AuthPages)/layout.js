import { Inter } from "next/font/google";
import "../styles/globals.css";


const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({ children }) {
  return (
    <div className="flex w-screen overflow-hidden h-screen">{children}</div>
  );
}
