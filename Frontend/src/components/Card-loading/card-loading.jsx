import React from "react";
import "./card-loading.css";
import Link from "next/link";
const cardloading = () => {
  return (
    <>
      <div className="cardloadermain">
        <h1>Popular Product</h1>
        <div className="cardloader">
          <div class="card-loader">
            <div class="card__skeleton"></div>
            <div class="card__title">
              <div class="cardname"></div>
              <div class="cardprice"></div>
            </div>
            <div class="card__description"></div>
          </div>
          <div class="card-loader">
            <div class="card__skeleton"></div>
            <div class="card__title">
              <div class="cardname"></div>
              <div class="cardprice"></div>
            </div>
            <div class="card__description"></div>
          </div>
          <div class="card-loader">
            <div class="card__skeleton"></div>
            <div class="card__title">
              <div class="cardname"></div>
              <div class="cardprice"></div>
            </div>
            <div class="card__description"></div>
          </div>
          <div class="card-loader">
            <div class="card__skeleton"></div>
            <div class="card__title">
              <div class="cardname"></div>
              <div class="cardprice"></div>
            </div>
            <div class="card__description"></div>
          </div>
          <div class="card-loader">
            <div class="card__skeleton"></div>
            <div class="card__title">
              <div class="cardname"></div>
              <div class="cardprice"></div>
            </div>
            <div class="card__description"></div>
          </div>
          <div class="card-loader">
            <div class="card__skeleton"></div>
            <div class="card__title">
              <div class="cardname"></div>
              <div class="cardprice"></div>
            </div>
            <div class="card__description"></div>
          </div>
          <div class="card-loader">
            <div class="card__skeleton"></div>
            <div class="card__title">
              <div class="cardname"></div>
              <div class="cardprice"></div>
            </div>
            <div class="card__description"></div>
          </div>
          <div class="card-loader">
            <div class="card__skeleton"></div>
            <div class="card__title">
              <div class="cardname"></div>
              <div class="cardprice"></div>
            </div>
            <div class="card__description"></div>
          </div>
        </div>
        <div className="upperoverlay">
          <div className="upperdiv">
            <div className="upperheading">
              <h3>Login To View Product</h3>
            </div>
            <div className="buttontologin">
              <Link href="/Login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default cardloading;
