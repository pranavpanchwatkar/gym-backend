import express from 'express';
<<<<<<< HEAD
import { createService, deleteServiceById, getServices, getServiceById, updateService } from '../controller/servicesController.js';
=======
import {
  createService,
  deleteServiceById,
  getServices,
  getServiceById,
  updateService
} from '../controller/servicesController.js';

>>>>>>> d888674 (Updated admission controller search and validation fixes also used the multer for adding the images)
import verify, { isAdmin } from '../middleware/authMiddleware.js';
import uploadServiceImage from '../middleware/uploadServiceImage.js';   // ✅ ADD THIS

const router = express.Router();

// CREATE SERVICE (with image upload)
router.post(
  '/create',
  verify,
  isAdmin,
  uploadServiceImage.single("image"),   // ✅ MULTER
  createService
);

// GET ALL SERVICES
router.get('/getservices', getServices);

<<<<<<< HEAD
// ⭐ PUBLIC ROUTE (FRONTEND USE KAREGA)
router.get('/:id', getServiceById);

// 🔒 ADMIN ROUTE (dashboard ke liye)
router.get('/getservicebyid/:id', verify, isAdmin, getServiceById);

router.put('/update/:id', verify, isAdmin, updateService);
=======
// GET SINGLE SERVICE
router.get('/getservicebyid/:id', verify, isAdmin, getServiceById);

// UPDATE SERVICE (image optional)
router.put(
  '/update/:id',
  verify,
  isAdmin,
  uploadServiceImage.single("image"),   // ✅ MULTER
  updateService
);

// DELETE SERVICE
>>>>>>> d888674 (Updated admission controller search and validation fixes also used the multer for adding the images)
router.delete('/delete/:id', verify, isAdmin, deleteServiceById);

export default router;
