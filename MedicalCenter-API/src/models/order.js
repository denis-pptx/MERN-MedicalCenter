const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required for the order'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required for the order'],
        match: [/^\+375-\d{2}-\d{3}-\d{2}-\d{2}$/, 'Invalid phone number format. Use +375-XX-XXX-XX-XX.']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        match: [/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, 'Please enter a valid email address'],
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'Service reference is required for the order'],
        validate: {
            validator: async function (value) {
                const service = await mongoose.model('Service').findById(value);
                return service !== null;
            },
            message: 'Invalid service reference',
        },
    },
});

module.exports = mongoose.model('Order', orderSchema);
