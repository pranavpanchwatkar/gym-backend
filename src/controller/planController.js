import Plan from "../models/Plan.js"

export const getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find().populate("service");
        res.json(plans);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id)
      .populate("service", "title");

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPlan = async (req, res) => {
  try {
    const { name, price, service, durationindays, description } = req.body;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + Number(durationindays));

    const plan = await Plan.create({
      name,
      price,
      service,
      durationindays,
      description,
      startDate,
      endDate
    });

    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPlansByService = async (req, res) => {
  try {
    const plans = await Plan.find({ service: req.params.serviceId });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Update fields safely
    plan.name = req.body.name ?? plan.name;
    plan.price = req.body.price ?? plan.price;
    plan.service = req.body.service ?? plan.service;
    plan.durationindays = req.body.durationindays ?? plan.durationindays;
    plan.description = req.body.description ?? plan.description;

    // Recalculate endDate if duration changed
    if (req.body.durationindays) {
      const startDate = plan.startDate || new Date();
      const endDate = new Date(startDate);
      endDate.setDate(
        startDate.getDate() + Number(plan.durationindays)
      );
      plan.endDate = endDate;
    }

    const updatedPlan = await plan.save();

    // Populate service before sending response
    await updatedPlan.populate("service", "name");

    res.json(updatedPlan);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

