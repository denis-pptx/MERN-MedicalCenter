const Service = require('../models/service');

const serviceController = {
    getAll: async (req, res) => {
        try {
            const services = await Service.find();
            res.status(200).json(services);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                name: error.name,
                message: error.message
            });
        }
    },

    getById: async (req, res) => {
        try {
            const service = await Service.findById(req.params.id);
            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }
            res.status(200).json(await service.populate('category'));
        } catch (error) {
            console.error(error);
            res.status(500).json({
                name: error.name,
                message: error.message
            });
        }
    },


    create: async (req, res) => {
        try {
            const newService = new Service(req.body);
            await newService.save();
            res.status(201).json(await newService.populate('category'));
        } catch (error) {
            console.error(error);
            res.status(error.name === 'ValidationError' ? 400 : 500).json({
                name: error.name,
                message: error.message
            });
        }
    },

    update: async (req, res) => {
        try {
            const service = await Service.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }

            res.status(200).json(await service.populate('category'));
        } catch (error) {
            console.error(error);
            res.status(error.name === 'ValidationError' ? 400 : 500).json({
                name: error.name,
                message: error.message
            });
        }
    },

    delete: async (req, res) => {
        try {
            const service = await Service.findByIdAndDelete(req.params.id);

            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }

            res.status(200).json({ message: 'Service deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                name: error.name,
                message: error.message
            });
        }
    },
};

module.exports = serviceController;
