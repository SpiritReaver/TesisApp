import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const URL = "https://api-kgk5.onrender.com/api/auth/getUser/";

export default function getUserIdService() {
  return axios.get(URL + cookies.get("token"), { path: "/" }).then((res) => {
    return res;
  });
}
