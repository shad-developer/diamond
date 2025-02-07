import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addSupplier } from "../../../app/features/supplierSlice";
import SupplierForm from "../../../components/forms/SupplierForm";

const AddSupplier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess } = useSelector((state) => state.supplier);

  const [formData, setFormData] = useState({
    nominative: "",
    email: "",
    mobilePhone: "",
    telephone: "",
    fax: "",
    vatNo: "",
    taxCode: "",
    cap: "",
    address: "",
    city: "",
    province: "",
    iban: "",
    paymentMode: "",
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addSupplier(formData));
    if (isSuccess) {
      navigate("/suppliers");
    }
    
  };

  return (
    <DashboardLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Add Suppliers</h2>
        <SupplierForm handleSubmit={handleSubmit} handleChange={handleChange}  isLoading={isLoading}/>
      </div>
    </DashboardLayout>
  );
};

export default AddSupplier;
