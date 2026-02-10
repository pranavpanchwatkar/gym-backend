import express from 'express';
import { createService, deleteServiceById, getServices, getServiceById, updateService } from '../controller/servicesController.js';
import verify, { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', verify, isAdmin, createService);
router.get('/getservices', getServices);

// ⭐ PUBLIC ROUTE (FRONTEND USE KAREGA)
router.get('/:id', getServiceById);

// 🔒 ADMIN ROUTE (dashboard ke liye)
router.get('/getservicebyid/:id', verify, isAdmin, getServiceById);

router.put('/update/:id', verify, isAdmin, updateService);
router.delete('/delete/:id', verify, isAdmin, deleteServiceById);

export default router;
