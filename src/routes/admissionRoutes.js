import express from 'express';
import {
    createAdmission,
    getAdmissions,
    getAdmissionById,
    updateAdmission,
    deleteAdmission,
    searchAdmissions
} from '../controller/admissionController.js';

const router = express.Router();

router.get('/search', searchAdmissions);
router.post('/create', createAdmission);
router.get('/', getAdmissions);
router.get('/:id', getAdmissionById);
router.put('/:id', updateAdmission);
router.delete('/:id', deleteAdmission);

export default router;
