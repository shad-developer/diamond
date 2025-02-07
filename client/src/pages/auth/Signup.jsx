import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../partials/Header2";
import { toast } from "react-toastify";
import { signup } from "../../app/features/authSlice";

const Signup = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const initialState = {
    username: "",
    email: "",
    password: "",
  };

  const { isSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const { username, email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password should be at least 6 characters long");
    }

    const userData = {
      username,
      email,
      password,
    };

    await dispatch(signup(userData));
    if (isSuccess) {
      navigate("/");
    }
  };

  return (
    <>
      <Header changeLanguage={changeLanguage} />
      <div className="flex items-center justify-center mt-20 ">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl transform transition duration-500 ">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
            {t("SIGNUP")}
          </h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-6">
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300"
            >
              {t("SIGNUP")}
            </button>
            <p className="text-sm text-center mt-4 text-gray-600">
              Already Have Account?{" "}
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-700"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
