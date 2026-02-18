import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
//app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

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
import serviceRoutes from './routes/serviceRoutes.js';


app.use('/api/auth', authRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/calculate', calculateRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/admission', admissionRoutes)
app.use('/api/services', serviceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
