// backend/controllers/company.controller.js
import asyncHandler from 'express-async-handler';
import Company from '../models/company.model.js';

// @desc    Add a new company
// @route   POST /api/companies
// @access  Private/Admin
export const addCompany = asyncHandler(async (req, res) => {
  const { name, sector } = req.body;

  if (!name || !sector) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const companyExists = await Company.findOne({ name });
  if (companyExists) {
    res.status(400);
    throw new Error('Company with this name already exists');
  }

  const company = await Company.create({ name, sector });
  res.status(201).json(company);
});

// @desc    Get all companies
// @route   GET /api/companies
// @access  Private/Admin
export const getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find({});
  res.status(200).json(companies);
});

// @desc    Delete a company
// @route   DELETE /api/companies/:id
// @access  Private/Admin
export const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(404);
    throw new Error('Company not found');
  }

  await Company.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'Company removed' });
});
