const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ServicePrice = sequelize.define('ServicePrice', {
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Services',
            key: 'id',
        },
        onDelete: 'CASCADE', // Cascade delete price options when a service is deleted
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('Hourly', 'Weekly', 'Monthly'),
        allowNull: false,
    },
});

module.exports = ServicePrice;
