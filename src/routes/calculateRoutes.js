import express from 'express';
import { calculate } from '../controller/calculateController.js';
const router = express.Router();

router.post('/calculate', calculate);


export default router;
