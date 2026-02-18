import Service from '../models/Services.js'
import fs from "fs";
import path from "path";

// ================= CREATE =================
const createService = async (req, res) => {
  try {
    const { title, description, amount } = req.body;

    const image = req.file
      ? `/uploads/services/${req.file.filename}`
      : "";

    const service = await Service.create({
      title,
      description,
      amount,
      image,
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL =================
const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= GET ONE =================
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= UPDATE =================
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    // delete old image if new uploaded
    if (req.file && service.image) {
      const oldPath = path.join(process.cwd(), service.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    service.title = req.body.title;
    service.description = req.body.description;
    service.amount = req.body.amount;

    if (req.file) {
      service.image = `/uploads/services/${req.file.filename}`;
    }

    await service.save();
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE =================
const deleteServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    // delete image from folder
    if (service.image) {
      const imgPath = path.join(process.cwd(), service.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await service.deleteOne();
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteServiceById
};
