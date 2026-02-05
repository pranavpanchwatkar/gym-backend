import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
import authRoutes from './routes/authRoutes.js';
import planRoutes from './routes/plansRoutes.js';
import leadRoutes from './routes/leadsRoutes.js';
import calculateRoutes from './routes/calculateRoutes.js';
import trainerRoutes from './routes/trainersRoutes.js';
import admissionRoutes from './routes/admissionRoutes.js';


app.use('/api/auth', authRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/calculate', calculateRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/admission', admissionRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
