import express from 'express';
import {
    createAdmission,
    getAdmissions,
    getAdmissionById
} from '../controller/admissionController.js';

const router = express.Router();

router.post('/create', createAdmission);
router.get('/', getAdmissions);
router.get('/:id', getAdmissionById);

export default router;
