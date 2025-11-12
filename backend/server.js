// backend/server.js
import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js';
import companyRoutes from './routes/company.route.js';
import ipoRoutes from './routes/IPO.route.js';
import {errorHandler} from './middleware/error.middleware.js';

config();

connectDB(); // Connect to MongoDB

const app = express();

// Middleware to parse JSON bodies
app.use(json({limit: "10mb"}));
// Middleware to parse URL-encoded bodies (if you use forms)
app.use(urlencoded({ extended: false }));

// Enable CORS for all routes (important for frontend communication)
app.use(cors());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/ipos', ipoRoutes);

// Custom error handler middleware
// This should be the last middleware added
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port, https://localhost:${PORT}`));