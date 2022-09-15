const jwt = require("jsonwebtoken");
const { secret } = require("../config");

function tokenCheck(req, res, next) {
  try {
    const token = req.header("token");

    if (!token) {
      return res.status(401).json({ message: "Sin autorización" });
    }

    const decoded = jwt.verify(token, secret);
    if (decoded) {
      res.json(true);
    }
    req.user = decoded.user;
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = { tokenCheck };
