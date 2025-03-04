import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  getJewelleryTypeById,
  updateJewelleryType,
} from "../../../app/features/jewellerySlice";
import { toast } from "react-toastify";

const EditJewelleryType = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const { isLoading, isSuccess, jewelleryType } = useSelector(
    (state) => state.jewellery
  );

  // Fetch jewellery type data when component mounts
  useEffect(() => {
    if (id) {
      dispatch(getJewelleryTypeById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (jewelleryType) {
      setType(jewelleryType?.type || "");
      setDescription(jewelleryType?.description || "");
    }
  }, [jewelleryType]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { type, description };

    await dispatch(updateJewelleryType({  id, formData }));
    if (isSuccess) {
      navigate("/jewellery-type");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Modify Jewellery Type</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Type"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Description"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 mt-7 rounded hover:bg-green-600"
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

export default EditJewelleryType;
