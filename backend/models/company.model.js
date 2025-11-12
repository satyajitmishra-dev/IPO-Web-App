// backend/controllers/company.controller.js
import asyncHandler from 'express-async-handler';
import Company from '../models/company.model.js';

// @desc    Create a new company
// @route   POST /api/companies
// @access  Admin
const createCompany = asyncHandler(async (req, res) => {
  const { name, sector } = req.body;

  if (!name || !sector) {
    res.status(400);
    throw new Error('Please provide company name and sector');
  }

  // Check if the company already exists
  const companyExists = await Company.findOne({ name });

  if (companyExists) {
    res.status(400);
    throw new Error('Company already exists');
  }

  // Create a new company
  const company = await Company.create({ name, sector });

  if (company) {
    res.status(201).json(company);
  } else {
    res.status(400);
    throw new Error('Invalid company data');
  }
});

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

// @desc    Get company by ID
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    res.json(company);
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
});

// @desc    Delete a company
// @route   DELETE /api/companies/:id
// @access  Admin
const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(404);
    throw new Error('Company not found');
  }

  await company.deleteOne();
  res.json({ message: 'Company removed' });
});

export default {
  createCompany,
  getCompanies,
  getCompanyById,
  deleteCompany,
};
