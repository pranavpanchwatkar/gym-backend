import Admission from '../models/Admission.js';
import Plan from '../models/Plan.js';

// CREATE ADMISSION
export const createAdmission = async (req, res) => {
    try {
        const {
            customerName,
            plan,
            amountPaid,
            paymentMode,
            note
        } = req.body;

        // find plan
        const planData = await Plan.findById(plan);
        if (!planData) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        const planPrice = planData.price;
        const remainingAmount = planPrice - amountPaid;


        const admission = await Admission.create({
            customerName,
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
        res.status(500).json({ success: false, error: error.message });
    }
};

// GET ALL ADMISSIONS
export const getAdmissions = async (req, res) => {
    try {
        const admissions = await Admission.find().populate('plan');
        res.status(200).json(admissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
};


export const deleteAdmission = async (req, res) => {
    try {
        const admission = await Admission.findByIdAndDelete(req.params.id)
        if (!admission) {
            return res.status(404).json({ message: 'Admission not found' })
        }
        res.status(200).json({ message: 'Admission deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}