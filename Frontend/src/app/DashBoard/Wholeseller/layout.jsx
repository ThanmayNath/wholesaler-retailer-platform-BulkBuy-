import WholesellerHeader from "@src/components/WholesellerHeader/wholesellerHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <>
      <WholesellerHeader />
      <ToastContainer />
      {children}
    </>
  );
}
