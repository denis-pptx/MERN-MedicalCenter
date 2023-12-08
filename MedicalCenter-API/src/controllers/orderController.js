const Order = require('../models/order');

const orderController = {
    get: async (req, res) => {
        try {
            const filter = {}
            if (req.query.status) {
                filter.status = req.query.status;
            }

            const orders = await Order.find(filter).populate('service');
            res.status(200).json(orders);
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
            const order = await Order.findById(req.params.id).populate('service');
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);
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
            const newOrder = new Order(req.body);
            await newOrder.save();
            await newOrder.populate('service');
            res.status(201).json(newOrder);
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
            const order = await Order.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            ).populate('service');

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.status(200).json(order);
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
            const order = await Order.findByIdAndDelete(req.params.id);

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                name: error.name,
                message: error.message
            });
        }
    },
};

module.exports = orderController;
