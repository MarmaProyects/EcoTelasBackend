const express = require('express');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const eventsRoutes = require('./routes/events');
const pointsRoutes = require('./routes/points');
const companyRoutes = require('./routes/company');
const textileRoutes = require('./routes/textiletype');
const recolectionsRoutes = require('./routes/recolections');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/recycling-points', pointsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/textiles', textileRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/recolection', recolectionsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});