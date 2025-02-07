import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../../app/features/authSlice";

const initialState = {
  username : "",
  email: "",
  password: "",
  status:"",
};

const UpdateUser = () => {
  
  const [formData, setFormData] = useState(initialState);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setFormData({
        username : user.username,
        email: user.email,
        password: user.password,
        status:user.status
      });
    }
  }, [user]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(updateUser({ id, formData }));
    if (isSuccess) {
      navigate("/users");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Modify Users</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded mr-3 hover:bg-green-600"
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default UpdateUser;
