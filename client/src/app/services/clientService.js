import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const CLIENT_URL = `${BACKEND_URL}/client`;

// add Client
const addClient = async (formData) => {
  try {
    const response = await axios.post(`${CLIENT_URL}/add-client`, formData, {
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

// get Clients
const getClients = async () => {
  try {
    const response = await axios.get(`${CLIENT_URL}/clients`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};

// get client by id
const getClientById = async (clientId) => {
  try {
    const response = await axios.get(`${CLIENT_URL}/client/${clientId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};


// update client

const updateClient = async (clientId, formData) => {
  try {
    const response = await axios.put(`${CLIENT_URL}/client/${clientId}`, formData, {
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


// delete client

const deleteClient = async (clientId) => {
  try {
    const response = await axios.delete(`${CLIENT_URL}/client/${clientId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
     ? error.response.data
      : new Error("Something went wrong");
  }
};



const clientService = {
  addClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
};

export default clientService;
