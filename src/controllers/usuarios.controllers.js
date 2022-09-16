const pool = require("../postgres");

//variety methods
const getInfo = async (req, res, next) => {
  const user = await pool.query(
    "SELECT nombre,apellido,correo,ciudad,telefono FROM usuarios WHERE usuariosid = $1",
    [req.user.user]
  );
  res.json(user.rows[0]);
};

const compareUserid = async (req, res, next) => {
  if (req.user.user == Number(req.params.usuariosid)) {
    return res.status(200).json(true);
  } else {
    return res.status(401).json(false);
  }
};

const POSTusuario = async (req, res, next) => {
  try {
    const { nombre, apellido, correo, ciudad, telefono, contraseña } = req.body;
    const result = await pool.query(
      "INSERT INTO usuarios (nombre, apellido, correo, ciudad, telefono, contraseña) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [nombre, apellido, correo, ciudad, telefono, contraseña]
    );
    console.log("Usuario registrado");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const GETusuariobyemail = async (req, res, next) => {
  try {
    const { correo } = req.params;
    console.log(correo);
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1 ",
      [correo]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    console.log("Usuario encontrado");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const DELETEusuariobyemail = async (req, res, next) => {
  try {
    const { correo } = req.params;
    const result = await pool.query("DELETE FROM usuarios WHERE correo = $1 ", [
      correo,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    console.log("Usuario eliminado");
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const UPDATEusuariobyemail = async (req, res, next) => {
  try {
    const { correo } = req.params;
    const { nombre, apellido, ciudad, telefono, contraseña } = req.body;

    const result = await pool.query(
      "UPDATE usuarios SET nombre=$1, apellido=$2, ciudad=$3, telefono=$4, contraseña=$5 WHERE correo=$6 RETURNING *",
      [nombre, apellido, ciudad, telefono, contraseña, correo]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    console.log("Usuario actualizado");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  POSTusuario,
  GETusuariobyemail,
  DELETEusuariobyemail,
  UPDATEusuariobyemail,
  getInfo,
  compareUserid,
};
