const pool = require("../postgres");
const { hashPassword, ValidPassword } = require("../utils/bcrypt");
const { JWTgenerator } = require("../utils/jwtcreator");

function validEmail(correo) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo);
}

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
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ token });
  } catch (error) {
    next(error);
  }
};

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
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { Registro, Login };
