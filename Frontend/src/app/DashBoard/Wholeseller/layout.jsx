"use client"
import WholesellerHeader from "@src/components/WholesellerHeader/wholesellerHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "@src/app/Login/page";
import { useState,useEffect } from "react";
import { isAuthenticated } from "@src/utils/auth";
export default function RootLayout({ children }) {

  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
   const isAuthenticatedUser = isAuthenticated();
   setAuthenticated(isAuthenticatedUser);

   if (!isAuthenticatedUser) {
     window.location.replace("/Login"); // Replace with the actual login page URL
   }
 }, []);

 if (!authenticated) {
   return <Login />;
 }

  return (
    <>
      <WholesellerHeader />
      <ToastContainer />
      {children}
    </>
  );
}
