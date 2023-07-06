"use client";
import React, { useState, useEffect } from "react";
import CardCategories from "@src/components/Categories_card/Card";
import Product_card from "@src/components/All_products/Product_card";
import Hero from "@src/components/hero_section/hero";
import CardLoading from "@src/components/Card-loading/card-loading";

const Page = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("userName");
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  return (
    <>
      <Hero />
      <CardCategories />
      {userName ? <Product_card /> : <CardLoading />}
    </>
  );
};

export default Page;
