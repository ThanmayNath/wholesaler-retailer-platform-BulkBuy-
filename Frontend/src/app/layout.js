import "./globals.css";
import Header from "@src/components/Header/Header";
import Footer from "@src/components/Footer/Footer";
import { Poppins } from "next/font/google";

const montserrat = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "BulKBuy",
  description: "buy anything at a wholesale Rate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
