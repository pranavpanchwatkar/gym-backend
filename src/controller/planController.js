import Plan from '../models/Plan.js';

// GET ALL PLANS
// GET /api/plans
export const getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE PLAN
// POST /api/plans
export const createPlan = async (req, res) => {
    try {
        const {
            name,
            durationInDays,
            price,
            description,
            isActive
        } = req.body;

        const plan = await Plan.create({
            name,
            durationInDays,
            price,
            description,
            isActive
        });

        res.status(201).json({
            success: true,
            message: 'Plan created successfully',
            data: plan
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE PLAN
// PUT /api/plans/:id
export const updatePlan = async (req, res) => {
    try {
        const updatedPlan = await Plan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Plan updated successfully',
            data: updatedPlan
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE PLAN
// DELETE /api/plans/:id
export const deletePlan = async (req, res) => {
    try {
        const deletedPlan = await Plan.findByIdAndDelete(req.params.id);

        if (!deletedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Plan deleted successfully'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET SINGLE PLAN
// GET /api/plans/:id
export const getPlanById = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
