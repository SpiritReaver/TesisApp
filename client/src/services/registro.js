import axios from "axios";
import Cookies from "universal-cookie";

const URL = "https://api-kgk5.onrender.com/api/auth/registro";
const cookies = new Cookies();

export default function registerService({
  nombre,
  telefono,
  correo,
  contraseña,
}) {
  return axios
    .post(
      URL,
      { nombre, correo, telefono, contraseña },
      { withCredentials: true },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    )
    .then((res) => {
      cookies.set("token", res.data.token, { path: "/" });
      return res.data.token;
    })
    .catch((err) => console.log(err));
}
