import CardCategories from "@src/components/Categories_card/Card";
import Product_card from "@src/components/All_products/Product_card";
import Hero from "@src/components/hero_section/hero";
const page = () => {
  return (
    <>
      <Hero />
      <CardCategories />
      <Product_card />
    </>
  );
};

export default page;
