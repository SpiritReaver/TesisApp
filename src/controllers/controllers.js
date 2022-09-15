const pool = require("../postgres");
const { hashPassword, ValidPassword } = require("../utils/bcrypt");
const { JWTgenerator } = require("../utils/jwtcreator");
const { tokenCheck } = require("../validators/tokenCheck");

function validEmail(correo) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo);
}

//registro + token

const Registro = async (req, res, next) => {
  try {
    const { nombre, apellido, correo, ciudad, telefono, contraseña } = req.body;

    if (
      ![nombre, apellido, correo, ciudad, telefono, contraseña].every(Boolean)
    ) {
      return res.status(401).json("Faltan credenciales en los campos");
    } else if (!validEmail(correo)) {
      return res.status(401).json("Correo Invalido");
    }

    const userExist = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );
    if (userExist.rowCount !== 0) {
      return res.status(401).json({ message: "Usuario ya existe" });
    }
    const hashedpwd = await hashPassword(contraseña);

    const newUser = await pool.query(
      "INSERT INTO usuarios (nombre, apellido, correo, ciudad, telefono, contraseña) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [nombre, apellido, correo, ciudad, telefono, hashedpwd]
    );

    const token = await JWTgenerator(newUser.rows[0].usuariosid);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

//login + token

const Login = async (req, res, next) => {
  try {
    const { correo, contraseña } = req.body;

    if (![correo, contraseña].every(Boolean)) {
      return res.status(401).json("Faltan credenciales en los campos");
    } else if (!validEmail(correo)) {
      return res.status(401).json("Correo Invalido");
    }

    const userExist = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    if (userExist.rowCount === 0) {
      return res
        .status(401)
        .json({ message: "Contraseña o Usuario incorrectos" });
    }

    const validPassword = await ValidPassword(
      contraseña,
      userExist.rows[0].contraseña
    );

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Contraseña o Usuario incorrectos" });
    }

    const token = await JWTgenerator(userExist.rows[0].usuariosid);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

//tokenCheck
const tokenChecking = async (req, res, next) => {
  try {
    tokenCheck(req, res, next);
  } catch (error) {
    next(error);
  }
};

//CRUD usuarios

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

//Productos
const getproductos = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM public.productos WHERE productosid BETWEEN 1 AND 10"
  );
  console.log(res.status(200));
  res.json(result.rows);
};

const getprecios = async (req, res) => {
  const result = await pool.query(
    "SELECT productos.preciopromedio FROM public.productos WHERE productosid BETWEEN 1 AND 10"
  );
  console.log(res.status(200));
  res.json(result.rows);
};

module.exports = {
  getproductos,
  getprecios,
  POSTusuario,
  GETusuariobyemail,
  DELETEusuariobyemail,
  UPDATEusuariobyemail,
  Registro,
  Login,
  tokenChecking,
};
