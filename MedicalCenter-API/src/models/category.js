const mongoose = require('mongoose');
const Service = require('./service');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Category name must be at least 3 characters long'],
        maxlength: [30, 'Category name cannot exceed 30 characters'],
    },
    description: {
        type: String,
        default: '',
        maxlength: [500, 'Category description cannot exceed 500 characters'],
    }
});

categorySchema.post('findOneAndDelete', async (doc) => {
    try {
        if (doc) {
            await Service.deleteMany({ category: doc._id })
        }
    } catch (error) {
        console.error(error);
    }
});

module.exports = mongoose.model('Category', categorySchema);
