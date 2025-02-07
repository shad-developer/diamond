import React, { useState } from "react";
import Header from "../../partials/Header2";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../app/features/authSlice";

const EmailVerify = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = location;

  const {isSuccess} = useSelector((state) => state.auth);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (index, value) => {
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

    if (verificationCode.length < 6) {
      toast.error("Please enter a valid 6-digit verification code.");
      return;
    }

    setLoading(true);
    setError("");

    await dispatch(verifyEmail({ code: verificationCode }));
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
            Verify Your Email
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Enter the verification code sent to your email.
          </p>
          <form onSubmit={handleSubmit} className="flex justify-center mb-4">
            <div className="flex space-x-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-12 h-12 text-center border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              ))}
            </div>
          </form>
          <button
            onClick={handleSubmit} // Ensure button triggers the handleSubmit
            className={`w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EmailVerify;
