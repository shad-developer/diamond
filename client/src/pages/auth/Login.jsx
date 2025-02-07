import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../partials/Header2";
import { login } from "../../app/features/authSlice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <>
      <Header changeLanguage={changeLanguage} />
      <div className="flex items-center justify-center mt-20">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl transform transition duration-500">
          <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">
            {t("Login")}
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <input
                type="email"
                name="email"
                placeholder={t("Email")}
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
                placeholder={t("Password")}
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
              {t("Login")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
