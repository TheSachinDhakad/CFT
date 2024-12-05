const Service = require('./serviceModel');
const ServicePrice = require('./servicePriceModel');

const defineAssociations = () => {
    // Define associations
    Service.hasMany(ServicePrice, {
        foreignKey: 'serviceId',
        as: 'priceOptions',
        onDelete: 'CASCADE', // Cascade delete for related price options
    });

    ServicePrice.belongsTo(Service, {
        foreignKey: 'serviceId',
    });
};

module.exports = defineAssociations;
