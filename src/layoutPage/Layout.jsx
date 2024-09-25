import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <div className="md:flex">
      <header className="lg:w-[17%] w-full  bg-black h-[130px] md:h-auto">
        {pathname !== "/auth" ? <Sidebar /> : null}
      </header>

      <main className="min-h-screen px-2 lg:w-[56%] w-full">
        <Outlet />
      </main>
      <footer className="hidden md:block lg:w-[27%] w-full p">
        {pathname !== "/auth" ? <Footer /> : null}
      </footer>
    </div>
  );
};

export default Layout;
