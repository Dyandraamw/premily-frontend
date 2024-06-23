import { Inter } from "next/font/google";
import "./styles/globals.css";
import Sidebar from "./components/sidebar";
import {Metadata} from "next"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Premily",
  description: "Premily app",
  icons: {
    icon: '/Premily-White.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
