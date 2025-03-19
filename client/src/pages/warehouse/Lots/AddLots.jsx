import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getSuppliers } from "../../../app/features/supplierSlice";
import { addNewLot } from "../../../app/features/lottSlice";

const AddLots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    dateOfInsert: "",
    supplier: "",
    totalCost: "",
    totalCarats: "",
    caratsPaid: "",
  });

  const { suppliers, isLoading } = useSelector((state) => state.supplier);
  // const { isSuccess } = useSelector((state) => state.lott);

  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { dateOfInsert, supplier, totalCost, totalCarats, caratsPaid } = formData;

    if (!dateOfInsert || !supplier || !totalCost || !totalCarats || !caratsPaid) {
      toast.error("Please fill all the fields.");
      return;
    }

    dispatch(addNewLot(formData));
    navigate('/lots');
  };


  const getCurrentFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`; 
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      dateOfInsert: getCurrentFormattedDate(),
    }));
  }, []); // Empty dependency array ensures it runs only once

  return (
    <DashboardLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Add Lots</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">SUPPLIER</label>
              <select
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Supplier</option>
                {suppliers?.map((sup) => (
                  <option key={sup?._id} value={sup?.nominative}>
                    {sup?.nominative}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">DATE OF INSERT</label>
              <input
                type="date"
                name="dateOfInsert"
                value={formData.dateOfInsert}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">TOTAL COST</label>
              <input
                type="number"
                 step="0.01"
                min={0}
                name="totalCost"
                value={formData.totalCost}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Total Cost"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">TOTAL CARATS</label>
              <input
                type="number"
                 step="0.01"
                min={0}
                name="totalCarats"
                value={formData.totalCarats}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Total Carats"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">CARATS PAID</label>
              <input
                type="number"
                 step="0.01"
                min={0}
                name="caratsPaid"
                value={formData.caratsPaid}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Carats Paid"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-green-500 text-white px-10 py-2 mt-7 rounded mr-3 hover:bg-green-600"
                disabled={isLoading}
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

export default AddLots;
