import axios from "axios";

const URL = "http://3.83.218.170:4050/api/auth/getUser/";

export default function getUserIdService() {
  return axios.get(URL + `${localStorage.getItem("token")}`).then((res) => {
    return res;
  });
}
