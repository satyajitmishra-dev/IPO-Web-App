// backend/routes/authRoutes.js
import { Router } from 'express';
const router = Router();
import { loginAdmin, registerAdmin } from '../controllers/auth.controller.js';

router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // For initial admin setup, disable later

export default router;