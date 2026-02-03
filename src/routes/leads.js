import express from 'express';
import {
    getAllLeads,
    getLeadsByStatus,
    getLeadById,
    createLead,
    updateLeadStatus,
    updateLead,
    deleteLead
} from '../controller/leadController.js';
import verify from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/leads
router.get('/', verify, isAdmin, getAllLeads);

// @route   GET /api/leads/status/:status
router.get('/status/:status', verify, isAdmin, getLeadsByStatus);

// @route   GET /api/leads/:id
router.get('/:id', verify, isAdmin, getLeadById);

// @route   POST /api/leads
router.post('/', createLead);

// @route   PUT /api/leads/:id/status
router.put('/:id/status', verify, isAdmin, updateLeadStatus);

// @route   PUT /api/leads/:id
router.put('/:id', verify, isAdmin, updateLead);

// @route   DELETE /api/leads/:id
router.delete('/:id', verify, isAdmin, deleteLead);

export default router;
