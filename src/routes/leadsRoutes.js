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

import verify, { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all leads (admin)
router.get('/getleads', verify, isAdmin, getAllLeads);

// GET leads by status
router.get('/getleadsbystatus/:status', verify, isAdmin, getLeadsByStatus);

// GET single lead
router.get('/getleadbyid/:id', verify, isAdmin, getLeadById);

// PUBLIC - contact form
router.post('/createlead', createLead);

// UPDATE status
router.put('/updateleadstatus/:id', verify, isAdmin, updateLeadStatus);

// UPDATE lead
router.put('/updatelead/:id', verify, isAdmin, updateLead);

// DELETE lead
router.delete('/deletelead/:id', verify, isAdmin, deleteLead);

export default router;
