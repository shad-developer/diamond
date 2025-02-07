import React, { useState, useEffect } from "react";
import SearchModal from "../components/ModalSearch";
import Notifications from "../components/DropdownNotifications";
import UserMenu from "../components/DropdownProfile";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from './../app/features/authSlice';

function Header({
  sidebarOpen,
  setSidebarOpen,
  variant = "default",
  changeLanguage,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // Define available languages
  const languages = [
    { code: "en", name: "English" },
    { code: "it", name: "Italian" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
  ];

  const currentLanguage = i18n.language;



  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  
  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
    // toast.success("Logged Out Successfully");
  };



  return (
    <header className={`sticky top-0 bg-white shadow-md z-10 `}>
      {" "}
      {/* Your existing header styles */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16`}>
          {/* Header: Left side */}
          <div className="flex gap-5">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

            <h1 className="font-bold">{t("Dashboard")}</h1>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                className="flex items-center justify-between w-24 h-10 bg-gray-200 dark:bg-gray-800 rounded-md px-2"
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                aria-haspopup="true"
              >
                <span>
                  {languages.find((lang) => lang.code === currentLanguage)
                    ?.name || "Language"}
                </span>
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
                </svg>
              </button>
              {languageDropdownOpen && (
                <ul className="absolute z-10 mt-2 w-24 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        changeLanguage(lang.code);
                        setLanguageDropdownOpen(false);
                      }}
                    >
                      {lang.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <button
                className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full ml-3 ${
                  searchModalOpen && "bg-gray-200 dark:bg-gray-800"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchModalOpen(true);
                }}
                aria-controls="search-modal"
              >
                <span className="sr-only">Search</span>
                <svg
                  className="fill-current text-gray-500/80 dark:text-gray-400/80"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z" />
                  <path d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z" />
                </svg>
              </button>
              <SearchModal
                id="search-modal"
                searchId="search"
                modalOpen={searchModalOpen}
                setModalOpen={setSearchModalOpen}
              />
            </div>
            <Notifications align="right" />
            <hr className="w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
            <UserMenu align="right"  user={user} handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
