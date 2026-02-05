import express from 'express';
import {
    createAdmission,
    getAdmissions,
    getAdmissionById
} from '../controller/admissionController.js';

const router = express.Router();

router.post('/create', createAdmission);
router.get('/getadmissions', getAdmissions);
router.get('/getadmissionbyid/:id', getAdmissionById);

export default router;
