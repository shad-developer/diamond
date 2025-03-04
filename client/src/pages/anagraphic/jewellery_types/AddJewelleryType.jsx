import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addJewelleryTypes } from "../../../app/features/jewellerySlice";

const AddJewelleryType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const { isLoading, isSuccess } = useSelector((state) => state.jewellery);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type || !description) {
      toast.error("Please fill all the fields.");
      return;
    }

    const formData = {
      type,
      description,
    };

    await dispatch(addJewelleryTypes(formData));
    if (isSuccess) {
      navigate("/jewellery-type");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Add Jewellery Type</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Description"
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

export default AddJewelleryType;
