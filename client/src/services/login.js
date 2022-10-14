import axios from "axios";

const URL = "http://3.83.218.170:4000/api/auth/login";

export default function loginService({ correo, contraseña }) {
  return axios.post(URL, { correo, contraseña }).then((res) => {
    console.log(res.data);
    const { token } = res.data;
    return token;
  });
}
