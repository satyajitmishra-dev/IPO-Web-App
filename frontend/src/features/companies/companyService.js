import axios from 'axios';

const API_URL = 'http://localhost:5001/api/companies/'; // Ensure this matches your backend PORT

// Helper function to set authorization header
const getConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all companies
const getCompanies = async (token) => {
  const response = await axios.get(API_URL, getConfig(token));
  return response.data;
};

// Add a company
const addCompany = async (companyData, token) => {
  const response = await axios.post(API_URL, companyData, getConfig(token));
  return response.data;
};

// Delete a company
const deleteCompany = async (companyId, token) => {
  const response = await axios.delete(API_URL + companyId, getConfig(token));
  return response.data;
};

const companyService = {
  getCompanies,
  addCompany,
  deleteCompany,
};

export default companyService;