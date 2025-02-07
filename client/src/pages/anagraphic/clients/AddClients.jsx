import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addClient, RESET } from "../../../app/features/clientSlice";

const AddClients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess } = useSelector((state) => state.client);
  
  const [formData, setFormData] = useState({
    nominative: "",
    email: "",
    mobilePhone: "",
    telephone: "",
    fax: "",
    piva: "",
    fiscalCode: "",
    cap: "",
    address: "",
    city: "",
    province: "",
    iban: "",
    paymentMode: "",
    customerCredit: "",
    customerStatus: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addClient(formData));
    if (isSuccess) {
      navigate("/clients");
    }
  };


  return (
    <DashboardLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Add Clients</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Nominative
              </label>
              <input
                type="text"
                name="nominative"
                value={formData.nominative}
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
              <label className="block mb-2 text-sm font-medium">
                Mobile Phone
              </label>
              <input
                type="text"
                name="mobilePhone"
                value={formData.mobilePhone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter mobile phone"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Telephone
              </label>
              <input
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter telephone"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Fax</label>
              <input
                type="text"
                name="fax"
                value={formData.fax}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter fax"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">P.iva</label>
              <input
                type="text"
                name="piva"
                value={formData.piva}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter P.iva"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Fiscal Code
              </label>
              <input
                type="text"
                name="fiscalCode"
                value={formData.fiscalCode}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter fiscal code"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">CAP</label>
              <input
                type="text"
                name="cap"
                value={formData.cap}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter CAP"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter address"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter city"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Province</label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter province"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">IBAN</label>
              <input
                type="text"
                name="iban"
                value={formData.iban}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter IBAN"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Payment Mode
              </label>
              <input
                type="text"
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter payment mode"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Customer Credit Set
              </label>
              <input
                type="number"
                name="customerCredit"
                value={formData.customerCredit}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter credit set"
              />
            </div>
            <div>
            <label className="block mb-2 text-sm font-medium">Customer Status</label>
              <select
                name="customerStatus"
                value={formData.customerStatus}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Reset Customer VAT
            </button>
            <div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded mr-3 hover:bg-green-600"
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

export default AddClients;
