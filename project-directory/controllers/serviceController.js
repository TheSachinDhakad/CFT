const Service = require('../models/serviceModel');
const ServicePrice = require('../models/servicePriceModel');

exports.createService = async (req, res) => {
    const { categoryId } = req.params;
    const { name, type, priceOptions } = req.body;

    try {
        // Create the service
        const service = await Service.create({ name, type, categoryId });

        let createdPriceOptions = [];
        if (priceOptions && priceOptions.length > 0) {
            // Create associated price options and collect them
            createdPriceOptions = await Promise.all(
                priceOptions.map(async (option) => {
                    return await ServicePrice.create({ ...option, serviceId: service.id });
                })
            );
        }

        // Include the priceOptions in the response
        res.json({
            service,
            priceOptions: createdPriceOptions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating service', error: error.message });
    }
};


exports.getServices = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const services = await Service.findAll({
            where: { categoryId },
            include: [
                {
                    model: ServicePrice,
                    as: 'priceOptions', // Accessing the defined alias
                },
            ],
        });

        res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
};

exports.updateService = async (req, res) => {
    const { serviceId } = req.params;
    const { name, type, priceOptions } = req.body;

    await Service.update({ name, type }, { where: { id: serviceId } });

    if (priceOptions) {
        await ServicePrice.destroy({ where: { serviceId } });
        priceOptions.forEach(async (option) => {
            await ServicePrice.create({ ...option, serviceId });
        });
    }

    res.json({ message: 'Service updated' });
};

exports.deleteService = async (req, res) => {
    const { serviceId } = req.params;

    try {
        await Service.destroy({ where: { id: serviceId } });
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting service', error: error.message });
    }
};

