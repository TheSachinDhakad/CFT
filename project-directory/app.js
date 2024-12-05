const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const cors = require('cors')
const app = express();
const defineAssociations = require('./models/associations');
app.use(bodyParser.json());
defineAssociations();
app.use(cors())
app.use('/api/auth', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', serviceRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});
