const jwt = require('jsonwebtoken');
const secret = 'sachinnagar';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token required' });

    const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'

    if (!token) return res.status(401).json({ message: 'Token missing' });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
