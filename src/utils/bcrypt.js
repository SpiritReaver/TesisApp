const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

const ValidPassword = async (password, hashPassword) => {
  const validPassword = await bcrypt.compare(password, hashPassword);
  return validPassword;
};

module.exports = { hashPassword, ValidPassword };
