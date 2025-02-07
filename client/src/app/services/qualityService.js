import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const QUALITY_URL = `${BACKEND_URL}/quality`;

// add quality
const addQuality = async (name) => {
  try {
      const response = await axios.post(`${QUALITY_URL}/add-quality`, { name }, {
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

// get qualities
const getQualities = async () => {
  try {
    const response = await axios.get(`${QUALITY_URL}/qualities`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};

// get quality by id
const getQualityById = async (qualityId) => {
  try {
    const response = await axios.get(`${QUALITY_URL}/quality/${qualityId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};


// update quality

const updateQuality = async (qualityId, name) => {
  try {
      const response = await axios.put(`${QUALITY_URL}/quality/${qualityId}`, { name }, {
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


// delete quality

const deleteQuality = async (qualityId) => {
  try {
    const response = await axios.delete(`${QUALITY_URL}/quality/${qualityId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};



const qualityService = {
    addQuality,
    getQualities,
    getQualityById,
    updateQuality,
    deleteQuality,
  
};

export default qualityService;
