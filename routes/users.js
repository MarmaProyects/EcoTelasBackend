const express = require('express');
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const VerifyToken = require("../routes/VerifyToken");

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: "Se necesita ingresar un nombre" });
    };
    if (!req.body.email) {
      return res.status(400).json({ error: "Se necesita ingresar un email" });
    };
    if (!req.body.password) {
      return res.status(400).json({ error: "Se necesita ingresar una contraseña" });
    };

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Ya existe un usuario con este correo" });
    };

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = await User.create({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400,
    });

    res.status(200).send({ auth: true, token: token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error en el servidor" + err.message);
  }

});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ auth: false, message: "No existe el usuario" });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({ auth: false, message: "La contraseña es incorrecta" });
    }

    let token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400,
    });

    res.status(200).send({ auth: true, token: token });

  } catch (err) {
    res.status(500).json({ error: "Error en el servidor: " + err.message });
  }

});

router.get("/me", VerifyToken, async function (req, res, next) {
  try {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).send("No existe el usuario.");
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).send("Error al encontrar usuario.");
  }
});



module.exports = router;