const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      return res.status(401).json({ message: "Sin autorización" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded.user;
  } catch (error) {
    next(error);
  }
};
