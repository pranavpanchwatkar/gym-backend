import express from 'express';
import {
  createService,
  deleteServiceById,
  getServices,
  getServiceById,
  updateService
} from '../controller/servicesController.js';

import verify, { isAdmin } from '../middleware/authMiddleware.js';
import uploadServiceImage from '../middleware/uploadServiceImage.js';

const router = express.Router();

// CREATE SERVICE (with image upload)
router.post(
  '/create',
  verify,
  isAdmin,
  uploadServiceImage.single("image"),
  createService
);

// GET ALL SERVICES
router.get('/getservices', getServices);

// ⭐ PUBLIC ROUTE (Frontend use karega)
router.get('/:id', getServiceById);

// 🔒 ADMIN ROUTE (Dashboard ke liye)
router.get('/getservicebyid/:id', verify, isAdmin, getServiceById);

// UPDATE SERVICE (image optional)
router.put(
  '/update/:id',
  verify,
  isAdmin,
  uploadServiceImage.single("image"),
  updateService
);

// DELETE SERVICE
router.delete('/delete/:id', verify, isAdmin, deleteServiceById);

export default router;