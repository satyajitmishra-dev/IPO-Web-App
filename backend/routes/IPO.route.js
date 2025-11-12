// backend/routes/ipoRoutes.js
import { Router } from 'express';
const router = Router();
import ipoController from '../controllers/IPO.controller.js';
const { createIPO, getIPOs, deleteIPO, updateIPO } = ipoController;

import { protect, admin } from '../middleware/auth.middleware.js';

// Public route for viewing active IPOs
router.get('/', getIPOs);

// Admin-only routes for creating, updating, deleting IPOs
router.route('/')
  .post(protect, admin, createIPO);

router.route('/:id')
  .delete(protect, admin, deleteIPO)
  .put(protect, admin, updateIPO); // Added PUT for updating IPOs

export default router;