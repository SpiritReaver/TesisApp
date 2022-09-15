const jwt = require("jsonwebtoken");
const { secret } = require("../config");

function tokenCheck(req, res, next) {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ message: "Sin autorización" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (decoded) {
      res.json(true);
    }
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalido" });
  }
}

function tokenStillActive(req, res, next) {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ message: "Sin autorización" });
  }

  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, secret);
    req.user = verify.user;
  } catch (error) {
    res.status(401).json({ message: "Token invalido" });
  }
}

module.exports = { tokenCheck, tokenStillActive };
