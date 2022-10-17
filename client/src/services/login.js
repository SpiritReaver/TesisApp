import axios from "axios";

const URL = "http://3.83.218.170:4000/api/auth/login";

export default function loginService({ correo, contraseña }) {
  axios.defaults.withCredentials = true;
  return axios
    .post(URL, { correo, contraseña }, { withCredentials: true })
    .then((res) => {
      console.log(res);
      console.log(res.headers);
      const { token } = res.data;
      return token;
    });
}
