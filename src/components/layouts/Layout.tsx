import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-brand-black font-satoshi">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
