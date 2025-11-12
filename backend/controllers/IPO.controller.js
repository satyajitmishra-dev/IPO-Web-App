import asyncHandler from 'express-async-handler';
import IPO from '../models/IPO.model.js';
import Company from '../models/company.model.js';

// Create a new IPO
const createIPO = asyncHandler(async (req, res) => {
  const { company, openDate, closeDate, priceBand, status } = req.body;

  if (!company || !openDate || !closeDate || !priceBand) {
    res.status(400);
    throw new Error('Please add all required IPO fields');
  }

  const existingCompany = await Company.findById(company);
  if (!existingCompany) {
    res.status(404);
    throw new Error('Company not found');
  }

  const ipo = await IPO.create({
    company,
    openDate,
    closeDate,
    priceBand,
    status: status || 'upcoming',
  });

  res.status(201).json(ipo);
});

// Get all IPOs
const getIPOs = asyncHandler(async (req, res) => {
  const query = {};
  if (req.query.status) query.status = req.query.status;

  const ipos = await IPO.find(query).populate('company', 'name sector');
  res.status(200).json(ipos);
});

// Delete IPO
const deleteIPO = asyncHandler(async (req, res) => {
  const ipo = await IPO.findById(req.params.id);
  if (!ipo) {
    res.status(404);
    throw new Error('IPO not found');
  }

  await IPO.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'IPO removed' });
});

// Update IPO
const updateIPO = asyncHandler(async (req, res) => {
  const { company, openDate, closeDate, priceBand, status } = req.body;

  const ipo = await IPO.findById(req.params.id);
  if (!ipo) {
    res.status(404);
    throw new Error('IPO not found');
  }

  if (company && company.toString() !== ipo.company.toString()) {
    const existingCompany = await Company.findById(company);
    if (!existingCompany) {
      res.status(404);
      throw new Error('New company ID not found');
    }
  }

  ipo.company = company || ipo.company;
  ipo.openDate = openDate || ipo.openDate;
  ipo.closeDate = closeDate || ipo.closeDate;
  ipo.priceBand = priceBand || ipo.priceBand;
  ipo.status = status || ipo.status;

  const updatedIPO = await ipo.save();
  res.status(200).json(updatedIPO);
});

export default {
  createIPO,
  getIPOs,
  deleteIPO,
  updateIPO,
};
