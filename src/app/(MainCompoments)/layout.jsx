import Footer from "../_Compontents/Footer/Footer";
import Header from "../_Compontents/Header/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
