// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Service = sequelize.define('Service', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     type: {
//         type: DataTypes.ENUM('Normal', 'VIP'),
//         allowNull: false,
//     },
//     categoryId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: 'Categories',
//             key: 'id',
//         },
//     },
// });

// module.exports = Service;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Service = sequelize.define('Service', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('Normal', 'VIP'),
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categories',
            key: 'id',
        },
        onDelete: 'CASCADE', // Cascade delete services when a category is deleted
    },
});

module.exports = Service;
