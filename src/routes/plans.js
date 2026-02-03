import express from 'express';
import {
    getAllPlans,
    createPlan,
    updatePlan,
    deletePlan
} from '../controller/planController.js';
import verify from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/plans
router.get('/', getAllPlans);

// @route   POST /api/plans
router.post('/', verify, isAdmin, createPlan);

// @route   PUT /api/plans/:id
router.put('/:id', verify, isAdmin, updatePlan);

// @route   DELETE /api/plans/:id
router.delete('/:id', verify, isAdmin, deletePlan);

export default router;
