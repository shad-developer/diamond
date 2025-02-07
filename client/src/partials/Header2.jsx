import React, { useState } from "react";
import SearchModal from "../components/ModalSearch";
import Notifications from "../components/DropdownNotifications";
import UserMenu from "../components/DropdownProfile";
import { useTranslation } from "react-i18next";
import Logo from "../images/logo.webp";

function Header({
  sidebarOpen,
  setSidebarOpen,
  variant = "default",
  changeLanguage,
}) {
  const { t, i18n } = useTranslation();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  // Define available languages
  const languages = [
    { code: "en", name: "English" },
    { code: "it", name: "Italian" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
  ];

  const currentLanguage = i18n.language;

  return (
    <header className="sticky top-0 bg-white shadow-md  ">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-24`}>
          {/* Header: Left side */}
          <a href="/dashboard">
            <img src={Logo} alt="Logo" className="h-20 w-52" />
          </a>
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
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
