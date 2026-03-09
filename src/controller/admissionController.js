import Admission from '../models/Admission.js';
import Plan from '../models/Plan.js';

/* ================= CREATE ================= */
export const createAdmission = async (req, res) => {
  try {
    const {
      customerName,
      mobile,
      plan,
      amountPaid,
      paymentMode,
      note,
      admittedAt
    } = req.body;

    // MOBILE UNIQUE CHECK
    const existing = await Admission.findOne({ mobile });
    if (existing) {
      return res.status(400).json({ message: 'Mobile number already registered' });
    }

    const planData = await Plan.findById(plan).populate('service');
    if (!planData)
      return res.status(404).json({ message: 'Plan not found' });

    const planPrice = planData.price;

    if (amountPaid > planPrice) {
      return res.status(400).json({ message: 'Amount paid cannot exceed plan price' });
    }

    const remainingAmount = planPrice - amountPaid;

    // ✅ START DATE
    const startDate = admittedAt ? new Date(admittedAt) : new Date();

    // ✅ END DATE CALCULATION
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (planData.durationindays || 30));

    const admission = await Admission.create({
      customerName,
      mobile,
      plan,
      planPrice,
      amountPaid,
      remainingAmount,
      paymentMode,
      note,
      admittedAt: startDate,
      endDate
    });

    res.status(201).json(admission);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET ALL ================= */
export const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find()
      .populate({
        path: 'plan',
        populate: { path: 'service' }
      })
      
      .sort({ createdAt: -1 });

      console.log("FIRST ADMISSION PLAN 👉", admissions[0]?.plan);

    res.json(admissions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


/* ================= GET ONE ================= */
export const getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id)
      .populate({
        path: 'plan',
        populate: { path: 'service' }
      });

    if (!admission)
      return res.status(404).json({ message: 'Admission not found' });

    res.json(admission);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= SEARCH ================= */
export const searchAdmissions = async (req, res) => {
  try {
    const { query } = req.query;

    const admissions = await Admission.find({
      $or: [
        { customerName: { $regex: query, $options: 'i' } },
        { mobile: { $regex: query, $options: 'i' } }
      ]
    }).populate({
      path: 'plan',
      populate: { path: 'service' }
    });

    res.json(admissions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= UPDATE ================= */
export const updateAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission)
      return res.status(404).json({ message: 'Admission not found' });

    // MOBILE UNIQUE CHECK (EXCEPT SELF)
    if (req.body.mobile && req.body.mobile !== admission.mobile) {
      const exists = await Admission.findOne({ mobile: req.body.mobile });
      if (exists)
        return res.status(400).json({ message: 'Mobile already used' });

      admission.mobile = req.body.mobile;
    }

    let planData;

    // PLAN CHANGE
    if (req.body.plan) {
      planData = await Plan.findById(req.body.plan);
      if (!planData)
        return res.status(404).json({ message: 'Plan not found' });

      admission.plan = req.body.plan;
      admission.planPrice = planData.price;
    }

    // AMOUNT UPDATE
    if (req.body.amountPaid !== undefined) {
      if (req.body.amountPaid > admission.planPrice)
        return res.status(400).json({ message: 'Amount exceeds plan price' });

      admission.amountPaid = req.body.amountPaid;
    }

    // UPDATE OTHER FIELDS
    admission.customerName =
      req.body.customerName ?? admission.customerName;

    admission.paymentMode =
      req.body.paymentMode ?? admission.paymentMode;

    admission.note =
      req.body.note ?? admission.note;

    if (req.body.admittedAt) {
      admission.admittedAt = req.body.admittedAt;
    }

    // RECALCULATE END DATE
    const currentPlan =
      planData || await Plan.findById(admission.plan);

    const startDate = new Date(admission.admittedAt);
    const endDate = new Date(startDate);

    endDate.setDate(
      startDate.getDate() + (currentPlan.durationindays || 30)
    );

    admission.endDate = endDate;

    // RECALCULATE REMAINING
    admission.remainingAmount =
      admission.planPrice - admission.amountPaid;

    const updated = await admission.save();
    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= DELETE ================= */
export const deleteAdmission = async (req, res) => {
  try {
    const deleted = await Admission.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: 'Admission not found' });

    res.json({ message: 'Admission deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};