import dotenv from 'dotenv';
<<<<<<< HEAD

=======
import cors from 'cors';
import path from "path";
>>>>>>> d888674 (Updated admission controller search and validation fixes also used the multer for adding the images)
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';

import cors from 'cors';



const app = express();

// ================= CORS FIX =================
app.use(cors({
  origin: "http://localhost:5173",   // Vite React URL
  credentials: true                  // allow cookies / auth
}));
// ============================================

app.use(express.json());
<<<<<<< HEAD
=======
app.use(cors());
//app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
>>>>>>> d888674 (Updated admission controller search and validation fixes also used the multer for adding the images)

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
app.use('/api/admission', admissionRoutes);
app.use('/api/services', serviceRoutes);


console.log("JWT:", process.env.JWT_SECRET);
console.log("MONGO:", process.env.MONGO_URI);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
