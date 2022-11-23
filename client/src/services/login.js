import axios from "axios";
import Cookies from "universal-cookie";

const URL = "https://api-kgk5.onrender.com/api/auth/login";

const cookies = new Cookies();

export default function loginService({ correo, contraseña }) {
  axios.defaults.withCredentials = true;
  return axios
    .post(
      URL,
      { correo, contraseña },
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
