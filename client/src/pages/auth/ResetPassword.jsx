import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Header from "../../partials/Header2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../app/features/authSlice";

const ResetPassword = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {isSuccess} = useSelector((state) => state.auth);

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < code.length - 1) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length < code.length) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    const data = {
      code: verificationCode,
      password: newPassword,
    };

    await dispatch(resetPassword(data));
    if (isSuccess) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Header changeLanguage={changeLanguage} />
      <div className="flex items-center justify-center mt-24 bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl transform transition duration-500">
          <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
            Reset Password
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Enter the OTP sent to your email and set a new password.
          </p>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex justify-center mb-4 space-x-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-12 h-12 text-center border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              ))}
            </div>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-12 border border-indigo-500 rounded px-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="New Password"
                required
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8-8 3.582-8 8z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12h3m-3 0H9m6 0H9m3 0v3m0-3v-3m0 6v3m0-6H9m0 0V9m0 3H3m6 0H3m3 0H6"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8-8 3.582-8 8z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.875 18.825a9.95 9.95 0 01-1.484.175c-4.418 0-8-3.582-8-8a9.95 9.95 0 011.175-4.625M12 6.75v3.75m0 0H9m3 0h3"
                    />
                  </svg>
                )}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
