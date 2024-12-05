const express = require('express');
const {
    createService,
    getServices,
    updateService,
    deleteService,
} = require('../controllers/serviceController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/category/:categoryId/service', authenticateToken, createService);
router.get('/category/:categoryId/services', authenticateToken, getServices);
router.put('/category/:categoryId/service/:serviceId', authenticateToken, updateService);
router.delete('/category/:categoryId/service/:serviceId', authenticateToken, deleteService);

module.exports = router;
