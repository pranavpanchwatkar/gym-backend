import express from 'express';
import {
    createAdmission,
    getAdmissions,
    getAdmissionById,
    deleteAdmission,
    searchAdmissions
} from '../controller/admissionController.js';

const router = express.Router();

router.get('/search', searchAdmissions);
router.post('/create', createAdmission);
router.get('/getadmissions', getAdmissions);
router.get('/getadmissionbyid/:id', getAdmissionById);
router.delete('/delete/:id', deleteAdmission);

export default router;
