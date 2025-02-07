import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addColor } from "../../../app/features/colorSlice";

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const { isLoading, isSuccess } = useSelector((state) => state.color);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addColor(name));
    if (isSuccess) {
      navigate("/colors");
    }
  };


  return (
    <DashboardLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Add Color</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Color
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Color  "
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 mt-7 rounded mr-3 hover:bg-green-600"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddColor;
