import axios from "axios";
import { BACKEND_URL } from "../../utils/url.js";

export const LOTT_URL = `${BACKEND_URL}/lots`;

// add Lott
const addNewLot = async (formData) => {
  try {
    const response = await axios.post(`${LOTT_URL}/add-lot`, formData, {
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

// // get lots
const getAllLots = async () => {
  try {
    const response = await axios.get(`${LOTT_URL}/lotts`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};

// // get Lot by id
const getLotById = async (lotId) => {
  try {
    const response = await axios.get(`${LOTT_URL}/lot/${lotId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};


// // update stone

const updateLot = async (lotId, formData) => {
  try {
    const response = await axios.put(`${LOTT_URL}/lot/${lotId}`, formData, {
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


// // delete lott

const deleteLott = async (lotId) => {
  try {
    const response = await axios.delete(`${LOTT_URL}/lot/${lotId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};



const lottService = {
    addNewLot,
    getAllLots,
  getLotById,
  updateLot,
  deleteLott
};

export default lottService;
