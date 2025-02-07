import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";

const DashboardLayout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header
            changeLanguage={changeLanguage}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="grow">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Dashboard actions */}

              {children}
            </div>
          </main>

          <Footer/>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
