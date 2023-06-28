import WholesellerHeader from "@src/components/WholesellerHeader/wholesellerHeader";

export default function RootLayout({ children }) {
  return (
    <>
      <WholesellerHeader />
      {children}
    </>
  );
}
