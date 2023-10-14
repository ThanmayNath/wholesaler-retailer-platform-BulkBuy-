import React from "react";
import Link from "next/link";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Bulk Buy</h4>
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/services">Our Services</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Get Help</h4>
            <ul>
              <li>
                <Link href="/shipping">Shipping</Link>
              </li>
              <li>
                <Link href="/returns">Returns</Link>
              </li>
              <li>
                <Link href="/order-status">Order Status</Link>
              </li>
              <li>
                <Link href="/payment-options">Payment Options</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Shop By Category</h4>
            <ul>
              <li>
                <Link href="/lkmv">Electronics</Link>
              </li>
              <li>
                <Link href="/category/home-appliance">Home Appliance</Link>
              </li>
              <li>
                <Link href="/category/sports">Sports</Link>
              </li>
              <li>
                <Link href="/category/health-wellness">
                  Health And Wellness
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
