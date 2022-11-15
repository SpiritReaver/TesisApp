import axios from "axios";

const URL = "https://api-kgk5.onrender.com/api/auth/registro";

export default function registerService({
  nombre,
  telefono,
  correo,
  contraseña,
}) {
  return axios
    .post(URL, { nombre, correo, telefono, contraseña })
    .then((res) => {
      return res;
    });
}
