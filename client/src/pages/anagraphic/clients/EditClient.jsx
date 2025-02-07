import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { toast } from "react-toastify";
import { getClientById, updateClient } from "../../../app/features/clientSlice";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
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
};

const EditClient = () => {
  const [formData, setFormData] = useState(initialState);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { client, isLoading, isSuccess } = useSelector((state) => state.client);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (id) {
      dispatch(getClientById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (client) {
      setFormData({
        nominative: client.nominative,
        email: client.email,
        mobilePhone: client.mobilePhone,
        telephone: client.telephone,
        fax: client.fax,
        piva: client.piva,
        fiscalCode: client.fiscalCode,
        cap: client.cap,
        address: client.address,
        city: client.city,
        province: client.province,
        iban: client.iban,
        paymentMode: client.paymentMode,
        customerCredit: client.customerCredit,
        customerStatus: client.customerStatus,
      });
    }
  }, [client]);

  const resetVAT = () => {
    setFormData({ ...formData, piva: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(updateClient({ id, formData }));
    if (isSuccess) {
      navigate("/clients");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Modify Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label className="block mb-2 text-sm font-medium">
                Customer Status
              </label>
              <select
                name="customerStatus"
                value={formData.customerStatus}
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
            <button
              type="button"
              onClick={resetVAT}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Reset Customer VAT
            </button>
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

export default EditClient;
