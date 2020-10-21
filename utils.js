const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

function setToken(data) {
  const payload = { id: data.id };
  const token = jwt.sign(payload, 'secret', {
    expiresIn: 86400 * 30,
  });
  return token;
}

function handleValidation(request, response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(422).send({ errors: errors.array() });
    return false;
  }
  return true;
}

module.exports = { setToken, handleValidation };