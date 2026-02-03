const router = require('express').Router();
const Plan = require('../models/Plan');
const verify = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/authMiddleware');

// GET all plans (Public)
router.get('/', async (req, res) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a plan (Admin only)
router.post('/', verify, isAdmin, async (req, res) => {
    const plan = new Plan({
        name: req.body.name,
        price: req.body.price,
        features: req.body.features
    });

    try {
        const savedPlan = await plan.save();
        res.json(savedPlan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a plan (Admin only)
router.put('/:id', verify, isAdmin, async (req, res) => {
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
            { new: true }
        );
        res.json(updatedPlan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a plan (Admin only)
router.delete('/:id', verify, isAdmin, async (req, res) => {
    try {
        await Plan.findByIdAndDelete(req.params.id);
        res.json({ message: 'Plan deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
