const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
    function (err, user) {
      if (err) return res.status(500).send("Error");
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400, // expira en 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }
  );
});


router.post("/login", function (req, res) {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) return res.status(500).send("Error");
      if (!user) {
        return res.status(404).send({ auth: false, message: "Usuario no encontrado" });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res
          .status(401)
          .send({ auth: false, message: "Contraseña incorrecta" });
      }
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400,
      });
      res.cookie("auth_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
      res.status(200).send({ auth: true });
    }
  );
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