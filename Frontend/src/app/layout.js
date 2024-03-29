"use client";
import "./globals.css";
import Header from "@src/components/Header/Header";
import Footer from "@src/components/Footer/Footer";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@src/components/Loader/Loading";
import "@fortawesome/fontawesome-free/css/all.css";

export default function MainLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head></head>
      <body>
        {isLoading ? (
          <div className="loader-wrapper">
            <Loader />
          </div>
        ) : (
          <>
            <Header />
            {children}
            <Footer />
            <ToastContainer />
          </>
        )}
      </body>
    </html>
  );
}
