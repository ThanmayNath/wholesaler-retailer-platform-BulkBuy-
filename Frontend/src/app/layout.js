"use client";
import "./globals.css";
import Header from "@src/components/Header/Header";
import Footer from "@src/components/Footer/Footer";
import { useState, useEffect } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainLayout({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Add your meta tags, title, and other head elements here */}
      </head>
      <body>
        {isLoading ? (
          <div className="loader-wrapper">
            <ClimbingBoxLoader color="#3A2794" loading={isLoading} size={50} />
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
