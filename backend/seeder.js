// backend/seeder.js
import mongoose from 'mongoose';
import { config } from 'dotenv';
// const bcrypt = require('bcryptjs'); // Bcrypt is used in User model's pre-save hook, not directly here

import { deleteMany, create } from './models/user.model.js';
import { deleteMany as _deleteMany, insertMany } from './models/company.model.js';
import { deleteMany as __deleteMany, insertMany as _insertMany } from './controllers/IPO.controller.js';
import connectDB from './config/db.js';

config();
connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await deleteMany();
    await _deleteMany();
    await __deleteMany();
    console.log('Existing data cleared!');

    // 1. Create Admin User
    // The password will be hashed by the pre-save hook in the User model
    const adminUser = await create({
      name: 'Admin User',
      email: 'admin@ipo.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin user created!');

    // 2. Create Companies
    const companiesData = [
      { name: 'Tech Innovators Corp', sector: 'Technology' },
      { name: 'Green Energy Solutions Ltd', sector: 'Renewables' },
      { name: 'Global Finance Group', sector: 'Finance' },
      { name: 'Healthcare Innovations Inc', sector: 'Healthcare' },
      { name: 'Urban Development Co', sector: 'Real Estate' },
    ];
    const createdCompanies = await insertMany(companiesData);
    console.log('Companies created!');

    // Get references to created companies
    const techInnovators = createdCompanies.find(c => c.name === 'Tech Innovators Corp');
    const greenEnergy = createdCompanies.find(c => c.name === 'Green Energy Solutions Ltd');
    const globalFinance = createdCompanies.find(c => c.name === 'Global Finance Group');
    const healthcareInnovations = createdCompanies.find(c => c.name === 'Healthcare Innovations Inc');
    const urbanDevelopment = createdCompanies.find(c => c.name === 'Urban Development Co');


    // 3. Create IPOs
    const iposData = [
      {
        company: techInnovators._id,
        openDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        closeDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        priceBand: '$150-180',
        status: 'upcoming',
      },
      {
        company: greenEnergy._id,
        openDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        closeDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        priceBand: '$50-65',
        status: 'active',
      },
      {
        company: globalFinance._id,
        openDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        closeDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        priceBand: '$200-220',
        status: 'closed',
      },
      {
        company: healthcareInnovations._id,
        openDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        closeDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
        priceBand: '$75-90',
        status: 'upcoming',
      },
      {
        company: urbanDevelopment._id,
        openDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        closeDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        priceBand: '$30-40',
        status: 'closed',
      },
      {
        company: techInnovators._id,
        openDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        closeDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        priceBand: '$160-190',
        status: 'active',
      },
    ];
    await _insertMany(iposData);
    console.log('IPOs created!');


    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await deleteMany();
    await _deleteMany();
    await __deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}