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
router.get('/getleads', verify, isAdmin, getAllLeads);

// @route   GET /api/leads/status/:status
router.get('/getleadsbystatus/:status', verify, isAdmin, getLeadsByStatus);

// @route   GET /api/leads/:id
router.get('/getleadbyid/:id', verify, isAdmin, getLeadById);

// @route   POST /api/leads
router.post('/createlead', createLead);

// @route   PUT /api/leads/:id/status
router.put('/updateleadstatus/:id', verify, isAdmin, updateLeadStatus);

// @route   PUT /api/leads/:id
router.put('/updatelead/:id', verify, isAdmin, updateLead);

// @route   DELETE /api/leads/:id
router.delete('/deletelead/:id', verify, isAdmin, deleteLead);

export default router;
