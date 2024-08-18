import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const sarabun = Sarabun({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Calculate App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sarabun.className}>
        <Header />
        <div className="sm:m-5 m-2">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
