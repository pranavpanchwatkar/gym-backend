import Lead from '../models/Lead.js';

// @desc    Get all leads
// @route   GET /api/leads
// @access  Admin
export const getAllLeads = async (req, res) => {
    try {
        const leads = await Lead.find().populate('plan', 'name price');
        res.json(leads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get leads by status
// @route   GET /api/leads/status/:status
// @access  Admin
export const getLeadsByStatus = async (req, res) => {
    try {
        const leads = await Lead.find({ status: req.params.status }).populate('plan', 'name price');
        res.json(leads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get single lead by ID
// @route   GET /api/leads/:id
// @access  Admin
export const getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id).populate('plan');

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        res.json(lead);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Public
// @desc    Create a new lead
// @route   POST /api/leads
// @access  Public
export const createLead = async (req, res) => {
    try {
        const { name, email, phone, message, plan } = req.body;

        // validation
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const lead = await Lead.create({
            name,
            email,
            phone,
            message,
            plan: plan || null, // important fix
            status: "new"
        });

        const populatedLead = await Lead.findById(lead._id)
            .populate('plan', 'name price');

        res.status(201).json({
            success: true,
            message: "Lead created successfully",
            data: populatedLead
        });

    } catch (err) {
        console.error("Create Lead Error:", err);
        res.status(500).json({ message: err.message });
    }
};


// @desc    Update lead status
// @route   PUT /api/leads/:id/status
// @access  Admin
export const updateLeadStatus = async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            { $set: { status: req.body.status } },
            { new: true, runValidators: true }
        ).populate('plan', 'name price');

        if (!updatedLead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        res.json(updatedLead);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update a lead
// @route   PUT /api/leads/:id
// @access  Admin
export const updateLead = async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    plan: req.body.plan,
                    message: req.body.message,
                    status: req.body.status
                }
            },
            { new: true, runValidators: true }
        ).populate('plan', 'name price');

        if (!updatedLead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        res.json(updatedLead);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Admin
export const deleteLead = async (req, res) => {
    try {
        const deletedLead = await Lead.findByIdAndDelete(req.params.id);

        if (!deletedLead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        res.json({ message: 'Lead deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
