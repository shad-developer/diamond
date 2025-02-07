import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { addNewUser } from "../../../app/features/authSlice";
import DashboardLayout from "../../../components/common/DashboardLayout";

const AddUser = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const initialState = {
    username: "",
    email: "",
    password: "",
    };

  const { isSuccess, isLoading } = useSelector((state) => state.auth);
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

      await dispatch(addNewUser(userData));
      
          navigate("/users");
      
  };


  return (
    <>
     <DashboardLayout>
     <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Add User Login</h2>
        <form onSubmit={handleSignUp}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Email"
              />
              </div>
              
              <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="text"
                name="password"
                value={password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Password"
              />
            </div>

          </div>

         
            <div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded  mt-4 mr-3 hover:bg-green-600"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
         
        </form>
      </div>
        </DashboardLayout>
    </>
  );
};

export default AddUser;
