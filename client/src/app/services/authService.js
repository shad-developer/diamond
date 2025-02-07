import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const AUTH_URL = `${BACKEND_URL}/auth`;

// login
const login = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, userData, {
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

const signup = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/signup`, userData, {
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

// Logout
const logout = async () => {
  try {
    const response = await axios.post(`${AUTH_URL}/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};

// add user
const addNewUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_URL}/add-user`, userData, {
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

// get user
const getUser = async () => {
  try {
    const response = await axios.get(`${AUTH_URL}/get-user`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${AUTH_URL}/users`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};

// get user by id

const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${AUTH_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};

// delete user

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${AUTH_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};

// update user

const updateUser = async (userId, formData) => {
  try {
    const response = await axios.put(`${AUTH_URL}/user/${userId}`, formData);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Something went wrong");
  }
};

const authService = {
  signup,
  addNewUser,
  login,
  getUser,
  logout,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};

export default authService;
