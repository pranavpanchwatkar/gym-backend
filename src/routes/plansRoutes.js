import express from 'express';
import {
    getAllPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan,
    getPlansByService
} from '../controller/planController.js';

const router = express.Router();
router.get("/service/:serviceId", getPlansByService);

router.get('/getplans', getAllPlans);
router.get('/getplanbyid/:id', getPlanById);
router.post('/createplan', createPlan);
router.put('/updateplan/:id', updatePlan);
router.delete('/deleteplan/:id', deletePlan);

export default router;
