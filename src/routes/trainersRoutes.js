import express from 'express';
import {
    getAllTrainers,
    getTrainerById,
    createTrainer,
    updateTrainer,
    deleteTrainer
} from '../controller/trainerController.js';

const router = express.Router();

router.get('/getalltrainers', getAllTrainers);
router.get('/gettrainerbyid/:id', getTrainerById);
router.post('/create', createTrainer);
router.put('/update/:id', updateTrainer);
router.delete('/delete/:id', deleteTrainer);

export default router;
