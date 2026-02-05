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
    const trainer = new Trainer({
        name: req.body.name,
        specialty: req.body.specialty,
        experience: req.body.experience,
        bio: req.body.bio,
    });

    try {
        const newTrainer = await trainer.save();
        res.status(201).json(newTrainer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update trainer
export const updateTrainer = async (req, res) => {
    try {
        const updatedTrainer = await Trainer.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedTrainer) {
            return res.status(404).json({ message: "Trainer not found" });
        }
        res.status(200).json(updatedTrainer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete trainer
export const deleteTrainer = async (req, res) => {
    try {
        const deletedTrainer = await Trainer.findByIdAndDelete(req.params.id);
        if (!deletedTrainer) {
            return res.status(404).json({ message: "Trainer not found" });
        }
        res.status(200).json({ message: "Trainer deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
