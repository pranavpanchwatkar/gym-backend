import express from 'express';
import {
    getAllPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan
} from '../controller/planController.js';

const router = express.Router();

router.get('/', getAllPlans);
router.get('/:id', getPlanById);
router.post('/', createPlan);
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);

export default router;
