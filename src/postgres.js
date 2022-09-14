const { Pool } = require("pg");
const { db } = require("./config");

const pool = new Pool({
  user: db.user,
  host: db.host,
  password: db.password,
  database: db.database,
  port: db.port,
});

module.exports = pool;
