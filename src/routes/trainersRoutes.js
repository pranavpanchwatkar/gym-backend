import express from 'express';
import upload from "../middleware/upload.js";

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
router.post('/create', upload.single("image"), createTrainer);
router.put('/update/:id', upload.single("image"), updateTrainer);
router.delete('/delete/:id', deleteTrainer);

export default router;
