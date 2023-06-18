"use client";
import React, { useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import cardData from "@src/app/utils/Products";
import Image from "next/image";
import "swiper/swiper-bundle.min.css";
import "../app/page.css";

SwiperCore.use([Navigation, Autoplay]);

const Card = () => {
  useEffect(() => {
    const swiper = new SwiperCore(".mySwiper", {
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
    <div className="categories_main">
      <FiChevronRight className="right_arrow swiper-button-next" />
      <Swiper
        className="card_div mySwiper"
        slidesPerView={3}
        spaceBetween={30}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {cardData.map((card, index) => (
          <SwiperSlide key={index} className="card">
            <div className="card_maintext">
              <h2>{card.title}</h2>
            </div>
            <div className="card_text">{card.description}</div>
            <div className="card_button">
              <Link href="/shop">View Products</Link>
            </div>
            <div className="card_image">
              <Image
                src={card.imageurl}
                width={170}
                height={120}
                alt="Card Image"
                className="img"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <FiChevronLeft className="left_arrow swiper-button-prev" />
    </div>
  );
};

export default Card;
