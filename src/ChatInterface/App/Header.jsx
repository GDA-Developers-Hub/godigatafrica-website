import React, { useState } from "react";
import { useTheme } from "../Hooks/ThemeProvider";
import { Sun, Moon, User } from "lucide-react";
import logo from "../../assets/logo.png";
import SignupModal from "../Auth/SignupModal";
import LoginModal from "../Auth/LoginModal";
import ForgotPasswordModal from "../Auth/ForgotPasswordModal";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const isLoggedIn = false;

  return (
    <>
      <header className="flex items-center justify-between w-full p-4 shadow bg-white dark:bg-gray-800">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Go Digital</h1>
            <p className="text-sm text-gray-800 dark:text-white opacity-75">
              Digital Marketing Solutions Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {theme === "light" ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <User className="h-6 w-6" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg rounded-md z-200">
                <ul className="py-2">
                  {isLoggedIn ? (
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      Logout
                    </li>
                  ) : (
                    <>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          setActiveModal("login");
                          setDropdownOpen(false);
                        }}
                      >
                        Login
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          setActiveModal("signup");
                          setDropdownOpen(false);
                        }}
                      >
                        Sign Up
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modals */}
      {activeModal === "signup" && <SignupModal onClose={() => setActiveModal(null)} 
         onSwitchToLogin={() => setActiveModal("login")}/>}
      {activeModal === "login" && (
        <LoginModal
          onClose={() => setActiveModal(null)}
          onForgotPassword={() => setActiveModal("forgot")}
        />
      )}
      {activeModal === "forgot" && <ForgotPasswordModal onClose={() => setActiveModal(null)} />}
    </>
  );
};

export default Header;
