import Trainer from "../models/Trainer.js";

// Get all trainers
export const getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find();
        res.status(200).json(trainers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single trainer
export const getTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) {
            return res.status(404).json({ message: "Trainer not found" });
        }
        res.status(200).json(trainer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new trainer
export const createTrainer = async (req, res) => {
    try {
        const trainer = new Trainer({
            name: req.body.name,
            specialty: req.body.specialty,
            experience: req.body.experience,
            bio: req.body.bio,
            image: req.file ? req.file.filename : ""
        });

        const newTrainer = await trainer.save();
        res.status(201).json(newTrainer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Update trainer
import fs from "fs";
import path from "path";

export const updateTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) return res.status(404).json({ message: "Trainer not found" });

        // if new image uploaded delete old
        if (req.file && trainer.image) {
            const oldPath = path.join("uploads/trainers", trainer.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        trainer.name = req.body.name;
        trainer.specialty = req.body.specialty;
        trainer.experience = req.body.experience;
        trainer.bio = req.body.bio;
        if (req.file) trainer.image = req.file.filename;

        await trainer.save();
        res.json(trainer);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Delete trainer
export const deleteTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) return res.status(404).json({ message: "Trainer not found" });

        if (trainer.image) {
            const filePath = path.join("uploads/trainers", trainer.image);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        await trainer.deleteOne();
        res.json({ message: "Trainer deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

