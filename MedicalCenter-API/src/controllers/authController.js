const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const authController = {
    register: async (req, res) => {
        try {
            const { login, email, password } = req.body;

            const user = new User({ login, email, password });

            await user.save();

            res.status(201).json({ message: 'Registration successful' });
        } catch (error) {
            console.log(error);

            const {name, message} = error;
            res.status(name === 'ValidationError' ? 400 : 500).json({name, message});
        }
    },

    login: async (req, res) => {
        try {
            const { login, password } = req.body;

            const user = await User.findOne({ login });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Invalid login or password' });
            }

            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '30d' });

            res.status(200).json({
                token,
                user: {
                    id: user._id,
                    login: user.login
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = authController;