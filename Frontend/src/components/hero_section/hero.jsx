import ScrollReveal from "../ScrollReveal";
import Link from "next/link";
import Image from "next/image";
// its css is given from page.css main

const hero = () => {
  return (
    <>
      <div className="main_div">
        <div className="inner_div">
          <div className="info_div">
            <ScrollReveal duration={800} distance="50px" origin="left">
              <div className="main_heading">
                <h2>Your One-Stop Wholesale Destination</h2>
              </div>
              <div className="sub_heading">
                <p>
                  Empowering businesses with effortless wholesale purchasing,
                  exclusive deals, and savings. Streamline your sourcing process
                  with BulkBuy.
                </p>
              </div>
              <div className="browse_bottom">
                <Link href="/product">Browse Product</Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="image_div">
            <Image src="/31602.png" width={750} height={500} />
          </div>
        </div>
      </div>
    </>
  );
};

export default hero;
