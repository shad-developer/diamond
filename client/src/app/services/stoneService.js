import axios from "axios";
import { BACKEND_URL } from "../../utils/url.js";

export const STONE_URL = `${BACKEND_URL}/stone`;

// add Stone
const addStone = async (formData) => {
    console.log(formData, "formData");
  try {
    const response = await axios.post(`${STONE_URL}/add-stone`, formData, {
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

// // get stones
const getAllStones = async () => {
  try {
    const response = await axios.get(`${STONE_URL}/stones`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};

// // get stone by id
const getStoneById = async (stoneId) => {
  try {
    const response = await axios.get(`${STONE_URL}/stone/${stoneId}`, {
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

const updateStone = async (stoneId, formData) => {
  try {
    const response = await axios.put(`${STONE_URL}/stone/${stoneId}`, formData, {
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


// // delete stone

const deleteStone = async (stoneId) => {
  try {
    const response = await axios.delete(`${STONE_URL}/stone/${stoneId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};



const stoneService = {
    addStone,
  getAllStones,
  getStoneById,
  updateStone,
  deleteStone
};

export default stoneService;
