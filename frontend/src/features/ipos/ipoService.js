import axios from 'axios';

const API_URL = 'http://localhost:5001/api/ipos/'; // Ensure this matches your backend PORT

// Helper function to set authorization header
const getConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all IPOs (can be public or admin with token)
const getIPOs = async (status = '', token = null) => {
  const config = token ? getConfig(token) : {}; // Only include auth header if token exists
  const queryString = status ? `?status=${status}` : '';
  const response = await axios.get(API_URL + queryString, config);
  return response.data;
};

// Create an IPO
const createIPO = async (ipoData, token) => {
  const response = await axios.post(API_URL, ipoData, getConfig(token));
  return response.data;
};

// Delete an IPO
const deleteIPO = async (ipoId, token) => {
  const response = await axios.delete(API_URL + ipoId, getConfig(token));
  return response.data;
};

// Update an IPO
const updateIPO = async (ipoId, ipoData, token) => {
  const response = await axios.put(API_URL + ipoId, ipoData, getConfig(token));
  return response.data;
};

const ipoService = {
  getIPOs,
  createIPO,
  deleteIPO,
  updateIPO
};

export default ipoService;