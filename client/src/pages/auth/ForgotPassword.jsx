import React, { useState } from "react";
import Header from "../../partials/Header2";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../app/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const {isSuccess} = useSelector((state) => state.auth);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error("Please enter your email address.");
      setLoading(false);
      return;
    }
    await dispatch(forgotPassword(email));
    if (isSuccess) {
      navigate("/reset-password");
    }
  };

  return (
    <>
      <Header changeLanguage={changeLanguage} />
      <div className="flex items-center justify-center mt-24 bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">
          <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
            Forgot Your Password?
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Enter your email address below and we'll send you a OTP to reset
            your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email Address"
                required
                className="w-full h-12 px-4 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white rounded transition duration-300 ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
