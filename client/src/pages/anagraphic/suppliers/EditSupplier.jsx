import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import SupplierForm from "../../../components/forms/SupplierForm";
import { getSupplierById, updateSupplier } from "../../../app/features/supplierSlice";

const initialState = {
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
};

const EditSupplier = () => {

  const [formData, setFormData] = useState(initialState);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { supplier, isLoading, isSuccess } = useSelector((state) => state.supplier);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (id) {
      dispatch(getSupplierById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (supplier) {
      setFormData({
        nominative: supplier.nominative,
        email: supplier.email,
        mobilePhone: supplier.mobilePhone,
        telephone: supplier.telephone,
        fax: supplier.fax,
        vatNo: supplier.vatNo,
        taxCode: supplier.taxCode,
        cap: supplier.cap,
        address: supplier.address,
        city: supplier.city,
        province: supplier.province,
        iban: supplier.iban,
        paymentMode: supplier.paymentMode,
      });
    }
  }, [supplier]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(updateSupplier({ id, formData }));
 
    console.log("check")
    if (isSuccess) {
      navigate("/suppliers");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Modify Supplier</h2>
              <SupplierForm handleSubmit={handleSubmit} handleChange={handleChange}  formData={formData} isLoading={isLoading}/>
      </div>
    </DashboardLayout>
  );
};

export default EditSupplier;
