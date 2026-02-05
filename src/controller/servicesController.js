import Service from '../models/Services.js'

const createService = async (req, res) => {
    try {
        const { title, description, amount } = req.body;
        const service = await Service.create({ title, description, amount })
        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            data: service
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const getServices = async (req, res) => {
    try {
        const services = await Service.find()
        res.status(200).json(services)
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service not found'
            })
        }
        res.status(200).json(service)
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service not found'
            })
        }
        res.status(200).json(service)
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const deleteServiceById = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id)
        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service not found'
            })
        }
        res.status(200).json({ message: 'Service deleted successfully' })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export { createService, getServices, getServiceById, updateService, deleteServiceById };