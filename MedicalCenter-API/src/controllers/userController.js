const User = require('../models/user');

const userController = {

    getAll: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
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
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
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
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json(newUser);
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
            const user = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
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
            const user = await User.findByIdAndDelete(req.params.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                name: error.name,
                message: error.message
            });
        }
    },
};

module.exports = userController;
