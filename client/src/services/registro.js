import axios from "axios";

const URL = "https://3.83.218.170:4000/api/auth/registro";

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
