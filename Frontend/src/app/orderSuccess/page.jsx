"use client";
import React from "react";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./ordersuccess.css";
import Image from "next/image";

function page() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("orderId");
      router.push("/");
    }, 5000);
  }, []);

  setTimeout(() => {
    onClick();
  }, 1000);

  function onClick() {
    confetti({
      particleCount: 450,
      spread: 130,
    });
  }
  return (
    <div className="success_home">
      <div className="success_info">
        <h2 className="center">
          Thank you for selecting BulkBuy as your wholesale shopping
          destination.
        </h2>
        <h3 className="order_id">
          Order Id : <span>{localStorage.getItem("orderId")}</span>{" "}
        </h3>
      </div>
      <button className="buttonsuccess">
        <span className="order_placed"> Order Placed</span>
        <Image src={"/order.png"} width={30} height={30}></Image>
      </button>
    </div>
  );
}
export default page;
