import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getColorById, updateColor } from "../../../app/features/colorSlice";

const EditColor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const { color, isLoading, isSuccess } = useSelector(
    (state) => state.color
  );

  useEffect(() => {
    if (id) {
      dispatch(getColorById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (color) {
      setName(color?.name);
    }
  }, [color]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(updateColor({ id, name }));
    if (isSuccess) {
      navigate("/colors");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Modify Color</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Color</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Color"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 mt-7 rounded mr-3 hover:bg-green-600"
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

export default EditColor;
