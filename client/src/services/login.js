import axios from "axios";

const URL = "https://api-kgk5.onrender.com/api/auth/login";

export default function loginService({ correo, contraseña }) {
  axios.defaults.withCredentials = true;
  return axios
    .post(URL, { correo, contraseña }, { withCredentials: true })
    .then((res) => {
      const { token } = res.data;
      return token;
    });
}
