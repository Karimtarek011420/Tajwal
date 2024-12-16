import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css'

import "./globals.css";
import { readex } from "@/assets/font";

export const metadata = {
  title: "Tajwal",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <head>
      <link rel="icon"  href="/footerHero.svg" />
      </head>
      <body className={`${readex.className} antialiased`}>{children}</body>
    </html>
  );
}
