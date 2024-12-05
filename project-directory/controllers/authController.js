const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const secret = 'sachinnagar';

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (email !== 'admin@codesfortomorrow.com' || password !== 'Admin123!@#') {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
    res.json({ token });
};
