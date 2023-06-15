"use client";
import React, { useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import cardData from "../app/Data.js";
import Image from "next/image";
import "swiper/swiper-bundle.min.css";
import "./Discount.css";

SwiperCore.use([Navigation, Autoplay]);

const Discount = () => {
  useEffect(() => {
    const swiper = new SwiperCore(".productSwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }, []);

  return (
    <div className="Products">
      <div className="discount_div">
        <div className="discount_main">
          <div className="heading">
            <h2>View Products</h2>
          </div>
          <div className="view_more">View All Products</div>
        </div>
        </div>
        <div className="Product_card">
          <div className="card_div">
            <FiChevronRight className="right_key swiper-next" />
            <FiChevronLeft className="left_key swiper-prev" />
          </div>
        </div>
      </div>

  );
};

export default Discount;
