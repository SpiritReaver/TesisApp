import axios from "axios";

const URL = "https://3.83.218.170:4000/api/auth/getUser/";

export default function getUserIdService() {
  return axios.get(URL + `${localStorage.getItem("token")}`).then((res) => {
    return res;
  });
}
