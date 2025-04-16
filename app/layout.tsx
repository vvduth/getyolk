import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import "./globals.css";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Get Yolk",
  description: "Summer body is so easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <ConvexClerkProvider>
     <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <div className="fixed inset-0 -z-1">
            <div className="absolute inset-0"></div>
            <div className="absolute inset-0"></div>
          </div>
        <main className="pt-24 pr-24 pl-24 flex-grow">
        {children}
        </main>
        <Footer/>
      </body>
    </html>
   </ConvexClerkProvider>
  );
}
