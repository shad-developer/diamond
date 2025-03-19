import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getLotById, updateLot } from "../../../app/features/lottSlice";

const EditLot = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lotName, setLotName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [dateOfInsert, setDateOfInsert] = useState("");
  const [totalCarats, setTotalCarats] = useState("");
  const [totalCost, setTotalCost] = useState("");

  const { isLoading, isSuccess, lot } = useSelector((state) => state.lott);

  console.log(lot);

  // Fetch lot data when component mounts
  useEffect(() => {
    if (id) {
      dispatch(getLotById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (lot) {
      setLotName(lot?.lotName || "");
      setSupplier(lot?.supplier || "");

      const formattedDate = lot?.dateOfInsert
        ? new Date(lot.dateOfInsert).toISOString().split("T")[0]
        : "";

      setDateOfInsert(formattedDate);
      setTotalCarats(lot?.totalCarats || "");
      setTotalCost(lot?.totalCost || "");
    }
  }, [lot]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      lotName,
      supplier,
      dateOfInsert,
      totalCarats,
      totalCost,
    };

    await dispatch(updateLot({ id, formData }));
    if (isSuccess) {
      navigate("/lots");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Lot Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Lot Name</label>
              <input
                type="text"
                value={lotName}
                onChange={(e) => setLotName(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Lot Name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Supplier</label>
              <input
                type="text"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Supplier Name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Date of Insert</label>
              <input
                type="date"
                value={dateOfInsert}
                onChange={(e) => setDateOfInsert(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Total Carats</label>
              <input
                type="number"
                 step="0.01"
                value={totalCarats}
                onChange={(e) => setTotalCarats(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Total Carats"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Total Cost (€)</label>
              <input
                type="number"
                 step="0.01"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Total Cost"
              />
            </div>

            <div className="col-span-2">
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

export default EditLot;
