import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const JEWELLERY_URL = `${BACKEND_URL}/jewellery`;

// add jewellery-rules
const addJewelleryRules = async (formData) => {
  try {
    const response = await axios.post(`${JEWELLERY_URL}/jewellery-rule`, formData, {
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

// get jewellery-rules
const getJewelleryRules = async () => {
  try {
    const response = await axios.get(`${JEWELLERY_URL}/jewellery-rules`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};

// ---------------------------------------------------  jewellery types -------------------------------------------------

// add jewellery types
const addJewelleryTypes = async (formData) => {
  try {
    const response = await axios.post(`${JEWELLERY_URL}/jewellery-type`, formData, {
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


// add jewellery types
const getJewelleryTypes = async () => {
  try {
    const response = await axios.get(`${JEWELLERY_URL}/jewellery-types`, {
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


// get type by id
const getJewelleryTypeById = async (typeId) => {
  try {
    const response = await axios.get(`${JEWELLERY_URL}/jewellery-type/${typeId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};


// update type

const updateJewelleryType = async (typeId, formData) => {
  try {
    const response = await axios.put(`${JEWELLERY_URL}/jewellery-type/${typeId}`, formData, {
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


// delete jewellery type

const deleteJewelleryType = async (typeId) => {
  try {
    const response = await axios.delete(`${JEWELLERY_URL}/jewellery-type/${typeId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};


const jewelleryService = {
  addJewelleryRules,
  getJewelleryRules,
  addJewelleryTypes,
  getJewelleryTypes,
  getJewelleryTypeById,
  updateJewelleryType,
  deleteJewelleryType
};

export default jewelleryService;
