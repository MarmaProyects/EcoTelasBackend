const jwt = require('jsonwebtoken');
const config = require('../config');

function VerifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  const bearerToken = token.split(' ')[1];

  jwt.verify(bearerToken, config.secret, function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = VerifyToken;
