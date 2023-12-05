const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Service name is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Service name must be at least 3 characters long'],
        maxlength: [50, 'Service name cannot exceed 50 characters'],
    },
    description: {
        type: String,
        default: '',
        maxlength: [500, 'Service description cannot exceed 500 characters'],
    },
    cost: {
        type: Number,
        required: [true, 'Service cost is required'],
        min: [0, 'Service cost cannot be negative'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required for the service'],
    },
});

module.exports = mongoose.model('Service', serviceSchema);
