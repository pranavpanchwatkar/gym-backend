import Plan from "../models/Plan.js"

export const getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getPlanById = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json(plan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const createPlan = async (req, res) => {
    try {
        const plan = new Plan({
            name: req.body.name,
            price: req.body.price,
            features: req.body.features
        });
        const savedPlan = await plan.save();
        res.status(201).json(savedPlan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const updatePlan = async (req, res) => {
    try {
        const updatedPlan = await Plan.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    features: req.body.features
                }
            },
            { new: true, runValidators: true }
        );
        if (!updatedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json(updatedPlan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const deletePlan = async (req, res) => {
    try {
        const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
        if (!deletedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json({ message: 'Plan deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

