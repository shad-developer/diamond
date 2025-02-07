import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const SUPPLIER_URL = `${BACKEND_URL}/supplier`;

// add suppliers
const addSupplier = async (formData) => {
  try {
    const response = await axios.post(`${SUPPLIER_URL}/add-supplier`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};

// get suppliers
const getSuppliers = async () => {
  try {
    const response = await axios.get(`${SUPPLIER_URL}/suppliers`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};

// get supplier by id
const getSupplierById = async (supplierId) => {
  try {
    const response = await axios.get(`${SUPPLIER_URL}/supplier/${supplierId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};


// update supplier

const updateSupplier = async (supplierId, formData) => {
  try {
    const response = await axios.put(`${SUPPLIER_URL}/supplier/${supplierId}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};


// delete supplier

const deleteSupplier = async (supplierId) => {
  try {
    const response = await axios.delete(`${SUPPLIER_URL}/supplier/${supplierId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};


const supplierService = {
  addSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
  
};

export default supplierService;
