const pool = require("../postgres");

const getproductos = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM public.productos WHERE productosid BETWEEN 1 AND 10"
  );
  console.log(res.status(200));
  res.json(result.rows);
};

const getprecios = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM public.productos WHERE productosid BETWEEN 1 AND 10"
  );
  console.log(res.status(200));
  res.json(result.rows.preciopromedio);
};

module.exports = {
  getproductos,
  getprecios,
};
