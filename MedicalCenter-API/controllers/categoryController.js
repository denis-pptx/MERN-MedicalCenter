const Category = require('../models/category');

const categoryController = {
    getAll: async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            console.error(error);

            const {name, message} = error;
            res.status(500).json({name, message});
        }
    },

    getById: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json(category);
        } catch (error) {
            console.error(error);

            const {name, message} = error;
            res.status(500).json({name, message});
        }
    },

    create: async (req, res) => {
        try {
            const newCategory = new Category(req.body);
            await newCategory.save();
            res.status(201).json(newCategory);
        } catch (error) {
            console.error(error);

            const {name, message} = error;
            res.status(name === 'ValidationError' ? 400 : 500).json({name, message});
        }
    },

    update: async (req, res) => {
        try {
            const category = await Category.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json(category);
        } catch (error) {
            console.error(error);

            const {name, message} = error;
            res.status(name === 'ValidationError' ? 400 : 500).json({name, message});
        }
    },

    delete: async (req, res) => {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error(error);
            
            const {name, message} = error;
            res.status(500).json({name, message});
        }
    },
};

module.exports = categoryController;
