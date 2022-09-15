module.exports = (req, res, next) => {
  const { nombre, apellido, correo, ciudad, telefono, contraseña } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/registro") {
    console.log(!correo.length);
    if (
      ![nombre, apellido, correo, ciudad, telefono, contraseña].every(Boolean)
    ) {
      return res.status(401).json("Faltan credenciales en los campos");
    } else if (!validEmail(correo)) {
      return res.status(401).json("Correo Invalido");
    }
  } else if (req.path === "/login") {
    if (![correo, contraseña].every(Boolean)) {
      return res.status(401).json("Faltan credenciales en los campos");
    } else if (!validEmail(correo)) {
      return res.status(401).json("Correo Invalido");
    }
  }

  next();
};
