const jwt = require("jsonwebtoken");
const { createError } = require("../utils/createError");
const { secret } = require("../config");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "No esta autorizado"));
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) return next(createError(403, "token invalido"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    next();
  });
};

module.exports = { verifyToken, verifyUser };
