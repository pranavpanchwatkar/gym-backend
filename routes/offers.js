const router = require('express').Router();
const Offer = require('../models/Offer');
const verify = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/authMiddleware');

// GET all active offers (Public)
router.get('/', async (req, res) => {
    try {
        const offers = await Offer.find({ isActive: true });
        res.json(offers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all offers including inactive (Admin only)
router.get('/all', verify, isAdmin, async (req, res) => {
    try {
        const offers = await Offer.find();
        res.json(offers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE a new offer (Admin only)
router.post('/', verify, isAdmin, async (req, res) => {
    const offer = new Offer({
        title: req.body.title,
        description: req.body.description,
        discount: req.body.discount,
        validUntil: req.body.validUntil,
        isActive: req.body.isActive !== undefined ? req.body.isActive : true
    });

    try {
        const savedOffer = await offer.save();
        res.json(savedOffer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE an offer (Admin only)
router.put('/:id', verify, isAdmin, async (req, res) => {
    try {
        const updatedOffer = await Offer.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                    discount: req.body.discount,
                    validUntil: req.body.validUntil,
                    isActive: req.body.isActive
                }
            },
            { new: true }
        );
        res.json(updatedOffer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an offer (Admin only)
router.delete('/:id', verify, isAdmin, async (req, res) => {
    try {
        await Offer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Offer deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
