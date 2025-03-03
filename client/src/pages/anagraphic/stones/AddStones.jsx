import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Grades, Proportion } from "../../../components/common/data";
import { getColors } from "../../../app/features/colorSlice";
import { addStone } from "../../../app/features/stoneSlice";

const AddStones = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, stones } = useSelector((state) => state.stone);
  const { colors } = useSelector((state) => state.color);

  const [formData, setFormData] = useState({
    certificateNo: "",
    cuts: "BRILLANTE",
    carats: "",
    degrees: "",
    color: "",
    proportions: "",
    finish: "",
    brilliance: "",
    fluorescence: "",
    price_per_carat: "",
    finished_stone_price: "",
    public_price: "",
    note: "",
    average: "",
    costs: "",
    finished_cost: "",
    total_compl: "",
  });

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch add stone
    await dispatch(addStone(formData));

    if (isSuccess) {
      navigate("/large-stones");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Add Stone</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                CERTIFICATE NO.
              </label>
              <input
                type="text"
                name="certificateNo"
                value={formData.certificateNo}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter certificate number"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">CUT</label>
              <input
                type="text"
                name="cuts"
                value={formData.cuts}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter cut type"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">CARATS</label>
              <input
                type="text"
                name="carats"
                value={formData.carats}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter Carats"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">DEGREES</label>
              <select
                name="degrees"
                value={formData.degrees}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option disabled>Select Degree</option>
                {Grades?.map((grade) => (
                  <option key={grade?.id} value={grade?.value}>
                    {grade?.value}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">COLORS</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option disabled>Select Colors</option>
                {colors?.map((color) => (
                  <option key={color?.id} value={color?.name}>
                    {color?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                PROPORTIONS
              </label>
              <select
                name="proportions"
                value={formData.proportions}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option disabled>Select Proportion</option>
                {Proportion?.map((pro) => (
                  <option key={pro?.id} value={pro?.value}>
                    {pro?.value}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">FINISH</label>
              <select
                name="finish"
                value={formData.finish}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option disabled>Select Finish</option>
                {Proportion?.map((pro) => (
                  <option key={pro?.id} value={pro?.value}>
                    {pro?.value}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                BRILLIANCE
              </label>
              <select
                name="brilliance"
                value={formData.brilliance}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option disabled>Select Brilliance</option>
                {Proportion?.map((pro) => (
                  <option key={pro?.id} value={pro?.value}>
                    {pro?.value}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                FLUORESCENCE
              </label>
              <select
                name="fluorescence"
                value={formData.fluorescence}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="nothing">Nothing</option>
                <option value="strong">Strong</option>
                <option value="average">Average</option>
                <option value="weak">Weak</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                PRICE PER CARAT
              </label>
              <input
                type="text"
                name="price_per_carat"
                value={formData.price_per_carat}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter price per carat"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                FINISHED STONE PRICE
              </label>
              <input
                type="text"
                name="finished_stone_price"
                value={formData.finished_stone_price}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter finished stone price"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                PUBLIC PRICE
              </label>
              <input
                type="text"
                name="public_price"
                value={formData.public_price}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter public price"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">AVERAGE</label>
              <input
                type="text"
                name="average"
                value={formData.average}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter average"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                COST IN $
              </label>
              <input
                type="text"
                name="costs"
                value={formData.costs}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter cost in $"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                FINISHED COST IN $
              </label>
              <input
                type="text"
                name="finished_cost"
                value={formData.finished_cost}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter finished cost"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                TOTAL COMPL. IN $
              </label>
              <input
                type="text"
                name="total_compl"
                value={formData.total_compl}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter total completed"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="block mb-2 text-sm font-medium">NOTE</label>
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter note"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-12 py-2 rounded mr-3 hover:bg-green-600"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddStones;
