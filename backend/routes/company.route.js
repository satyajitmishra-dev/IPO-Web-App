// backend/routes/companyRoutes.js
import { Router } from 'express';
const router = Router();
import { addCompany, getCompanies, deleteCompany } from '../controllers/company.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

// All these routes require protection and admin role
router.route('/')
  .post(protect, admin, addCompany)
  .get(protect, admin, getCompanies);

router.route('/:id')
  .delete(protect, admin, deleteCompany);

export default router;