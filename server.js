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
const nodemailer = require('nodemailer');

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

function sendMail({ email, subject, message }) {
  return new Promise((resolve, reject) => {
    let transporterProd = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    let transporterDev = nodemailer.createTransport({
      host: "localhost",
      port: 1025,
      ignoreTLS: true,
    });

    const mail_config = {
      from: email,
      to: 'contact@revistete.com',
      subject: subject,
      text: message,
    }

    transporterDev.sendMail(mail_config, function (error, info) {
      if (error) {
        console.error(error);
        return reject(error);
      }

      return resolve({ message: "Emial successfully" })
    })
  })
}

app.post('/api/sendEmail', (req, res) => {
  sendMail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});