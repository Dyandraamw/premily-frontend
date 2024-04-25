import { Inter } from "next/font/google";
import "./styles/globals.css";
import Sidebar from "./components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex w-screen ">
          <Sidebar/>
          <div className=" w-[82%] bg-gray-150 overflow-y-auto">
          {children}
          </div>
        </main>

      </body>
    </html>
  );
}
