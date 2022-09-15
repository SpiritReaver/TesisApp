const jwt = require("jsonwebtoken");
const { secret } = require("../config");

function JWTgenerator(user_id) {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, secret, { expiresIn: "1hr" });
}

module.exports = { JWTgenerator };
