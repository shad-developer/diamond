import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { addJewelleryRules, getJewelleryRules } from "../../../app/features/jewellerySlice";

const JewelleryRules = () => {
  const dispatch = useDispatch();

  const { isLoading, isSuccess, JewellreyRules } = useSelector((state) => state.jewellery);

  const [formData, setFormData] = useState({
    pureHoursQuotation: "",
    drop: "",
    fixedExpenses: "",
    sideSettingSingleStone: "",
    centralSettingSingleStone: "",
    publicPrice: "",
  });

  
  useEffect(() => {
    dispatch(getJewelleryRules());
  }, [dispatch]);

  // Populate form when data is loaded
  useEffect(() => {
    if (JewellreyRules) {
      setFormData(JewellreyRules);
    }
  }, [JewellreyRules]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addJewelleryRules(formData));
  };

  return (
    <DashboardLayout>
      <div className="mx-auto p-4 sm:p-6">
        <h1 className="font-bold text-2xl">JEWELLERY RULES</h1>
        <div className="mb-6 mt-5 border-t-2 pt-2">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="font-semibold w-1/2 md:w-1/3">
                  PURE HOURS QUOTATION
                </td>
                <td className="w-2/3">
                  <input
                    type="text"
                    name="pureHoursQuotation"
                    placeholder="pure hours quotation"
                    value={formData.pureHoursQuotation}
                    onChange={handleChange}
                    className="border p-2 rounded w-full md:w-1/2"
                  />
                </td>
              </tr>
              <tr>
                <td className="font-semibold">DROP</td>
                <td>
                  <input
                    type="text"
                    name="drop"
                    placeholder="drop"
                    value={formData.drop}
                    onChange={handleChange}
                    className="border p-2 rounded w-full md:w-1/2"
                  />
                </td>
              </tr>
              <tr>
                <td className="font-semibold">FIXED EXPENSES</td>
                <td>
                  <input
                    type="text"
                    name="fixedExpenses"
                    placeholder="fixed expenses"
                    value={formData.fixedExpenses}
                    onChange={handleChange}
                    className="border p-2 rounded w-full md:w-1/2"
                  />
                </td>
              </tr>
              <tr>
                <td className="font-semibold">SIDE SETTING FOR SINGLE STONE</td>
                <td>
                  <input
                    type="text"
                    name="sideSettingSingleStone"
                    placeholder="side setting for single stone"
                    value={formData.sideSettingSingleStone}
                    onChange={handleChange}
                    className="border p-2 rounded w-full md:w-1/2"
                  />
                </td>
              </tr>
              <tr>
                <td className="font-semibold">
                  CENTRAL SETTING FOR SINGLE STONE
                </td>
                <td>
                  <input
                    type="text"
                    name="centralSettingSingleStone"
                    placeholder="central setting for single stone"
                    value={formData.centralSettingSingleStone}
                    onChange={handleChange}
                    className="border p-2 rounded w-full md:w-1/2"
                  />
                </td>
              </tr>
              <tr>
                <td className="font-semibold">PUBLIC PRICE</td>
                <td>
                  <input
                    type="text"
                    name="publicPrice"
                    placeholder="public price"
                    value={formData.publicPrice}
                    onChange={handleChange}
                    className="border p-2 rounded w-full md:w-1/2"
                  />
                </td>
              </tr>
              <tr>
                <td className="font-semibold"></td>
                <td>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-6 mt-2 py-2 rounded flex items-center"
                  >
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JewelleryRules;
