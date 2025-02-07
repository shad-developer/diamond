import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const COLOR_URL = `${BACKEND_URL}/color`;

// add color
const addColor = async (name) => {
  try {
      const response = await axios.post(`${COLOR_URL}/add-color`, { name }, {
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

// get colors
const getColors = async () => {
  try {
    const response = await axios.get(`${COLOR_URL}/colors`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};

// get color by id
const getColorById = async (colorId) => {
  try {
    const response = await axios.get(`${COLOR_URL}/color/${colorId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};


// update color

const updateColor = async (colorId, name) => {
  try {
      const response = await axios.put(`${COLOR_URL}/color/${colorId}`, { name }, {
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


// delete color

const deleteColor = async (colorId) => {
  try {
    const response = await axios.delete(`${COLOR_URL}/color/${colorId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};



const colorService = {
    addColor,
    getColors,
    getColorById,
    updateColor,
    deleteColor,
  
  
};

export default colorService;
