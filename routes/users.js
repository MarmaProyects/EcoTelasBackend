const express = require('express');
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).send("Password is required");
    };

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400,
    });

    res.status(200).send({ auth: true, token: token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error during registration");
  }

});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ auth: false, message: "Usuario no encontrado" });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({ auth: false, message: "Contraseña incorrecta" });
    }

    let token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400,
    });

    res.status(200).send({ auth: true, token: token });

  } catch (err) {
    res.status(500).send("Error en el servidor" + err.message);
  }

});

router.get("/me", function (req, res) {
  var token = req.cookies.auth_token;
  if (!token)
    return res.status(401).send({ auth: false, message: "Sin token" });
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Error de autenticacion" });
    res.status(200).send(decoded);
  });
});

module.exports = router;