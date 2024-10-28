const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const eventsRoutes = require('./routes/events');
const pointsRoutes = require('./routes/points');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/recycling-points', pointsRoutes);
app.use('/api/events', eventsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});