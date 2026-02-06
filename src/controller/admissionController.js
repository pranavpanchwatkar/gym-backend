import Admission from '../models/Admission.js';
import Plan from '../models/Plan.js';

// CREATE ADMISSION
// POST /api/admissions/create
export const createAdmission = async (req, res) => {
    try {
        const {
            customerName,
            mobile,
            plan,
            amountPaid,
            paymentMode,
            note
        } = req.body;

        const planData = await Plan.findById(plan);
        if (!planData) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        const planPrice = planData.price;

        if (amountPaid > planPrice) {
            return res.status(400).json({
                message: 'Amount paid cannot be greater than plan price'
            });
        }

        const remainingAmount = planPrice - amountPaid;


        const admission = await Admission.create({
            customerName,
            mobile,
            plan,
            planPrice,
            amountPaid,
            remainingAmount,
            paymentMode,
            note
        });

        res.status(201).json({
            success: true,
            message: 'Admission created successfully',
            data: admission
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// SEARCH ADMISSIONS
// GET /api/admissions/search?query=rahul OR 9876
export const searchAdmissions = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                message: 'Search query is required'
            });
        }

        const admissions = await Admission.find({
            $or: [
                { customerName: { $regex: query, $options: 'i' } },
                { mobile: { $regex: query, $options: 'i' } }
            ]
        }).populate('plan');

        res.status(200).json(admissions);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL ADMISSIONS
export const getAdmissions = async (req, res) => {
    try {
        const admissions = await Admission.find().populate('plan');
        res.status(200).json(admissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE ADMISSION
export const getAdmissionById = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id).populate('plan');

        if (!admission) {
            return res.status(404).json({ message: 'Admission not found' });
        }

        res.status(200).json(admission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE ADMISSION
export const updateAdmission = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);

        if (!admission) {
            return res.status(404).json({ message: 'Admission not found' });
        }

        if (req.body.amountPaid !== undefined) {
            admission.amountPaid = req.body.amountPaid;
            admission.remainingAmount =
                admission.planPrice - req.body.amountPaid;
        }

        admission.customerName = req.body.customerName || admission.customerName;
        admission.mobile = req.body.mobile || admission.mobile;
        admission.paymentMode = req.body.paymentMode || admission.paymentMode;
        admission.note = req.body.note || admission.note;

        const updatedAdmission = await admission.save();

        res.status(200).json({
            success: true,
            message: 'Admission updated successfully',
            data: updatedAdmission
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE ADMISSION
export const deleteAdmission = async (req, res) => {
    try {
        const deletedAdmission = await Admission.findByIdAndDelete(req.params.id);

        if (!deletedAdmission) {
            return res.status(404).json({ message: 'Admission not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Admission deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



