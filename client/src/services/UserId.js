import axios from "axios";

const URL = "https://api-kgk5.onrender.com/api/auth/getUser/";

export default function getUserIdService() {
  return axios.get(URL + `${localStorage.getItem("token")}`).then((res) => {
    return res;
  });
}
